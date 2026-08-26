import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Notes — Emmanuel Alabi',
  description: 'Technical notes, engineering thoughts, and deep dives on software development by Emmanuel Alabi.',
};

export default function NotesPage() {
  const posts = getAllPosts();

  return (
    <main
      id="notes-page-root"
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

      {/* Notes Content Container */}
      <div className="w-full max-w-2xl mx-auto px-5 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* Header */}
        <header className="space-y-2 border-b border-dashed border-current opacity-90 pb-6">
          <div className="flex justify-between items-baseline">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
              All Notes
            </h1>
            <span className="font-mono-ink text-xs opacity-50">[ {posts.length} ]</span>
          </div>
          <p className="font-serif-ink italic text-sm sm:text-base opacity-75">
            Reflections, architectural decisions, benchmarks, and essays on building software.
          </p>
        </header>

        {/* Full Notes List */}
        <div id="notes-list" className="space-y-6">
          {posts.map((note, idx) => (
            <Link
              key={note.slug}
              id={`note-row-${idx}`}
              href={`/p/${note.slug}`}
              className="block group cursor-pointer space-y-1.5 py-1 text-inherit hover:opacity-100 transition-opacity"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-serif-ink text-lg sm:text-xl font-medium group-hover:underline underline-offset-4 leading-snug">
                  {note.title}
                </h2>
                <span className="font-mono-ink text-xs opacity-50 shrink-0 whitespace-nowrap group-hover:opacity-100">
                  {note.date}
                </span>
              </div>

              {note.summary && (
                <p className="text-sm sm:text-base leading-relaxed opacity-75 group-hover:opacity-90 transition-opacity">
                  {note.summary}
                </p>
              )}

              <div className="flex items-center gap-3 font-mono-ink text-xs opacity-50 pt-0.5">
                <span>{note.readTime}</span>
              </div>
            </Link>
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
