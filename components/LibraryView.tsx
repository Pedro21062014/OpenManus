'use client';

import React, { useState } from 'react';
import {
  Search,
  Star,
  LayoutGrid,
  List,
  MoreHorizontal,
  ExternalLink,
  Code,
  Download,
  Trash2,
  Globe,
  Sparkles,
  Play,
  FileCode,
  Eye,
  Plus,
  Layers,
  FileText,
  Gamepad2,
  FolderOpen,
} from 'lucide-react';
import { Artifact } from '@/types/agent';
import { ManusLogo } from '@/components/ManusLogo';

interface LibraryViewProps {
  artifacts: Artifact[];
  onOpenArtifact: (artifact: Artifact) => void;
  onDeleteArtifact: (id: string) => void;
  onToggleStar: (id: string) => void;
  onOpenCreateArtifact?: () => void;
  onGoToAgent?: () => void;
}

export function LibraryView({
  artifacts,
  onOpenArtifact,
  onDeleteArtifact,
  onToggleStar,
  onOpenCreateArtifact,
  onGoToAgent,
}: LibraryViewProps) {
  const [activeTab, setActiveTab] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [starredOnly, setStarredOnly] = useState(false);
  const [actionMenuOpenId, setActionMenuOpenId] = useState<string | null>(null);

  const tabs = [
    { label: 'Todos', type: 'all' },
    { label: 'Sites & Apps', type: 'site' },
    { label: 'Jogos', type: 'game' },
    { label: 'Simulações', type: 'simulation' },
    { label: 'Documentos', type: 'doc' },
    { label: 'Planilhas', type: 'sheet' },
    { label: 'Código', type: 'code' },
  ];

  const filteredArtifacts = artifacts.filter(art => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art.tags && art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesStarred = starredOnly ? !!art.starred : true;

    if (!matchesSearch || !matchesStarred) return false;

    if (activeTab === 'Todos') return true;
    if (activeTab === 'Sites & Apps' && (art.type === 'site' || art.type === 'simulation'))
      return true;
    if (activeTab === 'Jogos' && art.type === 'game') return true;
    if (activeTab === 'Simulações' && art.type === 'simulation') return true;
    if (activeTab === 'Documentos' && art.type === 'doc') return true;
    if (activeTab === 'Planilhas' && art.type === 'sheet') return true;
    if (activeTab === 'Código' && (art.type === 'code' || art.type === 'other')) return true;

    return true;
  });

  const getPreviewThumbnail = (artifact: Artifact) => {
    if (artifact.type === 'game') {
      return (
        <div className="w-full h-44 bg-[#0f1c1e] rounded-xl overflow-hidden relative border border-stone-800 flex flex-col items-center justify-center p-4">
          <div className="text-center space-y-2">
            <span className="text-3xl">🎮</span>
            <div className="text-stone-200 font-bold text-sm">{artifact.title}</div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-800/80 rounded-full text-[11px] text-teal-300 font-semibold shadow-xs">
              <Play className="w-3 h-3 fill-teal-300" /> Executar Jogo
            </div>
          </div>
        </div>
      );
    }
    if (artifact.type === 'simulation') {
      return (
        <div className="w-full h-44 bg-[#0b0f19] rounded-xl overflow-hidden relative border border-stone-800 p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] text-sky-400 font-mono">
            <span>📡 TELEMETRIA HUD</span>
            <span className="text-emerald-400">STATUS: OK</span>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-sky-400/60 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-sky-400 rounded-full animate-ping" />
            </div>
          </div>
          <div className="text-[10px] text-stone-400 font-mono text-center truncate">
            {artifact.title}
          </div>
        </div>
      );
    }
    if (artifact.type === 'doc') {
      return (
        <div className="w-full h-44 bg-stone-50 rounded-xl overflow-hidden relative border border-stone-200 p-4 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-stone-700">
              <FileText className="w-4 h-4 text-stone-500" />
              <span className="text-xs font-bold text-stone-900">{artifact.title}</span>
            </div>
            <p className="text-[11px] text-stone-500 line-clamp-3 leading-relaxed">
              {artifact.content ? artifact.content.substring(0, 150) : artifact.description}
            </p>
          </div>
          <div className="text-[10px] font-mono text-stone-400">Documento Markdown</div>
        </div>
      );
    }

    // Default site preview
    return (
      <div className="w-full h-44 bg-stone-100/90 rounded-xl overflow-hidden relative border border-stone-200 p-4 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="inline-block px-2 py-0.5 bg-stone-900 text-stone-100 rounded text-[9px] font-bold uppercase tracking-wider">
            {artifact.type.toUpperCase()}
          </div>
          <div className="text-xs font-extrabold text-stone-900 truncate">{artifact.title}</div>
          <p className="text-[11px] text-stone-500 line-clamp-2">
            {artifact.description || 'Aplicação interativa pronta para execução.'}
          </p>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-stone-200/60">
          <span className="text-[10px] font-medium text-stone-400">{artifact.date}</span>
          <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-semibold">
            Interativo
          </span>
        </div>
      </div>
    );
  };

  const handleDownload = (artifact: Artifact) => {
    const element = document.createElement('a');
    const file = new Blob([artifact.content], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `${artifact.title.replace(/\s+/g, '_').toLowerCase()}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex-1 h-screen flex flex-col bg-white overflow-hidden font-sans">
      {/* Top Header */}
      <header className="px-6 py-4 border-b border-stone-200 flex flex-col gap-4 flex-shrink-0 bg-stone-50/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <ManusLogo size={32} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-stone-900">Biblioteca do Usuário</h1>
                <span className="px-2 py-0.5 rounded-full bg-stone-200/80 text-stone-700 text-xs font-bold font-mono">
                  {artifacts.length} {artifacts.length === 1 ? 'item' : 'itens'}
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Seus aplicativos, jogos, simulações e documentos gerados pelo OpenManus (Open Source)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenCreateArtifact && (
              <button
                onClick={onOpenCreateArtifact}
                className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Novo Artefato</span>
              </button>
            )}

            {/* View Mode Toggle */}
            <div className="flex items-center bg-stone-200/70 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'grid' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Visualização em Grade"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'list' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Visualização em Lista"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {tabs.map(tab => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  activeTab === tab.label
                    ? 'bg-stone-900 text-white shadow-2xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setStarredOnly(!starredOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                starredOnly
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${starredOnly ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>Favoritos</span>
            </button>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar artefatos..."
                className="pl-8 pr-3 py-1.5 bg-stone-100 border border-stone-200/80 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 transition w-44 md:w-56"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#fafafa]">
        {filteredArtifacts.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-400 mb-4 shadow-xs">
              <FolderOpen className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="text-base font-bold text-stone-800 mb-1">
              {searchQuery || starredOnly
                ? 'Nenhum artefato encontrado com esses filtros'
                : 'Sua Biblioteca está vazia'}
            </h3>
            <p className="text-xs text-stone-500 mb-6 leading-relaxed">
              Peça ao OpenManus para criar um aplicativo, jogo, documento ou relatório, ou adicione um artefato manualmente.
            </p>
            <div className="flex items-center gap-3">
              {onOpenCreateArtifact && (
                <button
                  onClick={onOpenCreateArtifact}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Adicionar Manualmente</span>
                </button>
              )}
              {onGoToAgent && (
                <button
                  onClick={onGoToAgent}
                  className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pedir ao OpenManus</span>
                </button>
              )}
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredArtifacts.map(artifact => (
              <div
                key={artifact.id}
                onClick={() => onOpenArtifact(artifact)}
                className="bg-white rounded-2xl border border-stone-200/90 hover:border-stone-400/80 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group cursor-pointer"
              >
                {/* Visual Preview Box */}
                <div className="p-2.5 pb-0">{getPreviewThumbnail(artifact)}</div>

                {/* Card Information */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xs font-bold text-stone-900 truncate group-hover:text-amber-800 transition">
                        {artifact.title}
                      </h3>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onToggleStar(artifact.id);
                        }}
                        className="text-stone-400 hover:text-amber-500 transition"
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            artifact.starred ? 'fill-amber-400 text-amber-500' : ''
                          }`}
                        />
                      </button>
                    </div>

                    <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                      {artifact.description}
                    </p>
                  </div>

                  {/* Footer metadata & actions */}
                  <div className="pt-3 mt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
                    <span>{artifact.date}</span>

                    <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => handleDownload(artifact)}
                        title="Baixar HTML"
                        className="p-1 hover:text-stone-800 hover:bg-stone-100 rounded transition"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Deseja excluir "${artifact.title}" da biblioteca?`)) {
                            onDeleteArtifact(artifact.id);
                          }
                        }}
                        title="Excluir"
                        className="p-1 hover:text-rose-600 hover:bg-rose-50 rounded transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List Mode */
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs divide-y divide-stone-100">
            {filteredArtifacts.map(artifact => (
              <div
                key={artifact.id}
                onClick={() => onOpenArtifact(artifact)}
                className="p-4 hover:bg-stone-50 transition flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center flex-shrink-0 text-stone-700">
                    {artifact.type === 'game' ? (
                      <Gamepad2 className="w-5 h-5 text-teal-600" />
                    ) : artifact.type === 'simulation' ? (
                      <Globe className="w-5 h-5 text-sky-600" />
                    ) : artifact.type === 'doc' ? (
                      <FileText className="w-5 h-5 text-amber-600" />
                    ) : (
                      <Code className="w-5 h-5 text-stone-700" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-stone-900 truncate">{artifact.title}</h4>
                      <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 font-semibold">
                        {artifact.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 truncate">{artifact.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0" onClick={e => e.stopPropagation()}>
                  <span className="text-xs text-stone-400 hidden sm:inline">{artifact.date}</span>
                  <button
                    onClick={() => onToggleStar(artifact.id)}
                    className="text-stone-400 hover:text-amber-500 transition"
                  >
                    <Star
                      className={`w-4 h-4 ${artifact.starred ? 'fill-amber-400 text-amber-500' : ''}`}
                    />
                  </button>
                  <button
                    onClick={() => handleDownload(artifact)}
                    className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition"
                    title="Baixar HTML"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Deseja excluir "${artifact.title}"?`)) {
                        onDeleteArtifact(artifact.id);
                      }
                    }}
                    className="p-1.5 text-stone-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
