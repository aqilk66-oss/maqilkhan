import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeSwitcher = ({ className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className={`relative p-2 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-electric-cyan ${
        isDark
          ? 'bg-navy-900 border-slate-800 text-slate-300 hover:text-electric-cyan hover:border-slate-700'
          : 'bg-white border-slate-200 text-slate-700 hover:text-sky-600 hover:border-slate-300 shadow-sm'
      } ${className}`}
    >
      <div className="relative w-4 h-4 sm:w-4.5 sm:h-4.5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-300 transition-transform duration-300 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-sky-600 transition-transform duration-300 hover:-rotate-12" />
        )}
      </div>
    </button>
  );
};

export default ThemeSwitcher;
