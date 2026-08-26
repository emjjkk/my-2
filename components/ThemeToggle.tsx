'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';

function subscribeTheme(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('eink_theme_change', callback);
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('eink_theme_change', callback);
    mediaQuery.removeEventListener('change', callback);
  };
}

function getThemeSnapshot(): 'light' | 'dark' {
  const saved = localStorage.getItem('eink_portfolio_theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getThemeServerSnapshot(): 'light' | 'dark' {
  return 'light';
}

function subscribeMounted() {
  return () => {};
}

export default function ThemeToggle() {
  const theme = React.useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);
  const mounted = React.useSyncExternalStore(subscribeMounted, () => true, () => false);

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('eink_portfolio_theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    window.dispatchEvent(new Event('eink_theme_change'));
  };

  if (!mounted) {
    return (
      <button className="opacity-60 flex items-center gap-1.5 cursor-pointer">
        <Moon className="w-3.5 h-3.5" />
        <span>Dark</span>
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      className="hover:opacity-100 hover:underline underline-offset-4 cursor-pointer transition-opacity flex items-center gap-1.5"
    >
      {isDark ? (
        <>
          <Sun className="w-3.5 h-3.5" />
          <span>Light</span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5" />
          <span>Dark</span>
        </>
      )}
    </button>
  );
}

