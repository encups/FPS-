// Dungeon Master - Central Agent Orchestrator
// Coordinates all Frame Fables agents and manages complex workflows

import { BaseAgent } from './BaseAgent';
import { AgentTask, AgentResult, OrchestrationResult } from '../types/agents';
import logger from '../utils/logger';

// Import all specialized agents
import { AuditAlchemist } from './AuditAlchemist';
import { SocialScribe } from './SocialScribe';
import { SchedulerBard } from './SchedulerBard';
import { InsightOracle } from './InsightOracle';
import { BrandKnight } from './BrandKnight';
import { RoyalArchivist } from './RoyalArchivist';
import { AutoWirer } from './AutoWirer';

export class DungeonMaster extends BaseAgent {
  private agents: Map<string, BaseAgent>;

  constructor() {
    super(
      'DungeonMaster',
      'Central orchestrator that delegates tasks to specialized agents',
      [
        'onboard_client',
        'generate_content',
        'run_audit',
        'schedule_content',
        'analyze_performance',
        'orchestrate_workflow',
      ]
    );

    // Initialize all specialized agents
    this.agents = new Map();
    this.registerAgent(new AuditAlchemist());
    this.registerAgent(new SocialScribe());
    this.registerAgent(new SchedulerBard());
    this.registerAgent(new InsightOracle());
    this.registerAgent(new BrandKnight());
    this.registerAgent(new RoyalArchivist());
    this.registerAgent(new AutoWirer());
  }

  private registerAgent(agent: BaseAgent): void {
    this.agents.set(agent.name, agent);
    this.log(`Registered agent: ${agent.name}`);
  }

  async handleTask(task: AgentTask): Promise<AgentResult> {
    const startTime = Date.now();
    this.log(`Orchestrating task: ${task.type}`, { taskId: task.taskId });

    try {
      let result: OrchestrationResult;

      switch (task.type) {
        case 'onboard_client':
          result = await this.orchestrateOnboarding(task);
          break;
        case 'generate_content':
          result = await this.orchestrateContentGeneration(task);
          break;
        case 'run_audit':
          result = await this.orchestrateAudit(task);
          break;
        case 'schedule_content':
          result = await this.orchestrateScheduling(task);
          break;
        case 'analyze_performance':
          result = await this.orchestrateAnalysis(task);
          break;
        default:
          throw new Error(`Unknown task type: ${task.type}`);
      }

      const durationMs = Date.now() - startTime;
      const agentResult = this.createSuccessResult(task.taskId, result, {
        durationMs,
        subTasks: result.results.map(r => r.agentName),
      });

      await this.logExecution(task, agentResult);
      return agentResult;

    } catch (error: any) {
      const durationMs = Date.now() - startTime;
      this.logError('Orchestration failed', error);

      const agentResult = this.createErrorResult(
        task.taskId,
        error.message,
        { durationMs }
      );

      await this.logExecution(task, agentResult);
      return agentResult;
    }
  }

  /**
   * ORCHESTRATION WORKFLOW: Client Onboarding
   * Steps:
   * 1. Royal Archivist creates client record
   * 2. Audit Alchemist analyzes needs and recommends tier
   * 3. Royal Archivist creates subscription
   * 4. Brand Knight formats welcome message
   * 5. Social Scribe generates welcome content
   * 6. Scheduler Bard plans first week
   */
  private async orchestrateOnboarding(task: AgentTask): Promise<OrchestrationResult> {
    this.log('🏰 Beginning Onboarding Quest');
    const results: AgentResult[] = [];
    const startTime = Date.now();

    try {
      // Step 1: Create client record
      const archivistTask: AgentTask = {
        taskId: `${task.taskId}-archivist-1`,
        type: 'create_client',
        payload: task.payload,
        timestamp: new Date(),
      };
      const clientResult = await this.executeAgent('RoyalArchivist', archivistTask);
      results.push(clientResult);

      if (!clientResult.success) {
        throw new Error('Failed to create client record');
      }

      const clientId = clientResult.data.client.id;

      // Step 2: Run audit and get tier recommendation
      const auditTask: AgentTask = {
        taskId: `${task.taskId}-audit`,
        type: 'run_audit',
        payload: { clientId, ...task.payload },
        timestamp: new Date(),
      };
      const auditResult = await this.executeAgent('AuditAlchemist', auditTask);
      results.push(auditResult);

      // Step 3: Create subscription with recommended tier
      const subscriptionTask: AgentTask = {
        taskId: `${task.taskId}-subscription`,
        type: 'create_subscription',
        payload: {
          clientId,
          tier: auditResult.data.tierRecommendation,
        },
        timestamp: new Date(),
      };
      const subscriptionResult = await this.executeAgent('RoyalArchivist', subscriptionTask);
      results.push(subscriptionResult);

      // Step 4: Format welcome message with medieval flair
      const brandTask: AgentTask = {
        taskId: `${task.taskId}-brand`,
        type: 'format_medieval',
        payload: {
          type: 'welcome',
          data: {
            clientName: task.payload.name,
            tier: auditResult.data.tierRecommendation,
            auditSummary: auditResult.data.summary,
          },
        },
        timestamp: new Date(),
      };
      const welcomeResult = await this.executeAgent('BrandKnight', brandTask);
      results.push(welcomeResult);

      // Step 5: Generate first batch of content
      const contentTask: AgentTask = {
        taskId: `${task.taskId}-content`,
        type: 'generate_content',
        payload: {
          clientId,
          count: 5,
          platforms: ['INSTAGRAM', 'FACEBOOK', 'EMAIL'],
        },
        timestamp: new Date(),
      };
      const contentResult = await this.executeAgent('SocialScribe', contentTask);
      results.push(contentResult);

      // Step 6: Schedule first week
      const scheduleTask: AgentTask = {
        taskId: `${task.taskId}-schedule`,
        type: 'create_calendar',
        payload: {
          clientId,
          contentIds: contentResult.data.contentIds,
        },
        timestamp: new Date(),
      };
      const scheduleResult = await this.executeAgent('SchedulerBard', scheduleTask);
      results.push(scheduleResult);

      return {
        success: true,
        results,
        finalOutput: {
          client: clientResult.data.client,
          subscription: subscriptionResult.data.subscription,
          audit: auditResult.data,
          welcomeMessage: welcomeResult.data.formatted,
          initialContent: contentResult.data.content,
          calendar: scheduleResult.data.calendar,
        },
        totalDurationMs: Date.now() - startTime,
      };

    } catch (error: any) {
      return {
        success: false,
        results,
        finalOutput: null,
        totalDurationMs: Date.now() - startTime,
        errors: [error.message],
      };
    }
  }

  /**
   * ORCHESTRATION WORKFLOW: Content Generation
   */
  private async orchestrateContentGeneration(task: AgentTask): Promise<OrchestrationResult> {
    this.log('📜 Beginning Content Generation Quest');
    const results: AgentResult[] = [];
    const startTime = Date.now();

    try {
      // Get brand profile for voice consistency
      const profileTask: AgentTask = {
        taskId: `${task.taskId}-profile`,
        type: 'get_brand_profile',
        payload: { clientId: task.payload.clientId },
        timestamp: new Date(),
      };
      const profileResult = await this.executeAgent('RoyalArchivist', profileTask);
      results.push(profileResult);

      // Generate content with Social Scribe
      const contentTask: AgentTask = {
        taskId: `${task.taskId}-content`,
        type: 'generate_content',
        payload: {
          ...task.payload,
          brandProfile: profileResult.data?.brandProfile,
        },
        timestamp: new Date(),
      };
      const contentResult = await this.executeAgent('SocialScribe', contentTask);
      results.push(contentResult);

      // Apply medieval theming with Brand Knight
      const brandTask: AgentTask = {
        taskId: `${task.taskId}-brand`,
        type: 'enhance_content',
        payload: {
          content: contentResult.data.content,
        },
        timestamp: new Date(),
      };
      const enhancedResult = await this.executeAgent('BrandKnight', brandTask);
      results.push(enhancedResult);

      return {
        success: true,
        results,
        finalOutput: {
          content: enhancedResult.data.content,
          count: contentResult.data.count,
        },
        totalDurationMs: Date.now() - startTime,
      };

    } catch (error: any) {
      return {
        success: false,
        results,
        finalOutput: null,
        totalDurationMs: Date.now() - startTime,
        errors: [error.message],
      };
    }
  }

  /**
   * ORCHESTRATION WORKFLOW: Marketing Audit
   */
  private async orchestrateAudit(task: AgentTask): Promise<OrchestrationResult> {
    this.log('🔮 Beginning Audit Quest');
    const results: AgentResult[] = [];
    const startTime = Date.now();

    try {
      // Run audit analysis
      const auditResult = await this.executeAgent('AuditAlchemist', task);
      results.push(auditResult);

      // Format with medieval theming
      const brandTask: AgentTask = {
        taskId: `${task.taskId}-brand`,
        type: 'format_medieval',
        payload: {
          type: 'audit',
          data: auditResult.data,
        },
        timestamp: new Date(),
      };
      const formattedResult = await this.executeAgent('BrandKnight', brandTask);
      results.push(formattedResult);

      return {
        success: true,
        results,
        finalOutput: formattedResult.data,
        totalDurationMs: Date.now() - startTime,
      };

    } catch (error: any) {
      return {
        success: false,
        results,
        finalOutput: null,
        totalDurationMs: Date.now() - startTime,
        errors: [error.message],
      };
    }
  }

  /**
   * ORCHESTRATION WORKFLOW: Content Scheduling
   */
  private async orchestrateScheduling(task: AgentTask): Promise<OrchestrationResult> {
    this.log('📅 Beginning Scheduling Quest');
    const results: AgentResult[] = [];
    const startTime = Date.now();

    try {
      const scheduleResult = await this.executeAgent('SchedulerBard', task);
      results.push(scheduleResult);

      return {
        success: true,
        results,
        finalOutput: scheduleResult.data,
        totalDurationMs: Date.now() - startTime,
      };

    } catch (error: any) {
      return {
        success: false,
        results,
        finalOutput: null,
        totalDurationMs: Date.now() - startTime,
        errors: [error.message],
      };
    }
  }

  /**
   * ORCHESTRATION WORKFLOW: Performance Analysis
   */
  private async orchestrateAnalysis(task: AgentTask): Promise<OrchestrationResult> {
    this.log('📊 Beginning Analysis Quest');
    const results: AgentResult[] = [];
    const startTime = Date.now();

    try {
      // Get analytics data
      const analyticsTask: AgentTask = {
        taskId: `${task.taskId}-analytics`,
        type: 'get_analytics',
        payload: task.payload,
        timestamp: new Date(),
      };
      const analyticsResult = await this.executeAgent('RoyalArchivist', analyticsTask);
      results.push(analyticsResult);

      // Generate insights
      const insightTask: AgentTask = {
        taskId: `${task.taskId}-insights`,
        type: 'generate_insights',
        payload: {
          ...task.payload,
          analytics: analyticsResult.data,
        },
        timestamp: new Date(),
      };
      const insightResult = await this.executeAgent('InsightOracle', insightTask);
      results.push(insightResult);

      return {
        success: true,
        results,
        finalOutput: insightResult.data,
        totalDurationMs: Date.now() - startTime,
      };

    } catch (error: any) {
      return {
        success: false,
        results,
        finalOutput: null,
        totalDurationMs: Date.now() - startTime,
        errors: [error.message],
      };
    }
  }

  /**
   * Execute a specific agent by name
   */
  private async executeAgent(agentName: string, task: AgentTask): Promise<AgentResult> {
    const agent = this.agents.get(agentName);
    if (!agent) {
      throw new Error(`Agent not found: ${agentName}`);
    }

    this.log(`Delegating to ${agentName}`, { taskType: task.type });
    return await agent.handleTask(task);
  }
}
