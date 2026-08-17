'use client';

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Code2,
  FileText,
  Gamepad2,
  Globe,
  Plus,
  Check,
  Layers,
} from 'lucide-react';
import { Artifact } from '@/types/agent';
import { ManusLogo } from '@/components/ManusLogo';

interface CreateArtifactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateArtifact: (artifact: Artifact) => void;
}

export function CreateArtifactModal({
  isOpen,
  onClose,
  onCreateArtifact,
}: CreateArtifactModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<Artifact['type']>('site');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('Frontend, UI, Autônomo');
  const [content, setContent] = useState(
    `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Artefato Personalizado</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-white min-h-screen flex items-center justify-center p-6">
  <div class="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-6 text-center shadow-xl">
    <div class="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">
      ⚡
    </div>
    <h1 class="text-xl font-bold mb-2">Artefato Criado pelo Usuário</h1>
    <p class="text-slate-400 text-sm mb-6">Este aplicativo está armazenado na sua biblioteca local com execução em tempo real.</p>
    <button onclick="alert('Interação funcionando!')" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold rounded-xl text-sm transition">
      Clique para Testar
    </button>
  </div>
</body>
</html>`
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Por favor, digite um título para o artefato.');
      return;
    }

    const tagList = tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const newArtifact: Artifact = {
      id: `art-user-${Date.now()}`,
      title: title.trim(),
      type,
      description: description.trim() || 'Artefato customizado criado pelo usuário.',
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
      starred: true,
      tags: tagList.length > 0 ? tagList : ['Personalizado', 'Manus'],
      content: content.trim(),
      files: [
        {
          name: type === 'doc' ? 'documento.md' : 'index.html',
          path: type === 'doc' ? '/workspace/documento.md' : '/workspace/index.html',
          language: type === 'doc' ? 'markdown' : 'html',
          content: content.trim(),
        },
      ],
    };

    onCreateArtifact(newArtifact);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-3">
            <ManusLogo size={30} />
            <div>
              <h2 className="text-sm font-bold text-stone-900">Novo Artefato na Biblioteca</h2>
              <p className="text-xs text-stone-500">Crie ou importe um aplicativo, documento ou código</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">Título do Artefato</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Ex: Dashboard de Vendas, Jogo 2D, Relatório"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">Tipo de Artefato</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as Artifact['type'])}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 transition"
              >
                <option value="site">Site / Aplicação Web (HTML5/Tailwind/JS)</option>
                <option value="game">Jogo Interativo (Canvas/WebGL)</option>
                <option value="simulation">Simulador / Telemetria</option>
                <option value="doc">Documento / Markdown</option>
                <option value="sheet">Planilha / Dados</option>
                <option value="code">Script / Código Fonte</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">Descrição</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Breve descrição da finalidade deste artefato"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">Tags (separadas por vírgula)</label>
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="Design, React, Python, E2B"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 transition"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-stone-800">
                Código / Conteúdo Interativo
              </label>
              <span className="text-[10px] text-stone-400 font-mono">HTML5 / Markdown / JS</span>
            </div>
            <textarea
              rows={8}
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full p-3 bg-stone-900 text-stone-100 border border-stone-800 rounded-xl text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-stone-700 transition"
              placeholder="Cole seu código HTML completo aqui..."
            />
          </div>

          {/* Footer actions */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-800 hover:bg-stone-200/60 rounded-xl transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl shadow-sm transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Salvar na Biblioteca</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
