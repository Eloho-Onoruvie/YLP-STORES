import React from 'react';
import type { ReaderSettings, ReaderTheme, ReaderWidth, ReaderFontSize } from '../../types';
import { Palette } from 'lucide-react';

interface ReaderControlsProps {
  settings: ReaderSettings;
  onUpdateSettings: (newSettings: Partial<ReaderSettings>) => void;
}

export const ReaderControls: React.FC<ReaderControlsProps> = ({
  settings,
  onUpdateSettings
}) => {
  return (
    <div className="p-4 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-4 text-xs">
      <h4 className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px] pb-2 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-1.5">
        <Palette className="w-4 h-4 text-amber-500" /> Reader Settings
      </h4>

      {/* Reading Theme */}
      <div>
        <label className="block font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5">Background Theme</label>
        <div className="grid grid-cols-3 gap-2">
          {(['light', 'sepia', 'dark'] as ReaderTheme[]).map((themeChoice) => (
            <button
              key={themeChoice}
              onClick={() => onUpdateSettings({ theme: themeChoice })}
              className={`py-2 px-3 rounded-xl font-bold uppercase text-[10px] tracking-wider border transition-all ${
                settings.theme === themeChoice
                  ? 'border-amber-500 ring-2 ring-amber-500/30'
                  : 'border-zinc-200 dark:border-zinc-800'
              } ${
                themeChoice === 'light'
                  ? 'bg-white text-zinc-900'
                  : themeChoice === 'sepia'
                  ? 'bg-[#FBF0D9] text-[#5F4B32]'
                  : 'bg-zinc-950 text-zinc-100'
              }`}
            >
              {themeChoice}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div>
        <label className="block font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5">Text Size</label>
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/60 p-1 rounded-xl">
          {(['sm', 'base', 'lg', 'xl', '2xl'] as ReaderFontSize[]).map((size) => (
            <button
              key={size}
              onClick={() => onUpdateSettings({ fontSize: size })}
              className={`flex-1 py-1 rounded-lg font-bold uppercase text-[10px] transition-all ${
                settings.fontSize === size
                  ? 'bg-white dark:bg-zinc-900 text-amber-600 dark:text-amber-400 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Container Width */}
      <div>
        <label className="block font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5">Reading Width</label>
        <div className="grid grid-cols-3 gap-2">
          {(['narrow', 'normal', 'wide'] as ReaderWidth[]).map((w) => (
            <button
              key={w}
              onClick={() => onUpdateSettings({ width: w })}
              className={`py-1.5 px-2 rounded-xl font-semibold capitalize text-xs border transition-all ${
                settings.width === w
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Font Family */}
      <div>
        <label className="block font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5">Font Style</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onUpdateSettings({ fontFamily: 'serif' })}
            className={`py-1.5 px-3 rounded-xl font-editorial font-bold text-sm border transition-all ${
              settings.fontFamily === 'serif'
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            Serif
          </button>
          <button
            onClick={() => onUpdateSettings({ fontFamily: 'sans' })}
            className={`py-1.5 px-3 rounded-xl font-sans font-bold text-sm border transition-all ${
              settings.fontFamily === 'sans'
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            Sans
          </button>
        </div>
      </div>
    </div>
  );
};
