// Social Scribe - Content Generation Agent
// Generates social media and email content using AI

import { BaseAgent } from './BaseAgent';
import { AgentTask, AgentResult } from '../types/agents';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class SocialScribe extends BaseAgent {
  constructor() {
    super(
      'SocialScribe',
      'Generates engaging social media and email content',
      ['generate_content', 'rewrite_content', 'generate_captions']
    );
  }

  async handleTask(task: AgentTask): Promise<AgentResult> {
    const startTime = Date.now();

    try {
      const { clientId, count = 5, platforms, brandProfile, topic, callToAction } = task.payload;

      this.log('Generating content', { count, platforms: platforms?.join(', ') });

      const content = await this.generateContent({
        count,
        platforms: platforms || ['INSTAGRAM', 'FACEBOOK'],
        brandProfile,
        topic,
        callToAction,
      });

      const result = this.createSuccessResult(task.taskId, {
        content,
        count: content.length,
      }, {
        durationMs: Date.now() - startTime,
        tokensUsed: content.length * 200, // Rough estimate
      });

      await this.logExecution(task, result);
      return result;

    } catch (error: any) {
      this.logError('Content generation failed', error);
      const result = this.createErrorResult(
        task.taskId,
        error.message,
        { durationMs: Date.now() - startTime }
      );
      await this.logExecution(task, result);
      return result;
    }
  }

  private async generateContent(params: any) {
    const { count, platforms, brandProfile, topic, callToAction } = params;

    const voiceContext = brandProfile
      ? `Brand Voice: ${brandProfile.voiceDescription}\nTone: ${brandProfile.toneKeywords?.join(', ')}`
      : 'Professional and engaging tone';

    const contentPromises = [];

    for (let i = 0; i < count; i++) {
      const platform = platforms[i % platforms.length];
      contentPromises.push(this.generateSinglePost(platform, voiceContext, topic, callToAction));
    }

    return await Promise.all(contentPromises);
  }

  private async generateSinglePost(
    platform: string,
    voiceContext: string,
    topic?: string,
    callToAction?: string
  ) {
    const platformSpecs: Record<string, any> = {
      INSTAGRAM: { maxLength: 2200, style: 'Visual storytelling with emojis' },
      FACEBOOK: { maxLength: 5000, style: 'Community-focused and conversational' },
      TIKTOK: { maxLength: 150, style: 'Punchy, trend-aware, hook-first' },
      LINKEDIN: { maxLength: 3000, style: 'Professional insights and thought leadership' },
      TWITTER: { maxLength: 280, style: 'Concise and impactful' },
      EMAIL: { maxLength: 1000, style: 'Value-driven with clear CTA' },
    };

    const spec = platformSpecs[platform] || platformSpecs.INSTAGRAM;

    const prompt = `
You are a social media content creator. Generate a ${platform} post with the following requirements:

${voiceContext}

Platform Style: ${spec.style}
Max Length: ${spec.maxLength} characters
${topic ? `Topic: ${topic}` : ''}
${callToAction ? `Call to Action: ${callToAction}` : ''}

Requirements:
1. Must match the brand voice
2. Must be engaging and actionable
3. Include relevant hashtags (3-5)
4. ${platform === 'EMAIL' ? 'Include subject line' : 'Use emojis appropriately'}
5. Keep within character limit

Generate the post now:
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 800,
    });

    const generatedText = completion.choices[0].message.content || '';

    // Parse hashtags from the generated content
    const hashtags = generatedText.match(/#\w+/g) || [];

    // Clean the main text (remove hashtags for separate storage)
    const body = generatedText.replace(/#\w+/g, '').trim();

    return {
      platform,
      type: this.getContentType(platform),
      body,
      caption: body.substring(0, 300),
      hashtags: hashtags.map(h => h.substring(1)), // Remove # symbol
      callToAction: callToAction || null,
    };
  }

  private getContentType(platform: string): string {
    const typeMap: Record<string, string> = {
      INSTAGRAM: 'LONG_CAPTION',
      FACEBOOK: 'LONG_CAPTION',
      TIKTOK: 'SHORT_FORM',
      YOUTUBE: 'SHORT_FORM',
      LINKEDIN: 'LONG_CAPTION',
      TWITTER: 'SHORT_FORM',
      EMAIL: 'EMAIL',
    };

    return typeMap[platform] || 'LONG_CAPTION';
  }
}
