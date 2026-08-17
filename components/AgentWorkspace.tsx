'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Share2,
  Settings,
  Maximize2,
  Minimize2,
  Paperclip,
  Mic,
  MicOff,
  Globe,
  Terminal,
  Send,
  Square,
  CheckCircle2,
  Circle,
  Code2,
  ExternalLink,
  RefreshCw,
  Folder,
  FileCode,
  Copy,
  Check,
  Play,
  Layers,
  ArrowRight,
  Download,
  Eye,
  Columns,
  Cpu,
  Monitor,
  Flame,
  AlertCircle
} from 'lucide-react';
import { Task, AIModel, AgentMessage, AgentStep, Artifact, ArtifactFile } from '@/types/agent';
import { ManusLogo } from '@/components/ManusLogo';
import confetti from 'canvas-confetti';

interface AgentWorkspaceProps {
  task: Task;
  models: AIModel[];
  activeModelId: string;
  onSelectModel: (modelId: string) => void;
  onSendMessage: (prompt: string, runE2B: boolean, webSearch: boolean) => Promise<void>;
  onOpenModelManager: () => void;
  onOpenShareModal: () => void;
  onOpenArtifact: (artifact: Artifact) => void;
  isGenerating: boolean;
  onStopGeneration?: () => void;
}

export function AgentWorkspace({
  task,
  models,
  activeModelId,
  onSelectModel,
  onSendMessage,
  onOpenModelManager,
  onOpenShareModal,
  onOpenArtifact,
  isGenerating,
  onStopGeneration,
}: AgentWorkspaceProps) {
  const [inputPrompt, setInputPrompt] = useState('');
  const [runE2B, setRunE2B] = useState(true);
  const [webSearch, setWebSearch] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [splitViewOpen, setSplitViewOpen] = useState(true);
  const [activeSandboxTab, setActiveSandboxTab] = useState<'browser' | 'terminal' | 'editor' | 'artifact'>('browser');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [expandedReasoning, setExpandedReasoning] = useState<Record<string, boolean>>({
    'm-2': true,
  });
  const [activeFile, setActiveFile] = useState<ArtifactFile | null>(null);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'E2B Sandbox Container Initialized [Ubuntu 22.04 LTS]',
    'Node.js v20.14.0 | Python 3.11.8 | Chromium 124.0.6367.91',
    'Ready for autonomous agent commands.',
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const activeModel = models.find(m => m.id === activeModelId) || models[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [task.messages, isGenerating]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  const toggleVoiceRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.lang = 'pt-BR';
          recognition.interimResults = false;
          recognition.maxAlternatives = 1;

          recognition.onstart = () => {
            setIsRecording(true);
          };

          recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            if (transcript) {
              setInputPrompt(prev => (prev ? `${prev} ${transcript}` : transcript));
            }
            setIsRecording(false);
          };

          recognition.onerror = () => {
            setIsRecording(false);
          };

          recognition.onend = () => {
            setIsRecording(false);
          };

          recognition.start();
          return;
        } catch {
          // fallback below
        }
      }
    }

    // Fallback simulation if speech recognition is not supported in iframe/browser
    setIsRecording(true);
    setTimeout(() => {
      setInputPrompt(prev => (prev ? `${prev} Crie um aplicativo interativo completo.` : 'Crie um aplicativo interativo completo com interface moderna e sandbox E2B.'));
      setIsRecording(false);
    }, 2000);
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputPrompt.trim() || isGenerating) return;

    const query = inputPrompt;
    setInputPrompt('');
    await onSendMessage(query, runE2B, webSearch);
  };

  const handleTerminalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    const cmd = terminalInput;
    setTerminalInput('');
    setTerminalLogs(prev => [...prev, `$ ${cmd}`]);

    try {
      const res = await fetch('/api/e2b/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd }),
      });
      const data = await res.json();
      setTerminalLogs(prev => [...prev, data.stdout || 'Command executed.']);
    } catch {
      setTerminalLogs(prev => [...prev, `Executed: ${cmd}`]);
    }
  };

  const toggleReasoning = (messageId: string) => {
    setExpandedReasoning(prev => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  };

  const activeArtifact = task.artifacts.length > 0 ? task.artifacts[task.artifacts.length - 1] : null;

  return (
    <div className="flex-1 h-screen flex flex-col bg-[#fcfcfc] text-stone-900 font-sans overflow-hidden">
      {/* Top Header Bar */}
      <header className="h-14 border-b border-[#e8eaed] bg-white px-4 md:px-6 flex items-center justify-between flex-shrink-0 z-10">
        {/* Left: Model Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-200/90 hover:border-stone-300 bg-stone-50/80 hover:bg-stone-100/80 transition text-xs font-semibold text-stone-800 shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-bold text-stone-900">{activeModel.name}</span>
            {activeModel.badge && (
              <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-900 rounded-full font-medium hidden sm:inline-block">
                {activeModel.badge}
              </span>
            )}
            <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
          </button>

          {/* Model Selector Dropdown Menu */}
          {isModelDropdownOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-72 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-30 animate-in fade-in">
              <div className="px-3 py-1 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                Modelos de IA Disponíveis
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-stone-100">
                {models.map(m => (
                  <button
                    key={m.id}
                    onClick={() => {
                      onSelectModel(m.id);
                      setIsModelDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2.5 text-left hover:bg-stone-50 transition flex items-center justify-between group"
                  >
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <span>{m.name}</span>
                        {m.id === activeModelId && (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                      </div>
                      <div className="text-[10px] text-stone-500 line-clamp-1">{m.description}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-2 border-t border-stone-100 mt-1">
                <button
                  onClick={() => {
                    setIsModelDropdownOpen(false);
                    onOpenModelManager();
                  }}
                  className="w-full py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Configurar Modelos / E2B</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              confetti({ particleCount: 60, spread: 70, origin: { y: 0.2 } });
              alert('Plano Manus Pro 1.6 ativado com sucesso para seu workspace.');
            }}
            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 rounded-xl text-xs font-semibold transition hidden sm:flex items-center gap-1.5"
          >
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>Iniciar teste gratuito</span>
          </button>

          <button
            onClick={onOpenShareModal}
            className="px-3 py-1.5 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 rounded-xl text-xs font-semibold shadow-2xs transition flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Compartilhar</span>
          </button>

          <button
            onClick={() => setSplitViewOpen(!splitViewOpen)}
            title={splitViewOpen ? 'Ocultar painel sandbox' : 'Mostrar painel sandbox (Navegador/Terminal)'}
            className={`p-2 rounded-xl border transition ${
              splitViewOpen
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Columns className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenModelManager}
            title="Configurações de IA e E2B"
            className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Execution Workspace (Dual Pane) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Pane: Chat, Reasoning & Step Progress */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#fafafa]">
          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {task.messages.map((message, idx) => {
                const isUser = message.role === 'user';

                if (isUser) {
                  return (
                    <div key={message.id} className="flex justify-end">
                      <div className="bg-stone-900 text-white rounded-2xl rounded-tr-xs px-4 py-3 max-w-xl text-xs md:text-sm leading-relaxed shadow-sm">
                        {message.content}
                      </div>
                    </div>
                  );
                }

                // Assistant message
                return (
                  <div key={message.id} className="space-y-4">
                    {/* Manus Header with Avatar */}
                    <div className="flex items-center gap-2.5">
                      <ManusLogo size={22} showText={true} />
                    </div>

                    {/* Summary text */}
                    <div className="text-xs md:text-sm text-stone-800 leading-relaxed font-sans pl-1">
                      {message.content}
                    </div>

                    {/* Collapsible Reasoning Process Accordion */}
                    {message.thinkingProcess && (
                      <div className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-2xs">
                        <button
                          onClick={() => toggleReasoning(message.id)}
                          className="w-full px-4 py-2.5 bg-stone-50/60 hover:bg-stone-100/60 flex items-center justify-between text-left transition"
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            <span className="text-xs font-bold text-stone-800">
                              Processo de Raciocínio (Thinking CoT)
                            </span>
                          </div>
                          {expandedReasoning[message.id] ? (
                            <ChevronUp className="w-4 h-4 text-stone-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-stone-400" />
                          )}
                        </button>

                        {expandedReasoning[message.id] && (
                          <div className="p-4 text-xs font-mono text-stone-700 bg-stone-50/30 whitespace-pre-line border-t border-stone-100 leading-relaxed">
                            {message.thinkingProcess}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step-by-Step Execution Plan */}
                    {message.steps && message.steps.length > 0 && (
                      <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between text-xs font-bold text-stone-700 border-b border-stone-100 pb-2">
                          <span className="flex items-center gap-2">
                            <Terminal className="w-3.5 h-3.5 text-sky-600" />
                            Plano de Execução Autônoma E2B
                          </span>
                          <span className="text-stone-400 font-mono">
                            {message.steps.filter(s => s.status === 'completed').length}/{message.steps.length}
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          {message.steps.map(step => {
                            const isCompleted = step.status === 'completed';
                            const isRunning = step.status === 'running';

                            return (
                              <div
                                key={step.id}
                                className={`p-3 rounded-xl border transition space-y-1.5 ${
                                  isRunning
                                    ? 'bg-sky-50/50 border-sky-200'
                                    : isCompleted
                                    ? 'bg-stone-50/50 border-stone-200/80'
                                    : 'bg-white border-stone-100 opacity-60'
                                }`}
                              >
                                <div className="flex items-start gap-2.5">
                                  {isCompleted ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                  ) : isRunning ? (
                                    <div className="w-4 h-4 border-2 border-sky-600 border-t-transparent rounded-full animate-spin flex-shrink-0 mt-0.5" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-stone-300 flex-shrink-0 mt-0.5" />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-bold text-stone-900">{step.title}</div>
                                    <div className="text-[11px] text-stone-500 leading-normal">
                                      {step.description}
                                    </div>
                                  </div>
                                </div>

                                {step.toolCall && (
                                  <div className="ml-6 mt-1 p-2 bg-stone-900 rounded-lg font-mono text-[11px] text-stone-200 space-y-1">
                                    {step.toolCall.command && (
                                      <div className="text-emerald-400 flex items-center gap-1.5">
                                        <span className="text-stone-500">$</span>
                                        <span>{step.toolCall.command}</span>
                                      </div>
                                    )}
                                    {step.toolCall.stdout && (
                                      <div className="text-stone-300 text-[10px] whitespace-pre-line opacity-90">
                                        {step.toolCall.stdout}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Generated Artifact Card Preview inside message */}
                    {message.artifacts && message.artifacts.length > 0 && (
                      <div className="pt-2 space-y-2">
                        <div className="text-xs font-bold text-stone-700">Artefatos Criados</div>
                        <div className="grid grid-cols-1 gap-3">
                          {message.artifacts.map(art => (
                            <div
                              key={art.id}
                              className="bg-white border border-stone-200 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                                  <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold text-stone-900">{art.title}</h4>
                                  <p className="text-[11px] text-stone-500">{art.description}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => onOpenArtifact(art)}
                                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
                              >
                                <Play className="w-3.5 h-3.5 fill-white" />
                                <span>Executar App</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {isGenerating && (
                <div className="space-y-3 animate-pulse">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-stone-900 text-white flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                    </div>
                    <span className="text-xs font-bold text-stone-900">OpenManus está trabalhando no sandbox...</span>
                  </div>
                  <div className="h-12 bg-stone-200/60 rounded-xl" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Docked / Floating Task Progress Tracker */}
          <div className="px-4 md:px-8 py-2 bg-white/80 backdrop-blur-xs border-t border-stone-200/80">
            <div className="max-w-3xl mx-auto flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-800">Progresso da tarefa</span>
                <span className="px-2 py-0.5 bg-stone-100 rounded-full text-stone-600 font-mono text-[11px]">
                  {task.currentStep || 2}/{task.totalSteps || 5}
                </span>
              </div>
              <div className="flex-1 max-w-xs mx-4 bg-stone-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-stone-900 h-full transition-all duration-300"
                  style={{
                    width: `${((task.currentStep || 2) / (task.totalSteps || 5)) * 100}%`,
                  }}
                />
              </div>
              <span className="text-stone-500 text-[11px]">Ambiente E2B Conectado</span>
            </div>
          </div>

          {/* Bottom Prompt Composer */}
          <div className="p-4 md:p-6 bg-white border-t border-stone-200">
            <div className="max-w-3xl mx-auto space-y-3">
              {/* Prompt Input Box */}
              <form onSubmit={handleSend} className="bg-stone-100/90 border border-stone-200/90 focus-within:border-stone-400 focus-within:bg-white rounded-2xl p-2 md:p-3 shadow-2xs transition">
                <textarea
                  rows={2}
                  placeholder="Pergunte qualquer coisa ao OpenManus (Open Source), sem limites de uso..."
                  value={inputPrompt}
                  onChange={e => setInputPrompt(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="w-full bg-transparent text-xs md:text-sm text-stone-900 placeholder-stone-400 outline-none resize-none px-2 py-1 leading-relaxed"
                />

                {/* Input action toolbar */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-200/50">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        const file = prompt('Cole o conteúdo ou link do arquivo para upload:');
                        if (file) setInputPrompt(prev => prev + `\n[Arquivo anexado: ${file}]`);
                      }}
                      className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 rounded-xl transition"
                      title="Anexar arquivo"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={toggleVoiceRecording}
                      className={`p-2 rounded-xl transition ${
                        isRecording
                          ? 'bg-rose-100 text-rose-600 animate-pulse'
                          : 'text-stone-500 hover:text-stone-800 hover:bg-stone-200/60'
                      }`}
                      title={isRecording ? 'Parar gravação' : 'Gravar áudio'}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setWebSearch(!webSearch)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                        webSearch
                          ? 'bg-sky-100 text-sky-800'
                          : 'text-stone-500 hover:bg-stone-200/60'
                      }`}
                      title="Pesquisa na Web ao vivo"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Web</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRunE2B(!runE2B)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                        runE2B
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'text-stone-500 hover:bg-stone-200/60'
                      }`}
                      title="Executar no sandbox E2B"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">E2B Sandbox</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {isGenerating ? (
                      <button
                        type="button"
                        onClick={onStopGeneration}
                        className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition flex items-center gap-1.5"
                      >
                        <Square className="w-3.5 h-3.5 fill-white" />
                        <span>Parar</span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!inputPrompt.trim()}
                        className="p-2 bg-stone-900 disabled:bg-stone-300 text-white rounded-xl hover:bg-stone-800 transition shadow-2xs"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </form>

              {/* Quick suggestion chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px]">
                <span className="text-stone-400 flex-shrink-0">Sugestões:</span>
                <button
                  onClick={() => setInputPrompt('Crie uma plataforma com 50 designs profissionais para web.')}
                  className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200/80 rounded-lg text-stone-700 transition whitespace-nowrap"
                >
                  Plataforma 50 Designs
                </button>
                <button
                  onClick={() => setInputPrompt('Crie um jogo da cobrinha em HTML5 com tema de lago zen de carpas japonesas.')}
                  className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200/80 rounded-lg text-stone-700 transition whitespace-nowrap"
                >
                  Jogo Koi Zen Snake
                </button>
                <button
                  onClick={() => setInputPrompt('Construa um simulador 3D de voo de drone com HUD de telemetria DJI.')}
                  className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200/80 rounded-lg text-stone-700 transition whitespace-nowrap"
                >
                  Simulador Drone DJI
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane: Sandbox & Tool Execution Dual-Screen Drawer */}
        {splitViewOpen && (
          <div className="w-full md:w-[480px] lg:w-[540px] border-l border-stone-200 bg-white flex flex-col h-full flex-shrink-0 z-10 shadow-lg">
            {/* Drawer Header Tabs */}
            <div className="h-12 border-b border-stone-200 px-3 flex items-center justify-between bg-stone-50/80">
              <div className="flex items-center gap-1 overflow-x-auto">
                <button
                  onClick={() => setActiveSandboxTab('browser')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                    activeSandboxTab === 'browser'
                      ? 'bg-white text-stone-900 shadow-2xs border border-stone-200'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-sky-600" />
                  <span>Navegador</span>
                </button>

                <button
                  onClick={() => setActiveSandboxTab('terminal')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                    activeSandboxTab === 'terminal'
                      ? 'bg-white text-stone-900 shadow-2xs border border-stone-200'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Terminal E2B</span>
                </button>

                <button
                  onClick={() => setActiveSandboxTab('editor')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                    activeSandboxTab === 'editor'
                      ? 'bg-white text-stone-900 shadow-2xs border border-stone-200'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>Arquivos</span>
                </button>

                {activeArtifact && (
                  <button
                    onClick={() => setActiveSandboxTab('artifact')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                      activeSandboxTab === 'artifact'
                        ? 'bg-white text-stone-900 shadow-2xs border border-stone-200'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>App / Artefato</span>
                  </button>
                )}
              </div>

              {activeArtifact && (
                <button
                  onClick={() => onOpenArtifact(activeArtifact)}
                  title="Expandir em tela cheia"
                  className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg transition"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sandbox Tab Contents */}
            <div className="flex-1 overflow-hidden relative bg-stone-950">
              {/* Tab 1: Live Browser Simulation */}
              {activeSandboxTab === 'browser' && (
                <div className="w-full h-full flex flex-col bg-white">
                  {/* Address Bar */}
                  <div className="p-2 border-b border-stone-200 bg-stone-100 flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1 text-stone-400">
                      <button className="p-1 hover:text-stone-700 transition">←</button>
                      <button className="p-1 hover:text-stone-700 transition">→</button>
                    </div>
                    <div className="flex-1 px-3 py-1 bg-white rounded-lg border border-stone-200 font-mono text-[11px] text-stone-600 truncate">
                      https://sandbox.e2b.dev/preview/live-app
                    </div>
                    <button
                      onClick={() => alert('Navegador atualizado.')}
                      className="p-1 text-stone-500 hover:text-stone-800"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Browser Viewport */}
                  <div className="flex-1 bg-stone-50 overflow-auto">
                    {activeArtifact ? (
                      <iframe
                        srcDoc={activeArtifact.content}
                        title="Sandbox Preview"
                        className="w-full h-full border-none"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                      />
                    ) : (
                      <div className="p-8 text-center space-y-3 my-auto flex flex-col items-center justify-center h-full">
                        <Globe className="w-10 h-10 text-sky-500 animate-pulse" />
                        <h4 className="text-xs font-bold text-stone-800">
                          Navegador de Sandbox Pronto
                        </h4>
                        <p className="text-[11px] text-stone-500 max-w-xs">
                          O Manus navega automaticamente, clica e inspeciona elementos web durante as tarefas.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 2: Terminal E2B Shell */}
              {activeSandboxTab === 'terminal' && (
                <div className="w-full h-full flex flex-col bg-[#0d1117] text-stone-200 font-mono text-xs p-3">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-2 text-[10px] text-stone-400">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>e2b-sbx-runner-active</span>
                    </div>
                    <span>CPU: 4% | MEM: 320MB / 4GB</span>
                  </div>

                  <div className="flex-1 overflow-y-auto py-3 space-y-1.5">
                    {terminalLogs.map((log, i) => (
                      <div
                        key={i}
                        className={`leading-relaxed whitespace-pre-wrap ${
                          log.startsWith('$')
                            ? 'text-emerald-400 font-bold'
                            : log.includes('Error')
                            ? 'text-rose-400'
                            : 'text-stone-300'
                        }`}
                      >
                        {log}
                      </div>
                    ))}
                    <div ref={terminalEndRef} />
                  </div>

                  {/* Terminal input */}
                  <form onSubmit={handleTerminalSubmit} className="pt-2 border-t border-stone-800 flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">$</span>
                    <input
                      type="text"
                      placeholder="Execute comandos bash ou python (ex: ls, python -c 'print(42)')..."
                      value={terminalInput}
                      onChange={e => setTerminalInput(e.target.value)}
                      className="flex-1 bg-transparent text-xs text-stone-200 outline-none placeholder-stone-600 font-mono"
                    />
                  </form>
                </div>
              )}

              {/* Tab 3: File Explorer & Code Editor */}
              {activeSandboxTab === 'editor' && (
                <div className="w-full h-full flex bg-[#0d1117] text-stone-200 font-mono text-xs">
                  {/* File tree sidebar */}
                  <div className="w-40 border-r border-stone-800 p-2 space-y-1 overflow-y-auto">
                    <div className="text-[10px] font-bold text-stone-500 uppercase px-2 py-1">
                      /workspace
                    </div>
                    <button className="w-full text-left px-2 py-1 rounded hover:bg-stone-800 flex items-center gap-1.5 text-stone-300 text-[11px]">
                      <FileCode className="w-3.5 h-3.5 text-amber-400" />
                      <span>index.html</span>
                    </button>
                    <button className="w-full text-left px-2 py-1 rounded hover:bg-stone-800 flex items-center gap-1.5 text-stone-300 text-[11px]">
                      <FileCode className="w-3.5 h-3.5 text-sky-400" />
                      <span>package.json</span>
                    </button>
                    <button className="w-full text-left px-2 py-1 rounded hover:bg-stone-800 flex items-center gap-1.5 text-stone-300 text-[11px]">
                      <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                      <span>main.py</span>
                    </button>
                  </div>

                  {/* Code viewer */}
                  <div className="flex-1 p-4 overflow-auto">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-3">
                      <span className="text-stone-400 text-[11px]">index.html</span>
                      <button
                        onClick={() => {
                          if (activeArtifact) {
                            navigator.clipboard.writeText(activeArtifact.content);
                            alert('Código copiado!');
                          }
                        }}
                        className="text-[10px] px-2 py-0.5 bg-stone-800 hover:bg-stone-700 rounded text-stone-300 flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" /> Copiar
                      </button>
                    </div>
                    <pre className="text-[11px] text-stone-300 leading-relaxed overflow-x-auto">
                      {activeArtifact ? activeArtifact.content : `// Nenhum arquivo selecionado`}
                    </pre>
                  </div>
                </div>
              )}

              {/* Tab 4: Live Artifact Application */}
              {activeSandboxTab === 'artifact' && activeArtifact && (
                <div className="w-full h-full bg-white flex flex-col">
                  <iframe
                    srcDoc={activeArtifact.content}
                    title={activeArtifact.title}
                    className="w-full h-full border-none"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
