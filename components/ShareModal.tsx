'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Share2, Globe, Flame, Sparkles, Twitter, Linkedin, MessageCircle } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskTitle?: string;
}

export function ShareModal({ isOpen, onClose, taskTitle }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://manus.im/share/task-8849';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in font-sans">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-stone-200 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Compartilhar OpenManus</h3>
              <p className="text-xs text-stone-500">Agente autônomo 100% de código aberto</p>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-stone-700">Link de Acesso Público</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3 py-2 bg-stone-100 border border-stone-200 rounded-xl text-xs text-stone-700 select-all outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <span className="text-xs text-stone-500">Compartilhar em:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Confira o OpenManus AI Agent (Open Source)!')}&url=${encodeURIComponent(shareUrl)}`, '_blank')}
              className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl transition"
              title="Twitter/X"
            >
              <Twitter className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent('Veja esse projeto do OpenManus Open Source: ' + shareUrl)}`, '_blank')}
              className="p-2 bg-stone-100 hover:bg-stone-200 text-emerald-700 rounded-xl transition"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
