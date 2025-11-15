// Insight Oracle - Analytics & Insights Agent
// Analyzes performance data and generates recommendations

import { BaseAgent } from './BaseAgent';
import { AgentTask, AgentResult } from '../types/agents';

export class InsightOracle extends BaseAgent {
  constructor() {
    super(
      'InsightOracle',
      'Generates insights and recommendations from analytics data',
      ['generate_insights', 'predict_trends', 'recommend_experiments']
    );
  }

  async handleTask(task: AgentTask): Promise<AgentResult> {
    const startTime = Date.now();

    try {
      const insights = this.generateInsights(task.payload);

      const result = this.createSuccessResult(task.taskId, insights, {
        durationMs: Date.now() - startTime,
      });

      await this.logExecution(task, result);
      return result;

    } catch (error: any) {
      this.logError('Insight generation failed', error);
      const result = this.createErrorResult(
        task.taskId,
        error.message,
        { durationMs: Date.now() - startTime }
      );
      await this.logExecution(task, result);
      return result;
    }
  }

  private generateInsights(payload: any) {
    const { analytics } = payload;

    if (!analytics || analytics.analytics.length === 0) {
      return {
        summary: '🔮 The Oracle awaits more data to divine your marketing fate...',
        insights: [],
        recommendations: [],
      };
    }

    const { totals } = analytics;

    // Calculate engagement rate
    const engagementRate = totals.impressions > 0
      ? ((totals.likes + totals.comments + totals.shares) / totals.impressions) * 100
      : 0;

    // Calculate CTR
    const ctr = totals.impressions > 0
      ? (totals.clicks / totals.impressions) * 100
      : 0;

    const insights = [];
    const recommendations = [];

    // Analyze engagement
    if (engagementRate > 3) {
      insights.push('✨ Strong audience engagement! Your content resonates well.');
    } else if (engagementRate < 1) {
      insights.push('⚠️ Low engagement detected. Content may need more compelling hooks.');
      recommendations.push({
        title: 'Enhance Content Hooks',
        description: 'Start posts with questions or bold statements',
        priority: 'high',
      });
    }

    // Analyze CTR
    if (ctr > 2) {
      insights.push('🎯 Excellent click-through rate! Your CTAs are effective.');
    } else if (ctr < 0.5) {
      insights.push('⚠️ Low CTR. Consider stronger calls-to-action.');
      recommendations.push({
        title: 'Strengthen CTAs',
        description: 'Use action-oriented language and create urgency',
        priority: 'medium',
      });
    }

    // Best performing platform
    const platformPerformance = this.analyzePlatformPerformance(analytics.analytics);
    if (platformPerformance.best) {
      insights.push(`🏆 ${platformPerformance.best} is your top performer`);
      recommendations.push({
        title: `Focus on ${platformPerformance.best}`,
        description: 'Increase posting frequency on this platform',
        priority: 'high',
      });
    }

    return {
      summary: `🔮 **The Oracle's Prophecy:** ${this.generateSummary(engagementRate, ctr)}`,
      metrics: {
        engagementRate: engagementRate.toFixed(2),
        clickThroughRate: ctr.toFixed(2),
        totalImpressions: totals.impressions,
        totalEngagements: totals.likes + totals.comments + totals.shares,
      },
      insights,
      recommendations,
    };
  }

  private analyzePlatformPerformance(analytics: any[]) {
    const platformStats: Record<string, number> = {};

    analytics.forEach(item => {
      if (!platformStats[item.platform]) {
        platformStats[item.platform] = 0;
      }
      platformStats[item.platform] += item.likes + item.comments + item.shares;
    });

    const sorted = Object.entries(platformStats).sort((a, b) => b[1] - a[1]);

    return {
      best: sorted[0]?.[0],
      worst: sorted[sorted.length - 1]?.[0],
    };
  }

  private generateSummary(engagementRate: number, ctr: number): string {
    if (engagementRate > 3 && ctr > 2) {
      return 'Your marketing quest flourishes! The realm responds to your tales.';
    } else if (engagementRate < 1 || ctr < 0.5) {
      return 'The quest faces challenges. New strategies must be forged.';
    } else {
      return 'Your campaign progresses steadily. Opportunities for growth await.';
    }
  }
}
