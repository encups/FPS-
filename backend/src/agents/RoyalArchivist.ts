// Royal Archivist - Database Operations Agent
// Manages all database CRUD operations for Frame Fables

import { BaseAgent } from './BaseAgent';
import { AgentTask, AgentResult } from '../types/agents';
import { PrismaClient, SubscriptionTier } from '@prisma/client';

const prisma = new PrismaClient();

export class RoyalArchivist extends BaseAgent {
  constructor() {
    super(
      'RoyalArchivist',
      'Manages all database operations and data persistence',
      [
        'create_client',
        'get_client',
        'create_subscription',
        'get_brand_profile',
        'create_brand_profile',
        'save_content',
        'get_content',
        'save_analytics',
        'get_analytics',
        'save_audit',
      ]
    );
  }

  async handleTask(task: AgentTask): Promise<AgentResult> {
    const startTime = Date.now();

    try {
      let data;

      switch (task.type) {
        case 'create_client':
          data = await this.createClient(task.payload);
          break;
        case 'get_client':
          data = await this.getClient(task.payload.clientId);
          break;
        case 'create_subscription':
          data = await this.createSubscription(task.payload);
          break;
        case 'get_brand_profile':
          data = await this.getBrandProfile(task.payload.clientId);
          break;
        case 'create_brand_profile':
          data = await this.createBrandProfile(task.payload);
          break;
        case 'save_content':
          data = await this.saveContent(task.payload);
          break;
        case 'get_content':
          data = await this.getContent(task.payload);
          break;
        case 'get_analytics':
          data = await this.getAnalytics(task.payload.clientId);
          break;
        case 'save_audit':
          data = await this.saveAudit(task.payload);
          break;
        default:
          throw new Error(`Unsupported task type: ${task.type}`);
      }

      const result = this.createSuccessResult(task.taskId, data, {
        durationMs: Date.now() - startTime,
      });

      await this.logExecution(task, result);
      return result;

    } catch (error: any) {
      this.logError(`Task failed: ${task.type}`, error);
      const result = this.createErrorResult(
        task.taskId,
        error.message,
        { durationMs: Date.now() - startTime }
      );
      await this.logExecution(task, result);
      return result;
    }
  }

  private async createClient(payload: any) {
    this.log('Creating new client', { email: payload.email });

    const client = await prisma.client.create({
      data: {
        email: payload.email,
        name: payload.name,
        businessName: payload.businessName,
        niche: payload.niche,
        size: payload.size,
        goals: payload.goals || [],
      },
    });

    // Create social handles if provided
    if (payload.socialHandles && payload.socialHandles.length > 0) {
      await Promise.all(
        payload.socialHandles.map((handle: any) =>
          prisma.socialHandle.create({
            data: {
              clientId: client.id,
              platform: handle.platform,
              handle: handle.handle,
              url: handle.url,
            },
          })
        )
      );
    }

    return { client };
  }

  private async getClient(clientId: string) {
    const client = await prisma.client.findUnique({
      where: { id: clientId },
      include: {
        subscription: true,
        brandProfile: true,
        socialHandles: true,
      },
    });

    if (!client) {
      throw new Error('Client not found');
    }

    return { client };
  }

  private async createSubscription(payload: any) {
    const { clientId, tier } = payload;

    // Determine price based on tier
    const priceMap: Record<SubscriptionTier, number> = {
      SQUIRE: 24999, // $249.99
      KNIGHT: 49999, // $499.99
      KING: 99999,   // $999.99
    };

    const subscription = await prisma.subscription.create({
      data: {
        clientId,
        tier,
        status: 'TRIALING',
        priceInCents: priceMap[tier as SubscriptionTier],
        trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    this.log('Subscription created', { tier, clientId });
    return { subscription };
  }

  private async getBrandProfile(clientId: string) {
    const brandProfile = await prisma.brandProfile.findUnique({
      where: { clientId },
    });

    return { brandProfile };
  }

  private async createBrandProfile(payload: any) {
    const brandProfile = await prisma.brandProfile.create({
      data: {
        clientId: payload.clientId,
        voiceDescription: payload.voiceDescription,
        toneKeywords: payload.toneKeywords || [],
        colors: payload.colors || [],
        targetAudience: payload.targetAudience,
        uniqueValueProp: payload.uniqueValueProp,
        notes: payload.notes,
      },
    });

    return { brandProfile };
  }

  private async saveContent(payload: any) {
    const { clientId, content } = payload;

    const savedContent = await Promise.all(
      content.map((item: any) =>
        prisma.contentItem.create({
          data: {
            clientId,
            platform: item.platform,
            type: item.type,
            title: item.title,
            body: item.body,
            caption: item.caption,
            hashtags: item.hashtags || [],
            callToAction: item.callToAction,
            status: 'DRAFT',
          },
        })
      )
    );

    return {
      content: savedContent,
      count: savedContent.length,
      contentIds: savedContent.map(c => c.id),
    };
  }

  private async getContent(payload: any) {
    const { clientId, status, platform, limit = 50 } = payload;

    const where: any = { clientId };
    if (status) where.status = status;
    if (platform) where.platform = platform;

    const content = await prisma.contentItem.findMany({
      where,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return { content, count: content.length };
  }

  private async getAnalytics(clientId: string) {
    const analytics = await prisma.analytics.findMany({
      where: { clientId },
      orderBy: { recordedAt: 'desc' },
      take: 100,
    });

    // Calculate aggregates
    const totals = analytics.reduce(
      (acc, curr) => ({
        impressions: acc.impressions + curr.impressions,
        likes: acc.likes + curr.likes,
        comments: acc.comments + curr.comments,
        shares: acc.shares + curr.shares,
        clicks: acc.clicks + curr.clicks,
      }),
      { impressions: 0, likes: 0, comments: 0, shares: 0, clicks: 0 }
    );

    return { analytics, totals };
  }

  private async saveAudit(payload: any) {
    const audit = await prisma.auditReport.create({
      data: {
        clientId: payload.clientId,
        tierRecommendation: payload.tierRecommendation,
        summary: payload.summary,
        strengths: payload.strengths || [],
        weaknesses: payload.weaknesses || [],
        opportunities: payload.opportunities || [],
        recommendedActions: payload.recommendedActions || {},
        scoreOverall: payload.scoreOverall,
        scoreContent: payload.scoreContent,
        scoreEngagement: payload.scoreEngagement,
        scoreStrategy: payload.scoreStrategy,
      },
    });

    return { audit };
  }
}
