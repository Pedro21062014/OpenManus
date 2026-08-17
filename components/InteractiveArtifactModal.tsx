'use client';

import React, { useState } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  RefreshCw,
  Code2,
  Globe,
  Download,
  Copy,
  Check,
  ExternalLink,
  Play,
  Terminal,
  Sparkles,
} from 'lucide-react';
import { Artifact } from '@/types/agent';
import { ManusLogo } from '@/components/ManusLogo';

interface InteractiveArtifactModalProps {
  artifact: Artifact | null;
  onClose: () => void;
  onRunInE2B?: (code: string) => void;
}

export function InteractiveArtifactModal({
  artifact,
  onClose,
  onRunInE2B,
}: InteractiveArtifactModalProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  if (!artifact) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(artifact.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([artifact.content], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `${artifact.title.replace(/\s+/g, '_').toLowerCase()}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-150 font-sans">
      <div className="bg-white rounded-2xl w-full max-w-5xl h-[88vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-3 min-w-0">
            <ManusLogo size={32} />
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-stone-900 truncate">{artifact.title}</h2>
              <div className="flex items-center gap-2 text-[11px] text-stone-500">
                <span className="capitalize">{artifact.type}</span>
                <span>•</span>
                <span>{artifact.date}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switch */}
            <div className="flex items-center bg-stone-200/70 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition ${
                  activeTab === 'preview'
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Interativo</span>
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition ${
                  activeTab === 'code'
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Código</span>
              </button>
            </div>

            {activeTab === 'preview' && (
              <button
                onClick={() => setIframeKey(k => k + 1)}
                title="Recarregar"
                className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleCopy}
              title="Copiar Código"
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={handleDownload}
              title="Baixar Arquivo"
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-stone-950 relative overflow-hidden">
          {activeTab === 'preview' ? (
            <iframe
              key={iframeKey}
              srcDoc={artifact.content}
              title={artifact.title}
              className="w-full h-full border-none bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          ) : (
            <div className="w-full h-full overflow-auto p-4 font-mono text-xs text-stone-200 bg-[#0d1117]">
              <pre className="whitespace-pre-wrap leading-relaxed">{artifact.content}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
