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
  size = 36,
  className = '',
  showText = false,
  textClassName = 'text-stone-900',
}: ManusLogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
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
        <div className="flex items-center">
          <span
            className={`font-bold tracking-tight text-xl font-serif ${textClassName}`}
          >
            Open<span className="text-amber-500">Manus</span>
          </span>
        </div>
      )}
    </div>
  );
}

