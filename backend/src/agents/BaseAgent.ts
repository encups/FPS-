// Base Agent Class
// All Frame Fables agents inherit from this

import { Agent, AgentTask, AgentResult } from '../types/agents';
import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

const prisma = new PrismaClient();

export abstract class BaseAgent implements Agent {
  public readonly name: string;
  public readonly description: string;
  public readonly capabilities: string[];

  constructor(name: string, description: string, capabilities: string[]) {
    this.name = name;
    this.description = description;
    this.capabilities = capabilities;
  }

  /**
   * Main task handler - must be implemented by each agent
   */
  abstract handleTask(task: AgentTask): Promise<AgentResult>;

  /**
   * Log agent execution to database
   */
  protected async logExecution(
    task: AgentTask,
    result: AgentResult
  ): Promise<void> {
    try {
      await prisma.agentLog.create({
        data: {
          agentName: this.name,
          taskType: task.type,
          payload: task.payload as any,
          result: result.data || null,
          success: result.success,
          errorMessage: result.error || null,
          durationMs: result.metadata?.durationMs || 0,
        },
      });
    } catch (error) {
      logger.error(`Failed to log agent execution for ${this.name}:`, error);
    }
  }

  /**
   * Create a successful result
   */
  protected createSuccessResult(
    taskId: string,
    data: any,
    metadata?: any
  ): AgentResult {
    return {
      taskId,
      agentName: this.name,
      success: true,
      data,
      metadata,
      timestamp: new Date(),
    };
  }

  /**
   * Create an error result
   */
  protected createErrorResult(
    taskId: string,
    error: string,
    metadata?: any
  ): AgentResult {
    return {
      taskId,
      agentName: this.name,
      success: false,
      error,
      metadata,
      timestamp: new Date(),
    };
  }

  /**
   * Validate task capabilities
   */
  protected canHandle(taskType: string): boolean {
    return this.capabilities.includes(taskType);
  }

  /**
   * Log info message
   */
  protected log(message: string, data?: any): void {
    logger.info(`[${this.name}] ${message}`, data);
  }

  /**
   * Log error message
   */
  protected logError(message: string, error?: any): void {
    logger.error(`[${this.name}] ${message}`, error);
  }
}
