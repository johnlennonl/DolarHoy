import { DollarSign, Github, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const isDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', isDark);
    setDark(isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setDark(next);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 dark:bg-zinc-900/60 border-b border-black/5 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 font-extrabold tracking-tight text-xl">
          <div className="p-1.5 rounded-lg bg-emerald-500/90 text-white shadow">
            <DollarSign size={18} />
          </div>
          <span className="select-none">DolarHoy</span>
          <span className="text-sm font-normal opacity-60 hidden sm:inline">• BCV oficial</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/johnlennonl/DolarHoy?tab=readme-ov-file"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
            title="Repositorio"
          >
            <Github size={18} />
            <span className="hidden sm:inline text-sm">GitHub</span>
          </a>

          <button
            onClick={toggle}
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
            title="Cambiar tema"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
