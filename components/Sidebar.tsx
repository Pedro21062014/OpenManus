'use client';

import React, { useState } from 'react';
import {
  SquarePen,
  Terminal,
  Layers,
  Clock,
  FolderKanban,
  Plus,
  SlidersHorizontal,
  Code2,
  Globe,
  FileText,
  Gamepad2,
  Send,
  Sparkles,
  ChevronRight,
  Monitor,
  Bell,
  Search,
  PanelLeftClose,
  PanelLeft,
  Share2,
  Settings,
  Flame,
  CheckCircle2,
  Key,
  Trash2,
  Edit2,
  Check,
  X,
  Cpu,
} from 'lucide-react';
import { ViewMode, Task } from '@/types/agent';
import { ManusLogo } from '@/components/ManusLogo';

interface SidebarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  tasks: Task[];
  activeTaskId: string;
  onSelectTask: (taskId: string) => void;
  onNewTask: () => void;
  onDeleteTask?: (taskId: string) => void;
  onRenameTask?: (taskId: string, newTitle: string) => void;
  onOpenModelManager: () => void;
  onOpenShareModal: () => void;
  onOpenRemoteModal: () => void;
  onOpenE2BModal?: () => void;
  hasE2BKey?: boolean;
}

export function Sidebar({
  currentView,
  onSelectView,
  tasks,
  activeTaskId,
  onSelectTask,
  onNewTask,
  onDeleteTask,
  onRenameTask,
  onOpenModelManager,
  onOpenShareModal,
  onOpenRemoteModal,
  onOpenE2BModal,
  hasE2BKey = false,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [taskSearch, setTaskSearch] = useState('');
  const [filterActiveOnly, setFilterActiveOnly] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(taskSearch.toLowerCase());
    const matchesFilter = filterActiveOnly ? t.status === 'running' : true;
    return matchesSearch && matchesFilter;
  });

  const getTaskIcon = (task: Task) => {
    if (task.status === 'running') {
      return (
        <div className="relative w-4 h-4 flex items-center justify-center">
          <div className="w-3.5 h-3.5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }
    switch (task.iconType) {
      case 'code':
        return <Code2 className="w-4 h-4 text-stone-500" />;
      case 'game':
        return <Gamepad2 className="w-4 h-4 text-stone-500" />;
      case 'drone':
        return <Gamepad2 className="w-4 h-4 text-stone-500" />;
      case 'doc':
        return <FileText className="w-4 h-4 text-stone-500" />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      default:
        return <FileText className="w-4 h-4 text-stone-500" />;
    }
  };

  const handleStartRename = (task: Task, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  };

  const handleSaveRename = (taskId: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (editingTitle.trim() && onRenameTask) {
      onRenameTask(taskId, editingTitle.trim());
    }
    setEditingTaskId(null);
  };

  const handleDelete = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza de que deseja excluir esta conversa?')) {
      if (onDeleteTask) onDeleteTask(taskId);
    }
  };

  if (isCollapsed) {
    return (
      <aside className="w-16 bg-[#f7f7f8] border-r border-[#e5e7eb] flex flex-col items-center py-4 justify-between select-none h-screen flex-shrink-0 transition-all duration-200">
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-2">
            <ManusLogo size={42} />
            <button
              onClick={() => setIsCollapsed(false)}
              title="Expandir barra lateral"
              className="p-1.5 hover:bg-stone-200/70 rounded-xl transition text-stone-600"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={onNewTask}
              title="Nova tarefa"
              className="p-2.5 bg-stone-900 text-white rounded-xl hover:bg-stone-800 shadow-sm transition"
            >
              <SquarePen className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectView('agent')}
              title="Agente"
              className={`p-2.5 rounded-xl transition ${
                currentView === 'agent' ? 'bg-stone-200 text-stone-900 font-bold' : 'text-stone-600 hover:bg-stone-200/60'
              }`}
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectView('plugins')}
              title="Plugins"
              className={`p-2.5 rounded-xl transition ${
                currentView === 'plugins' ? 'bg-stone-200 text-stone-900 font-bold' : 'text-stone-600 hover:bg-stone-200/60'
              }`}
            >
              <Layers className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectView('scheduled')}
              title="Agendado"
              className={`p-2.5 rounded-xl transition ${
                currentView === 'scheduled' ? 'bg-stone-200 text-stone-900 font-bold' : 'text-stone-600 hover:bg-stone-200/60'
              }`}
            >
              <Clock className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectView('library')}
              title="Biblioteca"
              className={`p-2.5 rounded-xl transition ${
                currentView === 'library' ? 'bg-stone-200 text-stone-900 font-bold' : 'text-stone-600 hover:bg-stone-200/60'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2.5">
          {onOpenE2BModal && (
            <button
              onClick={onOpenE2BModal}
              title={hasE2BKey ? 'E2B Sandbox Ativo' : 'Configurar Chave E2B'}
              className={`p-2 rounded-xl transition ${
                hasE2BKey ? 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200' : 'text-amber-700 bg-amber-100 hover:bg-amber-200'
              }`}
            >
              <Key className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onOpenModelManager}
            title="Configurar Modelos"
            className="p-2 text-stone-600 hover:bg-stone-200/70 rounded-xl transition"
          >
            <Settings className="w-4 h-4" />
          </button>
          <div className="w-9 h-9 rounded-xl bg-stone-900 flex items-center justify-center p-1 shadow-xs overflow-hidden">
            <ManusLogo size={26} />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-[#f8f8f9] border-r border-[#e8eaed] flex flex-col justify-between select-none h-screen flex-shrink-0 text-[#1f2937] font-sans">
      {/* Top Header */}
      <div className="p-3 border-b border-transparent flex flex-col gap-1">
        <div className="flex items-center justify-between px-1 py-1">
          <ManusLogo size={38} showText={true} />

          <div className="flex items-center gap-0.5">
            <button
              onClick={() => {
                const query = prompt('Buscar conversas no OpenManus:');
                if (query !== null) setTaskSearch(query);
              }}
              title="Buscar"
              className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 rounded-lg transition"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsCollapsed(true)}
              title="Recolher barra lateral"
              className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 rounded-lg transition"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Primary Views Navigation */}
        <nav className="flex flex-col gap-0.5 mt-2">
          <button
            onClick={onNewTask}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 shadow-2xs transition text-left"
          >
            <SquarePen className="w-4 h-4 text-amber-400" />
            <span>Nova tarefa</span>
          </button>

          <button
            onClick={() => onSelectView('agent')}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition text-left ${
              currentView === 'agent'
                ? 'bg-stone-200/90 text-stone-900 font-semibold shadow-2xs'
                : 'text-stone-700 hover:bg-stone-200/60'
            }`}
          >
            <Terminal className="w-4 h-4 text-stone-600" />
            <span>Agente</span>
          </button>

          <button
            onClick={() => onSelectView('plugins')}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition text-left ${
              currentView === 'plugins'
                ? 'bg-stone-200/90 text-stone-900 font-semibold shadow-2xs'
                : 'text-stone-700 hover:bg-stone-200/60'
            }`}
          >
            <Layers className="w-4 h-4 text-stone-600" />
            <span>Plugins</span>
          </button>

          <button
            onClick={() => onSelectView('scheduled')}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition text-left ${
              currentView === 'scheduled'
                ? 'bg-stone-200/90 text-stone-900 font-semibold shadow-2xs'
                : 'text-stone-700 hover:bg-stone-200/60'
            }`}
          >
            <Clock className="w-4 h-4 text-stone-600" />
            <span>Agendado</span>
          </button>

          <button
            onClick={() => onSelectView('library')}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition text-left ${
              currentView === 'library'
                ? 'bg-stone-200/90 text-stone-900 font-semibold shadow-2xs'
                : 'text-stone-700 hover:bg-stone-200/60'
            }`}
          >
            <FolderKanban className="w-4 h-4 text-stone-600" />
            <span>Biblioteca</span>
          </button>
        </nav>
      </div>

      {/* Middle Section: User Conversations List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-3">
        {/* User E2B Key Quick Banner */}
        {onOpenE2BModal && (
          <button
            onClick={onOpenE2BModal}
            className={`w-full flex items-center justify-between p-2 rounded-xl border text-left transition ${
              hasE2BKey
                ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-900 hover:bg-emerald-100/70'
                : 'bg-amber-50/80 border-amber-200/80 text-amber-900 hover:bg-amber-100/80'
            }`}
          >
            <div className="flex items-center gap-2">
              <Key className={`w-3.5 h-3.5 ${hasE2BKey ? 'text-emerald-600' : 'text-amber-600'}`} />
              <div className="text-[11px] font-semibold truncate">
                {hasE2BKey ? 'E2B Conectado' : 'Configurar Chave E2B'}
              </div>
            </div>
            <span
              className={`w-2 h-2 rounded-full ${
                hasE2BKey ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
              }`}
            />
          </button>
        )}

        {/* User Conversations List */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between px-2 py-1 text-xs font-semibold text-stone-500">
            <span>Conversas ({tasks.length})</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFilterActiveOnly(!filterActiveOnly)}
                title={filterActiveOnly ? 'Mostrar todas' : 'Filtrar em execução'}
                className={`p-1 rounded transition ${
                  filterActiveOnly ? 'text-amber-600 bg-amber-100' : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            {filteredTasks.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs text-stone-400">
                Nenhuma conversa encontrada.
              </div>
            ) : (
              filteredTasks.map(task => {
                const isActive = task.id === activeTaskId && currentView === 'agent';
                const isEditing = editingTaskId === task.id;

                if (isEditing) {
                  return (
                    <form
                      key={task.id}
                      onSubmit={e => handleSaveRename(task.id, e)}
                      className="p-1.5 bg-white border border-stone-300 rounded-xl shadow-xs flex items-center gap-1.5"
                    >
                      <input
                        type="text"
                        autoFocus
                        value={editingTitle}
                        onChange={e => setEditingTitle(e.target.value)}
                        className="flex-1 px-1.5 py-0.5 text-xs text-stone-900 bg-transparent focus:outline-hidden"
                      />
                      <button
                        type="submit"
                        className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                        title="Salvar"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingTaskId(null)}
                        className="p-1 text-stone-400 hover:bg-stone-100 rounded"
                        title="Cancelar"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  );
                }

                return (
                  <div
                    key={task.id}
                    onClick={() => {
                      onSelectTask(task.id);
                      onSelectView('agent');
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition text-left group cursor-pointer ${
                      isActive
                        ? 'bg-stone-200/90 text-stone-900 font-semibold shadow-2xs'
                        : 'text-stone-700 hover:bg-stone-200/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="flex-shrink-0">{getTaskIcon(task)}</div>
                      <span className="truncate flex-1 text-xs">{task.title}</span>
                    </div>

                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={e => handleStartRename(task, e)}
                        title="Renomear"
                        className="p-1 text-stone-400 hover:text-stone-800 hover:bg-stone-300/60 rounded"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      {tasks.length > 1 && (
                        <button
                          type="button"
                          onClick={e => handleDelete(task.id, e)}
                          title="Excluir conversa"
                          className="p-1 text-stone-400 hover:text-rose-600 hover:bg-rose-100 rounded"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer Area */}
      <div className="p-3 border-t border-[#e8eaed] flex flex-col gap-2 bg-[#f8f8f9]">
        {/* User Profile & Actions Bar */}
        <div className="flex items-center justify-between py-1">
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={onOpenE2BModal || onOpenModelManager}
            title="Configurações de Usuário e Chave E2B"
          >
            <div className="w-9 h-9 rounded-xl bg-stone-900 flex items-center justify-center p-1 shadow-xs overflow-hidden">
              <ManusLogo size={26} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-stone-900">Meu Workspace</span>
              <span className="text-[10px] text-stone-500 flex items-center gap-1">
                <span
                  className={`w-1.5 h-1.5 rounded-full inline-block ${
                    hasE2BKey ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
                {hasE2BKey ? 'E2B Ativo' : 'E2B Local'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onOpenRemoteModal}
              title="Espelhamento e Controle Remoto"
              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200/70 rounded-lg transition"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenModelManager}
              title="Gerenciador de Modelos"
              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200/70 rounded-lg transition"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
