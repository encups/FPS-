// Agent System Type Definitions
// Frame Fables Multi-Agent Framework

export interface AgentTask {
  taskId: string;
  type: string;
  payload: Record<string, any>;
  priority?: 'low' | 'normal' | 'high';
  timestamp: Date;
}

export interface AgentResult {
  taskId: string;
  agentName: string;
  success: boolean;
  data?: any;
  error?: string;
  metadata?: {
    durationMs: number;
    tokensUsed?: number;
    subTasks?: string[];
  };
  timestamp: Date;
}

export interface Agent {
  name: string;
  description: string;
  capabilities: string[];
  handleTask(task: AgentTask): Promise<AgentResult>;
}

export interface OrchestrationResult {
  success: boolean;
  results: AgentResult[];
  finalOutput: any;
  totalDurationMs: number;
  errors?: string[];
}

// Specific task payloads

export interface OnboardClientPayload {
  email: string;
  name: string;
  businessName: string;
  niche: string;
  size?: string;
  goals: string[];
  socialHandles?: {
    platform: string;
    handle: string;
  }[];
}

export interface GenerateContentPayload {
  clientId: string;
  platform: string;
  contentType: string;
  count?: number;
  topic?: string;
  callToAction?: string;
}

export interface RunAuditPayload {
  clientId: string;
  includeRecommendations?: boolean;
}

export interface ScheduleContentPayload {
  clientId: string;
  contentIds?: string[];
  startDate?: Date;
  endDate?: Date;
}

export interface PublishContentPayload {
  contentId: string;
  platform: string;
  immediate?: boolean;
}
