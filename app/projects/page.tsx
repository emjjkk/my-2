import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { ALL_PROJECTS } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects — Emmanuel Alabi',
  description: 'All software engineering projects, desktop applications, web tools, and services built by Emmanuel Alabi.',
};

export default function ProjectsPage() {
  return (
    <main
      id="projects-page-root"
      className="min-h-screen transition-colors duration-200 bg-[var(--paper)] text-[var(--ink)]"
    >
      {/* Top Minimal Navigation Bar */}
      <nav className="w-full max-w-2xl mx-auto px-5 sm:px-6 pt-10 sm:pt-14 pb-4 flex items-center justify-between font-mono-ink text-xs opacity-70">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 hover:underline underline-offset-4 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>

        <ThemeToggle />
      </nav>

      {/* Projects Content Container */}
      <div className="w-full max-w-2xl mx-auto px-5 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* Header */}
        <header className="space-y-2 border-b border-dashed border-current opacity-90 pb-6">
          <div className="flex justify-between items-baseline">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
              All Projects
            </h1>
            <span className="font-mono-ink text-xs opacity-50">[ {ALL_PROJECTS.length} ]</span>
          </div>
          <p className="font-serif-ink italic text-sm sm:text-base opacity-75">
            An archive of open-source tools, desktop engines, client platforms, and experimental scripts.
          </p>
        </header>

        {/* Full Projects List */}
        <div className="space-y-8">
          {ALL_PROJECTS.map((project, idx) => (
            <article
              key={project.title}
              id={`project-item-${idx}`}
              className="space-y-1.5 group"
            >
              <div className="flex items-baseline justify-between flex-wrap gap-2">
                <div className="flex items-baseline gap-2.5">
                  <h2 className="text-base sm:text-lg font-semibold group-hover:underline underline-offset-4">
                    {project.title}
                  </h2>
                  <span className="font-mono-ink text-xs opacity-50">
                    — {project.category}
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono-ink text-xs opacity-70">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:opacity-100 hover:underline flex items-center gap-1"
                    >
                      <Github className="w-3 h-3" />
                      <span>Source</span>
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:opacity-100 hover:underline flex items-center gap-1"
                    >
                      <span>Visit</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-sm sm:text-base leading-relaxed opacity-80">
                {project.description}
              </p>

              <div className="flex items-center flex-wrap gap-x-2 gap-y-1 font-mono-ink text-xs opacity-50 pt-0.5">
                <span>Stack:</span>
                {project.tech.map((t, tIdx) => (
                  <span key={t}>
                    {t}
                    {tIdx < project.tech.length - 1 && <span className="ml-2">/</span>}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Footer Navigation */}
        <footer className="pt-10 border-t border-dashed border-current opacity-50 font-mono-ink text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span>&copy; emjjkk.tech. Some things are best viewed without a rulebook.</span>
          <Link href="/" className="hover:underline">
            ← Return Home
          </Link>
        </footer>
      </div>
    </main>
  );
}
