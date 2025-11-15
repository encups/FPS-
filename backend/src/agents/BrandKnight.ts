// Brand Knight - Medieval Theming Agent
// Applies Frame Fables medieval branding to all communications

import { BaseAgent } from './BaseAgent';
import { AgentTask, AgentResult } from '../types/agents';

export class BrandKnight extends BaseAgent {
  constructor() {
    super(
      'BrandKnight',
      'Applies medieval theming and Frame Fables branding to content',
      ['format_medieval', 'enhance_content', 'theme_report']
    );
  }

  async handleTask(task: AgentTask): Promise<AgentResult> {
    const startTime = Date.now();

    try {
      let formatted;

      if (task.type === 'format_medieval') {
        formatted = this.formatMedieval(task.payload);
      } else if (task.type === 'enhance_content') {
        formatted = this.enhanceContent(task.payload.content);
      } else {
        throw new Error(`Unsupported task type: ${task.type}`);
      }

      const result = this.createSuccessResult(task.taskId, { formatted }, {
        durationMs: Date.now() - startTime,
      });

      await this.logExecution(task, result);
      return result;

    } catch (error: any) {
      this.logError('Branding failed', error);
      const result = this.createErrorResult(
        task.taskId,
        error.message,
        { durationMs: Date.now() - startTime }
      );
      await this.logExecution(task, result);
      return result;
    }
  }

  private formatMedieval(payload: any) {
    const { type, data } = payload;

    switch (type) {
      case 'welcome':
        return this.formatWelcome(data);
      case 'audit':
        return this.formatAudit(data);
      default:
        return data;
    }
  }

  private formatWelcome(data: any) {
    const { clientName, tier, auditSummary } = data;

    const tierNames: Record<string, string> = {
      SQUIRE: "🛡️ Squire's Start",
      KNIGHT: "⚔️ Knight's Climb",
      KING: "👑 King's Command",
    };

    return {
      subject: `Welcome to the ${tierNames[tier]} Quest, ${clientName}!`,
      message: `
# 🏰 Hail, ${clientName}!

The Frame Fables Kingdom welcomes you to your **${tierNames[tier]}** quest!

## 📜 Your Marketing Prophecy

${auditSummary}

## ⚔️ Your Quest Begins

Our mystical scribes have prepared your first scrolls of content, ready to conquer the digital realm. Your content calendar awaits in the royal archives.

**May your campaigns be legendary!**

🌟 The Frame Fables Council
      `.trim(),
    };
  }

  private formatAudit(data: any) {
    return {
      ...data,
      summary: `🔮 **The Oracle's Vision:** ${data.summary}`,
      strengths: data.strengths.map((s: string) => `✨ ${s}`),
      weaknesses: data.weaknesses.map((w: string) => `⚠️ ${w}`),
      opportunities: data.opportunities.map((o: string) => `🎯 ${o}`),
    };
  }

  private enhanceContent(content: any[]) {
    // Add medieval flair to content items (subtle)
    return content.map(item => ({
      ...item,
      // Could add themed hashtags or slight text enhancements
      // For now, pass through as-is to maintain content quality
    }));
  }
}
