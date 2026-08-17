export type ViewMode = 'agent' | 'plugins' | 'scheduled' | 'library';

export interface AIModel {
  id: string;
  name: string;
  provider: 'OpenManus' | 'Manus' | 'Google' | 'OpenAI' | 'Anthropic' | 'Groq' | 'DeepSeek' | 'Ollama' | 'Custom';
  modelId: string;
  description: string;
  badge?: string;
  isDefault?: boolean;
  isCustom?: boolean;
  apiKey?: string;
  endpoint?: string;
  speed: string;
  reasoningScore: string;
  contextWindow: string;
}

export interface AgentStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  toolCall?: {
    toolName: string;
    command?: string;
    code?: string;
    language?: string;
    url?: string;
    stdout?: string;
    stderr?: string;
    result?: string;
    executionTimeMs?: number;
    screenshotUrl?: string;
  };
}

export interface ArtifactFile {
  name: string;
  path: string;
  content: string;
  language: string;
}

export interface Artifact {
  id: string;
  title: string;
  type: 'site' | 'slide' | 'doc' | 'sheet' | 'image' | 'video' | 'code' | 'game' | 'simulation' | 'other';
  description: string;
  content: string;
  language?: string;
  date: string;
  previewUrl?: string;
  tags: string[];
  files?: ArtifactFile[];
  starred?: boolean;
}

export interface AgentMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  thinkingProcess?: string;
  reasoningCollapsed?: boolean;
  steps?: AgentStep[];
  activeStepIndex?: number;
  artifacts?: Artifact[];
}

export interface Task {
  id: string;
  title: string;
  iconType: 'code' | 'web' | 'doc' | 'game' | 'drone' | 'sparkles' | 'database' | 'bot';
  status: 'idle' | 'running' | 'completed' | 'failed' | 'scheduled';
  createdAt: string;
  modelUsed?: string;
  messages: AgentMessage[];
  artifacts: Artifact[];
  totalSteps?: number;
  currentStep?: number;
  sandboxLogs?: string[];
  lastUrl?: string;
}

export interface ScheduledTask {
  id: string;
  title: string;
  prompt: string;
  scheduleType: 'hourly' | 'daily' | 'weekly' | 'cron';
  cronExpression?: string;
  time?: string;
  isActive: boolean;
  lastRun?: string;
  nextRun: string;
  autoRunSandbox: boolean;
  targetModel: string;
  tags?: string[];
}

export interface PluginItem {
  id: string;
  category: 'connector' | 'skill' | 'datasource';
  name: string;
  description: string;
  iconName: string;
  isConnected: boolean;
  verified?: boolean;
  badge?: string;
  author?: string;
}

export interface SandboxState {
  isOpen: boolean;
  activeTab: 'browser' | 'terminal' | 'editor' | 'preview';
  url: string;
  browserHistory: string[];
  terminalLogs: { type: 'cmd' | 'stdout' | 'stderr' | 'info'; text: string; timestamp: string }[];
  activeFile?: ArtifactFile;
  files: ArtifactFile[];
  activeArtifact?: Artifact;
  isRunning: boolean;
  cpuUsage: number;
  memoryUsage: number;
}
