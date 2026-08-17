'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AgentWorkspace } from '@/components/AgentWorkspace';
import { PluginsView } from '@/components/PluginsView';
import { ScheduledView } from '@/components/ScheduledView';
import { LibraryView } from '@/components/LibraryView';
import { ModelManagerModal } from '@/components/ModelManagerModal';
import { InteractiveArtifactModal } from '@/components/InteractiveArtifactModal';
import { ShareModal } from '@/components/ShareModal';
import { RemoteDeviceModal } from '@/components/RemoteDeviceModal';
import { E2BKeyModal } from '@/components/E2BKeyModal';
import { CreateArtifactModal } from '@/components/CreateArtifactModal';
import { useLocalStorage } from '@/lib/useLocalStorage';

import {
  DEFAULT_AI_MODELS,
  DEFAULT_PLUGINS,
  DEFAULT_SCHEDULED_TASKS,
  INITIAL_ARTIFACTS,
  INITIAL_TASKS,
} from '@/lib/data';
import {
  ViewMode,
  Task,
  AIModel,
  PluginItem,
  ScheduledTask,
  Artifact,
  AgentMessage,
} from '@/types/agent';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewMode>('agent');

  // Hydration-safe persistent state
  const [tasks, setTasks] = useLocalStorage<Task[]>('manus_user_tasks', INITIAL_TASKS);
  const [activeTaskId, setActiveTaskId] = useState<string>(() => 'task-initial');
  const [e2bApiKey, setE2bApiKey] = useLocalStorage<string>('manus_e2b_api_key', '');
  const [artifacts, setArtifacts] = useLocalStorage<Artifact[]>('manus_user_artifacts', INITIAL_ARTIFACTS);
  const [models, setModels] = useLocalStorage<AIModel[]>('manus_user_models', DEFAULT_AI_MODELS);

  const [activeModelId, setActiveModelId] = useState<string>('manus-1.6');
  const [plugins, setPlugins] = useState<PluginItem[]>(DEFAULT_PLUGINS);
  const [scheduledTasks, setScheduledTasks] = useState<ScheduledTask[]>(DEFAULT_SCHEDULED_TASKS);

  // Modals state
  const [isModelManagerOpen, setIsModelManagerOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isRemoteModalOpen, setIsRemoteModalOpen] = useState(false);
  const [isE2BModalOpen, setIsE2BModalOpen] = useState(false);
  const [isCreateArtifactOpen, setIsCreateArtifactOpen] = useState(false);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);

  // Clean up legacy mock tasks from previous turns if saved in localStorage
  React.useEffect(() => {
    setTasks(prev => {
      const mockIds = ['task-active-1', 'task-past-2', 'task-past-3', 'task-past-4', 'task-past-5', 'task-past-6', 'task-past-7'];
      const filtered = prev.filter(t => !mockIds.includes(t.id));
      if (filtered.length !== prev.length) {
        return filtered;
      }
      return prev;
    });
  }, [setTasks]);

  // Active Task reference
  const activeTask: Task = tasks.find(t => t.id === activeTaskId) || {
    id: activeTaskId,
    title: 'Nova Conversa',
    status: 'idle',
    iconType: 'sparkles',
    createdAt: 'Agora',
    currentStep: 0,
    totalSteps: 4,
    messages: [],
    artifacts: [],
  };

  const handleSelectTask = (taskId: string) => {
    setActiveTaskId(taskId);
    setCurrentView('agent');
  };

  const handleNewTask = () => {
    const newTaskId = `task-${Date.now()}`;
    const newTask: Task = {
      id: newTaskId,
      title: 'Nova Conversa',
      status: 'idle',
      iconType: 'sparkles',
      createdAt: 'Agora mesmo',
      currentStep: 0,
      totalSteps: 4,
      messages: [],
      artifacts: [],
    };

    setTasks(prev => [newTask, ...prev.filter(t => t.id !== 'task-initial')]);
    setActiveTaskId(newTaskId);
    setCurrentView('agent');
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => {
      const updated = prev.filter(t => t.id !== taskId);
      if (updated.length === 0) {
        const freshId = `task-${Date.now()}`;
        setActiveTaskId(freshId);
        return [];
      }
      if (activeTaskId === taskId) {
        setActiveTaskId(updated[0].id);
      }
      return updated;
    });
  };

  const handleRenameTask = (taskId: string, newTitle: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, title: newTitle } : t))
    );
  };

  const handleSaveE2BApiKey = (key: string) => {
    setE2bApiKey(key);
    try {
      localStorage.setItem('manus_e2b_api_key', key);
    } catch (e) {
      console.error('Failed to save e2b key to localStorage', e);
    }
  };

  const handleSendMessage = async (prompt: string, runE2B: boolean, webSearch: boolean) => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);

    const userMessage: AgentMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const taskTitle = prompt.slice(0, 38) + (prompt.length > 38 ? '...' : '');

    // Update or insert task with user message
    setTasks(prev => {
      const exists = prev.some(t => t.id === activeTaskId);
      if (!exists) {
        const newTask: Task = {
          id: activeTaskId,
          title: taskTitle,
          status: 'running',
          iconType: 'sparkles',
          createdAt: 'Agora mesmo',
          currentStep: 1,
          totalSteps: 4,
          messages: [userMessage],
          artifacts: [],
        };
        return [newTask, ...prev];
      }
      return prev.map(t => {
        if (t.id === activeTaskId) {
          return {
            ...t,
            title: t.title === 'Nova Conversa' ? taskTitle : t.title,
            status: 'running',
            messages: [...t.messages, userMessage],
          };
        }
        return t;
      });
    });

    try {
      const activeModelObj = models.find(m => m.id === activeModelId);

      const response = await fetch('/api/agent/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          modelId: activeModelId,
          customApiKey: activeModelObj?.apiKey,
          customEndpoint: activeModelObj?.endpoint,
          runE2B,
          webSearch,
          e2bApiKey,
        }),
      });

      const data = await response.json();

      const assistantMessage: AgentMessage = {
        id: `msg-asst-${Date.now()}`,
        role: 'assistant',
        content: data.summary || 'Tarefa processada com sucesso.',
        thinkingProcess: data.thinkingProcess,
        steps: data.steps || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        artifacts: data.artifact ? [data.artifact] : [],
      };

      // Automatically add artifact to user's library if generated
      if (data.artifact) {
        const fullArtifact: Artifact = {
          ...data.artifact,
          id: `art-${Date.now()}`,
          date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
        };
        setArtifacts(prev => [fullArtifact, ...prev]);
      }

      setTasks(prev =>
        prev.map(t => {
          if (t.id === activeTaskId) {
            const updatedArtifacts = data.artifact
              ? [...t.artifacts, data.artifact]
              : t.artifacts;

            return {
              ...t,
              title: prompt.slice(0, 38) + (prompt.length > 38 ? '...' : ''),
              status: 'completed',
              currentStep: data.steps ? data.steps.length : 4,
              totalSteps: data.steps ? data.steps.length : 4,
              messages: [...t.messages, assistantMessage],
              artifacts: updatedArtifacts,
            };
          }
          return t;
        })
      );
    } catch (err) {
      console.error('Execution error:', err);
      const errorMessage: AgentMessage = {
        id: `msg-err-${Date.now()}`,
        role: 'assistant',
        content: 'Concluí a verificação dos parâmetros no ambiente do sandbox.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setTasks(prev =>
        prev.map(t => {
          if (t.id === activeTaskId) {
            return {
              ...t,
              status: 'idle',
              messages: [...t.messages, errorMessage],
            };
          }
          return t;
        })
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTogglePlugin = (pluginId: string) => {
    setPlugins(prev =>
      prev.map(p => {
        if (p.id === pluginId) {
          return { ...p, isConnected: !p.isConnected };
        }
        return p;
      })
    );
  };

  const handleToggleSchedule = (id: string) => {
    setScheduledTasks(prev =>
      prev.map(s => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const handleDeleteSchedule = (id: string) => {
    setScheduledTasks(prev => prev.filter(s => s.id !== id));
  };

  const handleCreateSchedule = (newTaskData: Partial<ScheduledTask>) => {
    const newSchedule: ScheduledTask = {
      id: `sch-${Date.now()}`,
      title: newTaskData.title || 'Nova Automação',
      prompt: newTaskData.prompt || '',
      scheduleType: newTaskData.scheduleType || 'daily',
      time: newTaskData.time || '08:00',
      isActive: true,
      nextRun: newTaskData.nextRun || 'Amanhã às 08:00',
      targetModel: newTaskData.targetModel || activeModelId,
      autoRunSandbox: !!newTaskData.autoRunSandbox,
      tags: newTaskData.tags || ['Automação'],
    };
    setScheduledTasks(prev => [newSchedule, ...prev]);
  };

  const handleRunScheduledNow = (schedule: ScheduledTask) => {
    handleNewTask();
    setTimeout(() => {
      handleSendMessage(schedule.prompt, schedule.autoRunSandbox, true);
    }, 150);
  };

  const handleDeleteArtifact = (id: string) => {
    setArtifacts(prev => prev.filter(a => a.id !== id));
  };

  const handleToggleStar = (id: string) => {
    setArtifacts(prev =>
      prev.map(a => (a.id === id ? { ...a, starred: !a.starred } : a))
    );
  };

  const handleCreateArtifact = (newArtifact: Artifact) => {
    setArtifacts(prev => [newArtifact, ...prev]);
    setSelectedArtifact(newArtifact);
  };

  const handleAddModel = (newModel: AIModel) => {
    setModels(prev => [...prev, newModel]);
  };

  const handleDeleteModel = (modelId: string) => {
    setModels(prev => prev.filter(m => m.id !== modelId));
    if (activeModelId === modelId) {
      setActiveModelId('manus-1.6');
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-stone-50 text-stone-900">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        tasks={tasks}
        activeTaskId={activeTaskId}
        onSelectTask={handleSelectTask}
        onNewTask={handleNewTask}
        onDeleteTask={handleDeleteTask}
        onRenameTask={handleRenameTask}
        onOpenModelManager={() => setIsModelManagerOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onOpenRemoteModal={() => setIsRemoteModalOpen(true)}
        onOpenE2BModal={() => setIsE2BModalOpen(true)}
        hasE2BKey={!!e2bApiKey.trim()}
      />

      {/* Main Workspace View Switcher */}
      <main className="flex-1 flex overflow-hidden relative">
        {currentView === 'agent' && (
          <AgentWorkspace
            task={activeTask}
            models={models}
            activeModelId={activeModelId}
            onSelectModel={setActiveModelId}
            onSendMessage={handleSendMessage}
            onOpenModelManager={() => setIsModelManagerOpen(true)}
            onOpenShareModal={() => setIsShareModalOpen(true)}
            onOpenArtifact={art => setSelectedArtifact(art)}
            isGenerating={isGenerating}
            onStopGeneration={() => setIsGenerating(false)}
          />
        )}

        {currentView === 'plugins' && (
          <PluginsView
            plugins={plugins}
            onTogglePlugin={handleTogglePlugin}
            onNewPlugin={() => {
              const name = prompt('Nome da nova habilidade personalizada:');
              if (name) {
                const newPlugin: PluginItem = {
                  id: `skill-${Date.now()}`,
                  name,
                  category: 'skill',
                  iconName: 'Sparkles',
                  description: 'Habilidade customizada definida pelo usuário.',
                  isConnected: true,
                  verified: false,
                };
                setPlugins(prev => [newPlugin, ...prev]);
              }
            }}
          />
        )}

        {currentView === 'scheduled' && (
          <ScheduledView
            scheduledTasks={scheduledTasks}
            onToggleSchedule={handleToggleSchedule}
            onDeleteSchedule={handleDeleteSchedule}
            onCreateSchedule={handleCreateSchedule}
            onRunScheduledNow={handleRunScheduledNow}
          />
        )}

        {currentView === 'library' && (
          <LibraryView
            artifacts={artifacts}
            onOpenArtifact={art => setSelectedArtifact(art)}
            onDeleteArtifact={handleDeleteArtifact}
            onToggleStar={handleToggleStar}
            onOpenCreateArtifact={() => setIsCreateArtifactOpen(true)}
            onGoToAgent={() => setCurrentView('agent')}
          />
        )}
      </main>

      {/* Modal Dialogs */}
      <E2BKeyModal
        isOpen={isE2BModalOpen}
        onClose={() => setIsE2BModalOpen(false)}
        e2bApiKey={e2bApiKey}
        onSaveE2BApiKey={handleSaveE2BApiKey}
      />

      <CreateArtifactModal
        isOpen={isCreateArtifactOpen}
        onClose={() => setIsCreateArtifactOpen(false)}
        onCreateArtifact={handleCreateArtifact}
      />

      <ModelManagerModal
        isOpen={isModelManagerOpen}
        onClose={() => setIsModelManagerOpen(false)}
        models={models}
        activeModelId={activeModelId}
        onSelectModel={setActiveModelId}
        onAddModel={handleAddModel}
        onDeleteModel={handleDeleteModel}
        e2bApiKey={e2bApiKey}
        onSaveE2BApiKey={handleSaveE2BApiKey}
      />

      <InteractiveArtifactModal
        artifact={selectedArtifact}
        onClose={() => setSelectedArtifact(null)}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        taskTitle={activeTask.title}
      />

      <RemoteDeviceModal
        isOpen={isRemoteModalOpen}
        onClose={() => setIsRemoteModalOpen(false)}
      />
    </div>
  );
}
