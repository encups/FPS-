// Scheduler Bard - Content Scheduling Agent
// Plans and schedules content across platforms

import { BaseAgent } from './BaseAgent';
import { AgentTask, AgentResult } from '../types/agents';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SchedulerBard extends BaseAgent {
  constructor() {
    super(
      'SchedulerBard',
      'Schedules content and creates content calendars',
      ['create_calendar', 'schedule_post', 'optimize_timing']
    );
  }

  async handleTask(task: AgentTask): Promise<AgentResult> {
    const startTime = Date.now();

    try {
      const calendar = await this.createContentCalendar(task.payload);

      const result = this.createSuccessResult(task.taskId, { calendar }, {
        durationMs: Date.now() - startTime,
      });

      await this.logExecution(task, result);
      return result;

    } catch (error: any) {
      this.logError('Scheduling failed', error);
      const result = this.createErrorResult(
        task.taskId,
        error.message,
        { durationMs: Date.now() - startTime }
      );
      await this.logExecution(task, result);
      return result;
    }
  }

  private async createContentCalendar(payload: any) {
    const { clientId, contentIds } = payload;

    // Get content items
    const contentItems = await prisma.contentItem.findMany({
      where: {
        id: { in: contentIds },
      },
    });

    // Calculate optimal posting times
    const scheduledContent = this.scheduleContent(contentItems);

    // Update content items with scheduled times
    await Promise.all(
      scheduledContent.map(item =>
        prisma.contentItem.update({
          where: { id: item.id },
          data: {
            scheduledFor: item.scheduledFor,
            status: 'SCHEDULED',
          },
        })
      )
    );

    // Create calendar record
    const weekStart = new Date();
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const calendar = await prisma.contentCalendar.create({
      data: {
        clientId,
        weekStart,
        weekEnd,
        metadata: {
          contentIds: scheduledContent.map(c => c.id),
          schedule: scheduledContent.map(c => ({
            id: c.id,
            platform: c.platform,
            scheduledFor: c.scheduledFor,
          })),
        },
      },
    });

    this.log('Calendar created', { contentCount: scheduledContent.length });

    return calendar;
  }

  private scheduleContent(content: any[]) {
    // Optimal posting times by platform (simplified)
    const optimalTimes: Record<string, number[]> = {
      INSTAGRAM: [9, 12, 17], // 9am, 12pm, 5pm
      FACEBOOK: [13, 15, 19],  // 1pm, 3pm, 7pm
      TIKTOK: [7, 12, 19],     // 7am, 12pm, 7pm
      LINKEDIN: [8, 12, 17],   // 8am, 12pm, 5pm
      TWITTER: [9, 12, 15, 18], // Multiple times
      EMAIL: [10],             // 10am
    };

    const now = new Date();
    let dayOffset = 0;

    return content.map((item, index) => {
      const times = optimalTimes[item.platform] || [12];
      const hourIndex = index % times.length;
      const hour = times[hourIndex];

      // Spread content across the next 7 days
      const scheduledFor = new Date(now);
      scheduledFor.setDate(scheduledFor.getDate() + dayOffset);
      scheduledFor.setHours(hour, 0, 0, 0);

      // Move to next day after cycling through all times
      if ((index + 1) % times.length === 0) {
        dayOffset++;
      }

      return {
        ...item,
        scheduledFor,
      };
    });
  }
}
