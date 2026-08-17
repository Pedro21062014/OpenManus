'use client';

import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const getSnapshot = () => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const getServerSnapshot = () => null;

  const rawValue = useSyncExternalStore(
    (callback) => {
      window.addEventListener('storage', callback);
      window.addEventListener(`local-storage-${key}`, callback);
      return () => {
        window.removeEventListener('storage', callback);
        window.removeEventListener(`local-storage-${key}`, callback);
      };
    },
    getSnapshot,
    getServerSnapshot
  );

  let value: T = initialValue;
  if (rawValue !== null) {
    try {
      value = JSON.parse(rawValue);
    } catch {
      value = initialValue;
    }
  }

  const setValue = (valOrFn: T | ((prev: T) => T)) => {
    try {
      let currentVal = initialValue;
      const existing = localStorage.getItem(key);
      if (existing !== null) {
        try {
          currentVal = JSON.parse(existing);
        } catch {
          currentVal = initialValue;
        }
      }

      const newValue = typeof valOrFn === 'function' ? (valOrFn as (prev: T) => T)(currentVal) : valOrFn;
      localStorage.setItem(key, JSON.stringify(newValue));
      window.dispatchEvent(new Event(`local-storage-${key}`));
    } catch (e) {
      console.error(`Failed to write ${key} to localStorage`, e);
    }
  };

  return [value, setValue];
}
