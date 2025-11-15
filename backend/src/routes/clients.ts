// Client Routes
// API endpoints for client management and operations

import { Router, Request, Response } from 'express';
import { DungeonMaster } from '../agents/DungeonMaster';
import { AgentTask } from '../types/agents';
import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger';

const router = Router();
const dungeonMaster = new DungeonMaster();

/**
 * POST /clients/onboard
 * Onboard a new client
 */
router.post('/onboard', async (req: Request, res: Response) => {
  try {
    const { email, name, businessName, niche, size, goals, socialHandles } = req.body;

    // Validate required fields
    if (!email || !name || !businessName || !niche) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['email', 'name', 'businessName', 'niche'],
      });
    }

    logger.info('Onboarding new client', { email, businessName });

    // Create orchestration task
    const task: AgentTask = {
      taskId: uuidv4(),
      type: 'onboard_client',
      payload: {
        email,
        name,
        businessName,
        niche,
        size,
        goals: goals || [],
        socialHandles: socialHandles || [],
      },
      priority: 'high',
      timestamp: new Date(),
    };

    // Execute through Dungeon Master
    const result = await dungeonMaster.handleTask(task);

    if (!result.success) {
      return res.status(500).json({
        error: 'Onboarding failed',
        message: result.error,
      });
    }

    res.status(201).json({
      success: true,
      data: result.data.finalOutput,
      message: '🏰 Client onboarded successfully!',
    });

  } catch (error: any) {
    logger.error('Onboarding error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

/**
 * POST /clients/:id/generate-content
 * Generate content for a client
 */
router.post('/:id/generate-content', async (req: Request, res: Response) => {
  try {
    const { id: clientId } = req.params;
    const { count = 5, platforms, topic, callToAction } = req.body;

    logger.info('Generating content', { clientId, count });

    const task: AgentTask = {
      taskId: uuidv4(),
      type: 'generate_content',
      payload: {
        clientId,
        count,
        platforms: platforms || ['INSTAGRAM', 'FACEBOOK'],
        topic,
        callToAction,
      },
      priority: 'normal',
      timestamp: new Date(),
    };

    const result = await dungeonMaster.handleTask(task);

    if (!result.success) {
      return res.status(500).json({
        error: 'Content generation failed',
        message: result.error,
      });
    }

    res.json({
      success: true,
      data: result.data.finalOutput,
      message: '📜 Content scrolls prepared!',
    });

  } catch (error: any) {
    logger.error('Content generation error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

/**
 * POST /clients/:id/run-audit
 * Run marketing audit for a client
 */
router.post('/:id/run-audit', async (req: Request, res: Response) => {
  try {
    const { id: clientId } = req.params;

    logger.info('Running audit', { clientId });

    const task: AgentTask = {
      taskId: uuidv4(),
      type: 'run_audit',
      payload: {
        clientId,
        includeRecommendations: true,
      },
      priority: 'high',
      timestamp: new Date(),
    };

    const result = await dungeonMaster.handleTask(task);

    if (!result.success) {
      return res.status(500).json({
        error: 'Audit failed',
        message: result.error,
      });
    }

    res.json({
      success: true,
      data: result.data.finalOutput,
      message: '🔮 The Oracle has spoken!',
    });

  } catch (error: any) {
    logger.error('Audit error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

/**
 * POST /clients/:id/schedule-content
 * Schedule content for publishing
 */
router.post('/:id/schedule-content', async (req: Request, res: Response) => {
  try {
    const { id: clientId } = req.params;
    const { contentIds } = req.body;

    logger.info('Scheduling content', { clientId, count: contentIds?.length });

    const task: AgentTask = {
      taskId: uuidv4(),
      type: 'schedule_content',
      payload: {
        clientId,
        contentIds,
      },
      priority: 'normal',
      timestamp: new Date(),
    };

    const result = await dungeonMaster.handleTask(task);

    if (!result.success) {
      return res.status(500).json({
        error: 'Scheduling failed',
        message: result.error,
      });
    }

    res.json({
      success: true,
      data: result.data.finalOutput,
      message: '📅 Content calendar prepared!',
    });

  } catch (error: any) {
    logger.error('Scheduling error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

/**
 * GET /clients/:id/analytics
 * Get analytics and insights for a client
 */
router.get('/:id/analytics', async (req: Request, res: Response) => {
  try {
    const { id: clientId } = req.params;

    logger.info('Getting analytics', { clientId });

    const task: AgentTask = {
      taskId: uuidv4(),
      type: 'analyze_performance',
      payload: { clientId },
      priority: 'normal',
      timestamp: new Date(),
    };

    const result = await dungeonMaster.handleTask(task);

    if (!result.success) {
      return res.status(500).json({
        error: 'Analytics retrieval failed',
        message: result.error,
      });
    }

    res.json({
      success: true,
      data: result.data.finalOutput,
      message: '📊 Analytics retrieved!',
    });

  } catch (error: any) {
    logger.error('Analytics error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

export default router;
