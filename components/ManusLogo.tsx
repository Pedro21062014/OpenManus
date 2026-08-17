'use client';

import React from 'react';
import Image from 'next/image';

interface ManusLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textClassName?: string;
  variant?: 'dark' | 'light' | 'amber';
}

export function ManusLogo({
  size = 28,
  className = '',
  showText = false,
  textClassName = 'text-stone-900',
}: ManusLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div
        className="relative flex-shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-105"
        style={{ width: size, height: size }}
      >
        <Image
          src="/openmanus_logo_cutout.png"
          alt="OpenManus Logo"
          width={size}
          height={size}
          className="w-full h-full object-contain drop-shadow-xs"
          referrerPolicy="no-referrer"
          priority
        />
      </div>

      {showText && (
        <div className="flex items-center gap-1.5">
          <span
            className={`font-bold tracking-tight text-lg font-serif ${textClassName}`}
          >
            Open<span className="text-amber-500">Manus</span>
          </span>
          <span className="text-[9px] font-mono px-1.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300/80 rounded-md font-bold uppercase tracking-wider">
            Open Source
          </span>
        </div>
      )}
    </div>
  );
}

