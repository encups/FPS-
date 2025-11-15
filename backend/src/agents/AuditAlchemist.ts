// Audit Alchemist - Marketing Audit Agent
// Analyzes client's marketing needs and recommends subscription tier

import { BaseAgent } from './BaseAgent';
import { AgentTask, AgentResult } from '../types/agents';
import { SubscriptionTier } from '@prisma/client';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class AuditAlchemist extends BaseAgent {
  constructor() {
    super(
      'AuditAlchemist',
      'Conducts marketing audits and recommends subscription tiers',
      ['run_audit', 'analyze_competition', 'recommend_strategy']
    );
  }

  async handleTask(task: AgentTask): Promise<AgentResult> {
    const startTime = Date.now();

    try {
      const audit = await this.runMarketingAudit(task.payload);

      const result = this.createSuccessResult(task.taskId, audit, {
        durationMs: Date.now() - startTime,
      });

      await this.logExecution(task, result);
      return result;

    } catch (error: any) {
      this.logError('Audit failed', error);
      const result = this.createErrorResult(
        task.taskId,
        error.message,
        { durationMs: Date.now() - startTime }
      );
      await this.logExecution(task, result);
      return result;
    }
  }

  private async runMarketingAudit(payload: any) {
    const { niche, size, goals, businessName } = payload;

    this.log('Running marketing audit', { niche, size });

    // Determine tier based on business characteristics
    const tier = this.recommendTier(size, goals);

    // Generate AI-powered audit analysis
    const analysis = await this.generateAuditAnalysis({
      businessName,
      niche,
      size,
      goals,
      tier,
    });

    return {
      tierRecommendation: tier,
      summary: analysis.summary,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      opportunities: analysis.opportunities,
      recommendedActions: analysis.actions,
      scoreOverall: analysis.scores.overall,
      scoreContent: analysis.scores.content,
      scoreEngagement: analysis.scores.engagement,
      scoreStrategy: analysis.scores.strategy,
    };
  }

  private recommendTier(size?: string, goals?: string[]): SubscriptionTier {
    // Business size-based recommendation
    if (size === 'solo' || size === 'small') {
      return 'SQUIRE'; // $249.99/mo
    }

    if (size === 'large' || (goals && goals.length > 5)) {
      return 'KING'; // $999.99/mo
    }

    return 'KNIGHT'; // $499.99/mo - default middle tier
  }

  private async generateAuditAnalysis(params: any) {
    const { businessName, niche, size, goals, tier } = params;

    const prompt = `
You are a marketing strategist conducting an audit for a new client.

Business: ${businessName}
Niche: ${niche}
Size: ${size}
Goals: ${goals?.join(', ') || 'Not specified'}
Recommended Tier: ${tier}

Provide a comprehensive marketing audit in JSON format:
{
  "summary": "2-3 sentence executive summary",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2", "weakness 3"],
  "opportunities": ["opportunity 1", "opportunity 2", "opportunity 3"],
  "actions": [
    {
      "title": "Action item",
      "description": "How to do it",
      "priority": "high|medium|low",
      "timeframe": "immediate|30-days|60-days"
    }
  ],
  "scores": {
    "overall": 65,
    "content": 60,
    "engagement": 55,
    "strategy": 70
  }
}

Focus on actionable insights. Scores should be 0-100.
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 1500,
    });

    const response = completion.choices[0].message.content || '{}';
    return JSON.parse(response);
  }
}
