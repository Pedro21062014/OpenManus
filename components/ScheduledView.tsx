'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Plus,
  ArrowRight,
  Sparkles,
  Mail,
  Repeat,
  CheckCircle2,
  Play,
  Trash2,
  Sliders,
  Bell,
  Check,
  Zap,
} from 'lucide-react';
import { ScheduledTask } from '@/types/agent';

interface ScheduledViewProps {
  scheduledTasks: ScheduledTask[];
  onToggleSchedule: (id: string) => void;
  onDeleteSchedule: (id: string) => void;
  onCreateSchedule: (newTask: Partial<ScheduledTask>) => void;
  onRunScheduledNow: (task: ScheduledTask) => void;
}

export function ScheduledView({
  scheduledTasks,
  onToggleSchedule,
  onDeleteSchedule,
  onCreateSchedule,
  onRunScheduledNow,
}: ScheduledViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [scheduleType, setScheduleType] = useState<'daily' | 'hourly' | 'weekly' | 'cron'>('daily');
  const [time, setTime] = useState('08:00');
  const [autoRunSandbox, setAutoRunSandbox] = useState(true);

  const handleOpenPreset = (presetTitle: string, presetPrompt: string) => {
    setTitle(presetTitle);
    setPrompt(presetPrompt);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !prompt) {
      alert('Por favor, preencha o título e a instrução.');
      return;
    }
    onCreateSchedule({
      title,
      prompt,
      scheduleType,
      time,
      autoRunSandbox,
      isActive: true,
      nextRun: scheduleType === 'hourly' ? 'Em 1 hora' : `Amanhã às ${time}`,
      targetModel: 'manus-1.6-pro',
      tags: ['Automação', 'E2B Sandbox'],
    });
    setTitle('');
    setPrompt('');
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-[#fafafa] p-6 md:p-12 font-sans text-stone-900 flex flex-col justify-between">
      <div className="max-w-3xl mx-auto w-full space-y-10 my-auto py-8">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-stone-900">Agendado</h1>
        </div>

        {/* Central Graphic */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 bg-white border border-stone-200/90 rounded-2xl shadow-sm flex flex-col items-center justify-center p-3">
              <div className="grid grid-cols-5 gap-1.5 w-full h-full">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-sm ${
                      i === 7 ? 'bg-stone-900' : 'bg-stone-200/80'
                    } w-full h-full`}
                  />
                ))}
              </div>
            </div>
            <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs shadow-sm">
              <Plus className="w-3.5 h-3.5" />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight max-w-xl leading-snug">
            Manus trabalha de forma independente, sem que você precise solicitar
          </h2>
        </div>

        {/* 3 Interactive Feature Action Cards */}
        <div className="space-y-3">
          <button
            onClick={() =>
              handleOpenPreset(
                'Monitoramento automatizado de concorrentes',
                'Pesquise nos motores de busca e notícias por atualizações dos concorrentes, capture novidades de produtos e envie um resumo executivo.'
              )
            }
            className="w-full bg-white border border-stone-200/90 hover:border-stone-300 rounded-2xl p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-sm transition group"
          >
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                A
              </div>
              <span className="text-xs md:text-sm font-medium text-stone-800">
                Configure o monitoramento automatizado para qualquer tópico, concorrente ou palavra-chave.
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
          </button>

          <button
            onClick={() =>
              handleOpenPreset(
                'Resumo Diário da Caixa de Entrada & Agenda',
                'Analise os compromissos do dia no Google Agenda, resuma os 5 e-mails mais importantes do Gmail e monte uma lista de tarefas.'
              )
            }
            className="w-full bg-white border border-stone-200/90 hover:border-stone-300 rounded-2xl p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-sm transition group"
          >
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-stone-600" />
              </div>
              <span className="text-xs md:text-sm font-medium text-stone-800">
                Receba um resumo diário do que está na sua caixa de entrada e na sua agenda antes de começar o dia.
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
          </button>

          <button
            onClick={() =>
              handleOpenPreset(
                'Automação de Relatórios em Sandbox E2B',
                'Execute o script em Python no sandbox E2B para compilar os dados analíticos semanais, gerar gráficos e salvar o PDF.'
              )
            }
            className="w-full bg-white border border-stone-200/90 hover:border-stone-300 rounded-2xl p-4 md:p-5 flex items-center justify-between text-left shadow-2xs hover:shadow-sm transition group"
          >
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center flex-shrink-0">
                <Repeat className="w-4 h-4 text-stone-600" />
              </div>
              <span className="text-xs md:text-sm font-medium text-stone-800">
                Transforme processos manuais em fluxos automatizados agendados.
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
          </button>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs md:text-sm font-semibold shadow-sm transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Crie sua tarefa agendada</span>
          </button>
        </div>

        {/* Active Scheduled Tasks List */}
        {scheduledTasks.length > 0 && (
          <div className="pt-6 border-t border-stone-200/80 space-y-3">
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Tarefas Agendadas Ativas ({scheduledTasks.length})
            </h3>
            <div className="space-y-2.5">
              {scheduledTasks.map(task => (
                <div
                  key={task.id}
                  className="bg-white border border-stone-200/90 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-900">{task.title}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          task.isActive
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {task.isActive ? 'Ativo' : 'Pausado'}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 line-clamp-1">{task.prompt}</p>
                    <div className="flex items-center gap-3 text-[11px] text-stone-400 pt-1">
                      <span>Frequência: {task.scheduleType} ({task.time || '08:00'})</span>
                      <span>•</span>
                      <span>Próxima execução: {task.nextRun}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end md:self-auto">
                    <button
                      onClick={() => onRunScheduledNow(task)}
                      title="Executar agora no agente"
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium flex items-center gap-1.5 transition"
                    >
                      <Play className="w-3 h-3 text-emerald-600" />
                      <span>Rodar Agora</span>
                    </button>
                    <button
                      onClick={() => onToggleSchedule(task.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        task.isActive
                          ? 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {task.isActive ? 'Pausar' : 'Ativar'}
                    </button>
                    <button
                      onClick={() => onDeleteSchedule(task.id)}
                      className="p-2 text-stone-400 hover:text-red-600 rounded-lg transition"
                      title="Remover"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal to Create Scheduled Task */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-stone-900 text-white flex items-center justify-center">
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="text-base font-bold text-stone-900">Criar Tarefa Agendada</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Título da Automação
                </label>
                <input
                  type="text"
                  placeholder="Ex: Auditoria Diária de Concorrentes"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 outline-none focus:border-stone-400 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Instrução / Prompt do Agente Manus
                </label>
                <textarea
                  rows={3}
                  placeholder="O que o Manus deve executar autonomamente no horário programado?"
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 outline-none focus:border-stone-400 transition resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Frequência
                  </label>
                  <select
                    value={scheduleType}
                    onChange={e => setScheduleType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 outline-none focus:border-stone-400 transition"
                  >
                    <option value="daily">Diário</option>
                    <option value="hourly">A cada hora</option>
                    <option value="weekly">Semanal</option>
                    <option value="cron">Personalizado (Cron)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Horário (UTC-3)
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 outline-none focus:border-stone-400 transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="text-xs">
                  <div className="font-semibold text-stone-800">Executar no Sandbox E2B</div>
                  <div className="text-stone-500 text-[11px]">Permite comandos Bash, Python e testes reais</div>
                </div>
                <input
                  type="checkbox"
                  checked={autoRunSandbox}
                  onChange={e => setAutoRunSandbox(e.target.checked)}
                  className="w-4 h-4 rounded text-stone-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold shadow-sm transition"
                >
                  Salvar e Agendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
