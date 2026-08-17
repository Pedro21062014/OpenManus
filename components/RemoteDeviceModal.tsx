'use client';

import React, { useState } from 'react';
import { X, Monitor, Smartphone, RefreshCw, Cast, Wifi, Shield, Cpu } from 'lucide-react';

interface RemoteDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RemoteDeviceModal({ isOpen, onClose }: RemoteDeviceModalProps) {
  const [deviceType, setDeviceType] = useState<'desktop' | 'mobile'>('desktop');
  const [status, setStatus] = useState<'connected' | 'connecting'>('connected');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in font-sans">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-stone-900 text-white flex items-center justify-center">
              <Cast className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Sessão Remota & Navegador de Nuvem</h3>
              <p className="text-xs text-stone-500">Espelhamento interativo de tela do agente autônomo</p>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport Display */}
        <div className="p-6 bg-stone-950 flex flex-col items-center justify-center min-h-[320px] relative">
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-stone-900/90 border border-stone-800 px-3 py-1 rounded-full text-[11px] text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Transmissão E2B WebRTC Ativa</span>
          </div>

          <div className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-xl p-4 shadow-xl text-stone-300 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2 text-[11px] text-stone-500">
              <span>manus-cloud-browser-v1.6</span>
              <span>1920x1080 @ 60fps</span>
            </div>
            <div className="py-6 text-center space-y-3">
              <Monitor className="w-12 h-12 text-sky-400 mx-auto animate-bounce" />
              <p className="text-stone-200 font-sans font-medium text-sm">
                Navegador e Terminal Sandbox Sincronizados
              </p>
              <p className="text-stone-400 font-sans text-xs max-w-sm mx-auto">
                O Manus opera neste ambiente virtual com isolamento de cookies, proxy e bypass de captchas.
              </p>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Conexão criptografada ponta-a-ponta</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
