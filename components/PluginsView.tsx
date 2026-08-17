'use client';

import React, { useState } from 'react';
import {
  Search,
  Plus,
  Check,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Globe,
  Mail,
  Instagram,
  FolderKanban,
  Megaphone,
  Calendar,
  FileText,
  Users,
  GitBranch,
  SearchCode,
  Video,
  BarChart2,
  TrendingUp,
  KeyRound,
  PieChart,
  Globe2,
  Twitter,
  ShieldAlert,
  Target,
  Coins,
  Activity,
  DollarSign,
  Gamepad2,
  Sliders,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { PluginItem } from '@/types/agent';

interface PluginsViewProps {
  plugins: PluginItem[];
  onTogglePlugin: (pluginId: string) => void;
  onNewPlugin: () => void;
}

export function PluginsView({ plugins, onTogglePlugin, onNewPlugin }: PluginsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'connector' | 'skill' | 'datasource'>('all');
  const [selectedPlugin, setSelectedPlugin] = useState<PluginItem | null>(null);

  const getIcon = (iconName: string) => {
    const iconProps = { className: 'w-5 h-5' };
    switch (iconName) {
      case 'Globe':
        return <Globe {...iconProps} className="w-5 h-5 text-sky-600" />;
      case 'Mail':
        return <Mail {...iconProps} className="w-5 h-5 text-red-500" />;
      case 'Camera':
        return <Instagram {...iconProps} className="w-5 h-5 text-pink-600" />;
      case 'FolderKanban':
        return <FolderKanban {...iconProps} className="w-5 h-5 text-amber-600" />;
      case 'Megaphone':
        return <Megaphone {...iconProps} className="w-5 h-5 text-blue-600" />;
      case 'Calendar':
        return <Calendar {...iconProps} className="w-5 h-5 text-blue-500" />;
      case 'FileText':
        return <FileText {...iconProps} className="w-5 h-5 text-stone-700" />;
      case 'Users':
        return <Users {...iconProps} className="w-5 h-5 text-purple-600" />;
      case 'GitBranch':
        return <GitBranch {...iconProps} className="w-5 h-5 text-stone-900" />;
      case 'SearchCode':
        return <SearchCode {...iconProps} className="w-5 h-5 text-indigo-600" />;
      case 'Video':
        return <Video {...iconProps} className="w-5 h-5 text-rose-500" />;
      case 'Sparkles':
        return <Sparkles {...iconProps} className="w-5 h-5 text-amber-500" />;
      case 'BarChart2':
        return <BarChart2 {...iconProps} className="w-5 h-5 text-emerald-600" />;
      case 'Search':
        return <Search {...iconProps} className="w-5 h-5 text-blue-600" />;
      case 'KeyRound':
        return <KeyRound {...iconProps} className="w-5 h-5 text-yellow-600" />;
      case 'TrendingUp':
        return <TrendingUp {...iconProps} className="w-5 h-5 text-emerald-500" />;
      case 'PieChart':
        return <PieChart {...iconProps} className="w-5 h-5 text-orange-500" />;
      case 'Globe2':
        return <Globe2 {...iconProps} className="w-5 h-5 text-sky-700" />;
      case 'Twitter':
        return <Twitter {...iconProps} className="w-5 h-5 text-stone-900" />;
      case 'ShieldAlert':
        return <ShieldAlert {...iconProps} className="w-5 h-5 text-emerald-700" />;
      case 'Target':
        return <Target {...iconProps} className="w-5 h-5 text-orange-600" />;
      case 'Coins':
        return <Coins {...iconProps} className="w-5 h-5 text-amber-500" />;
      case 'Activity':
        return <Activity {...iconProps} className="w-5 h-5 text-teal-600" />;
      case 'DollarSign':
        return <DollarSign {...iconProps} className="w-5 h-5 text-red-600" />;
      default:
        return <Zap {...iconProps} className="w-5 h-5 text-stone-600" />;
    }
  };

  const filteredPlugins = plugins.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const connectors = filteredPlugins.filter(p => p.category === 'connector');
  const skills = filteredPlugins.filter(p => p.category === 'skill');
  const datasources = filteredPlugins.filter(p => p.category === 'datasource');

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-[#fafafa] p-6 md:p-10 font-sans text-stone-900">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-stone-900">Plugins</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Painel de gerenciamento de permissões e conexões.')}
              className="px-4 py-2 bg-white border border-stone-200 hover:bg-stone-50 rounded-xl text-xs font-semibold text-stone-700 shadow-2xs transition flex items-center gap-1.5"
            >
              <span>Gerenciar</span>
              <span className="text-[10px] text-stone-400">▼</span>
            </button>
            <button
              onClick={onNewPlugin}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold shadow-2xs transition flex items-center gap-1.5"
            >
              <span>Criar</span>
              <span className="text-[10px] text-stone-300">▼</span>
            </button>
          </div>
        </div>

        {/* Top Feature Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-sm transition flex flex-col justify-between gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <p className="text-xs text-stone-700 font-medium leading-relaxed">
              Crie jogos de quebra-cabeça, estratégia, aventura e qualquer outro jogo que você imaginar.
            </p>
          </div>

          <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-sm transition flex flex-col justify-between gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <p className="text-xs text-stone-700 font-medium leading-relaxed">
              Execute tarefas complexas com segurança através do seu navegador em ambiente isolado.
            </p>
          </div>

          <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-sm transition flex flex-col justify-between gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <p className="text-xs text-stone-700 font-medium leading-relaxed">
              Obtenha um assistente pessoal para o Gmail e automatize respostas inteligentes.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Pesquisar conectores, habilidades, fontes de dados"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-stone-100/80 hover:bg-stone-100 focus:bg-white border border-transparent focus:border-stone-300 rounded-xl text-sm text-stone-900 placeholder-stone-400 transition outline-none"
          />
        </div>

        {/* Section 1: Conectores */}
        {(activeCategory === 'all' || activeCategory === 'connector') && connectors.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-stone-900">Conectores</h2>
                <p className="text-xs text-stone-500">Conecte aplicativos e APIs para compartilhar seu contexto.</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1 text-stone-400 hover:text-stone-700 rounded transition">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1 text-stone-400 hover:text-stone-700 rounded transition">
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveCategory(activeCategory === 'connector' ? 'all' : 'connector')}
                  className="text-xs font-semibold text-stone-600 hover:text-stone-900 ml-2"
                >
                  Ver tudo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {connectors.map(item => (
                <div
                  key={item.id}
                  className="bg-white border border-stone-200/90 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-2xs hover:shadow-sm transition"
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center flex-shrink-0">
                      {getIcon(item.iconName)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-stone-900 truncate">{item.name}</h3>
                      <p className="text-xs text-stone-500 truncate">{item.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onTogglePlugin(item.id)}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition ${
                      item.isConnected
                        ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        : 'border border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                    title={item.isConnected ? 'Conectado (Clique para desconectar)' : 'Conectar'}
                  >
                    {item.isConnected ? <Check className="w-4 h-4 text-emerald-600" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Habilidades */}
        {(activeCategory === 'all' || activeCategory === 'skill') && skills.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-stone-900">Habilidades</h2>
                <p className="text-xs text-stone-500">Transforme seu conhecimento em fluxos reutilizáveis.</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1 text-stone-400 hover:text-stone-700 rounded transition">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1 text-stone-400 hover:text-stone-700 rounded transition">
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveCategory(activeCategory === 'skill' ? 'all' : 'skill')}
                  className="text-xs font-semibold text-stone-600 hover:text-stone-900 ml-2"
                >
                  Ver tudo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {skills.map(item => (
                <div
                  key={item.id}
                  className="bg-white border border-stone-200/90 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-2xs hover:shadow-sm transition"
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center flex-shrink-0">
                      {getIcon(item.iconName)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-semibold text-stone-900 truncate">{item.name}</h3>
                        {item.verified && (
                          <span title="Verificado">
                            <ShieldCheck className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 truncate">{item.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onTogglePlugin(item.id)}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition ${
                      item.isConnected
                        ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        : 'border border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                    title={item.isConnected ? 'Habilitado' : 'Habilitar Habilidade'}
                  >
                    {item.isConnected ? <Check className="w-4 h-4 text-emerald-600" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Fontes de dados */}
        {(activeCategory === 'all' || activeCategory === 'datasource') && datasources.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-stone-900">Fontes de dados</h2>
                <p className="text-xs text-stone-500">
                  Obtenha insights mais profundos e respostas mais completas de fontes de dados integradas.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1 text-stone-400 hover:text-stone-700 rounded transition">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1 text-stone-400 hover:text-stone-700 rounded transition">
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveCategory(activeCategory === 'datasource' ? 'all' : 'datasource')}
                  className="text-xs font-semibold text-stone-600 hover:text-stone-900 ml-2"
                >
                  Ver tudo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {datasources.map(item => (
                <div
                  key={item.id}
                  className="bg-white border border-stone-200/90 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-2xs hover:shadow-sm transition"
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center flex-shrink-0">
                      {getIcon(item.iconName)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-stone-900 truncate">{item.name}</h3>
                      <p className="text-xs text-stone-500 truncate">{item.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onTogglePlugin(item.id)}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition ${
                      item.isConnected
                        ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        : 'border border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                    title={item.isConnected ? 'Fonte Ativa' : 'Ativar Fonte'}
                  >
                    {item.isConnected ? <Check className="w-4 h-4 text-emerald-600" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
