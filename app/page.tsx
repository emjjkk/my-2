import React from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  ArrowRight,
  Github,
} from 'lucide-react';
import DiscordActivity from '@/components/DiscordActivity';
import ThemeToggle from '@/components/ThemeToggle';
import CopyEmailButton from '@/components/CopyEmailButton';
import { getAllPosts } from '@/lib/posts';
import { ALL_PROJECTS } from '@/lib/projects';

export default function PortfolioPage() {
  const posts = getAllPosts();
  const visibleProjects = ALL_PROJECTS.slice(0, 3);
  const visiblePosts = posts.slice(0, 5);

  return (
    <main
      id="portfolio-main"
      className="min-h-screen transition-colors duration-200 bg-[var(--paper)] text-[var(--ink)]"
    >
      {/* Top Status & Activity Bar */}
      <div className="w-full max-w-2xl mx-auto px-5 sm:px-6 pt-10 sm:pt-14 pb-4 flex items-center justify-between font-mono-ink text-xs opacity-80">
        <DiscordActivity />
        <ThemeToggle />
      </div>

      {/* Single Column Flowing Content */}
      <div className="w-full max-w-2xl mx-auto px-5 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-14">
        {/* Header & Bio */}
        <section id="about-section" className="space-y-4">
          <div className="space-y-1">
            <h1
              id="main-heading"
              className="text-3xl sm:text-4xl font-semibold"
            >
              Emmanuel Alabi
            </h1>
            <p className="font-mono-ink text-xs opacity-60 tracking-wider">
              Software engineer, CS student
            </p>
          </div>

          <p
            id="bio-paragraph"
            className="text-base sm:text-md leading-relaxed opacity-90 pt-2 text-justify"
          >
            My name is Emmanuel Alabi, but you can call me Thursday. Thai-Nigerian dev based in
            Rwanda for now. Currently building full-stack web applications with a focus on
            performance and optimization. I also build native mobile and desktop apps as well as
            third-party integrations.
          </p>
        </section>

        {/* Minimal Hairline Divider */}
        <div className="w-full border-t border-dashed border-current opacity-20" />

        {/* Projects Section */}
        <section id="projects-section" className="space-y-6">
          <div className="flex justify-between items-baseline">
            <h2
              id="projects-heading"
              className="text-lg sm:text-xl font-medium tracking-tight"
            >
              Projects
            </h2>
            <span className="font-mono-ink text-xs opacity-50">[ {ALL_PROJECTS.length} ]</span>
          </div>

          <div className="space-y-7">
            {visibleProjects.map((project, idx) => (
              <article
                key={project.title}
                id={`project-item-${idx}`}
                className="space-y-1.5 group"
              >
                <div className="flex items-baseline justify-between flex-wrap gap-2">
                  <div className="flex items-baseline gap-2.5">
                    <h3 className="text-base sm:text-lg font-semibold group-hover:underline underline-offset-4">
                      {project.title}
                    </h3>
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

          {/* See More Projects Link */}
          {ALL_PROJECTS.length > 3 && (
            <div className="pt-1">
              <Link
                id="see-more-projects-link"
                href="/projects"
                className="inline-flex items-center gap-1 font-mono-ink text-xs opacity-60 hover:opacity-100 hover:underline underline-offset-4 transition-opacity group"
              >
                <span>see all projects ({ALL_PROJECTS.length})</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          )}
        </section>

        {/* Minimal Hairline Divider */}
        <div className="w-full border-t border-dashed border-current opacity-20" />

        {/* Notes (Blog) Section - Direct link to /p/slug */}
        <section id="notes-section" className="space-y-6">
          <div className="flex justify-between items-baseline">
            <h2
              id="notes-heading"
              className="text-lg sm:text-xl font-medium tracking-tight"
            >
              Blog
            </h2>
            <span className="font-mono-ink text-xs opacity-50">[ {posts.length} ]</span>
          </div>

          <div id="notes-list" className="space-y-3 font-mono-ink text-xs sm:text-sm">
            {visiblePosts.map((note, idx) => (
              <Link
                key={note.slug}
                id={`note-row-${idx}`}
                href={`/p/${note.slug}`}
                className="flex items-baseline justify-between gap-3 group cursor-pointer py-1 text-inherit hover:opacity-100 transition-opacity"
              >
                <span className="font-serif-ink text-base sm:text-lg group-hover:underline underline-offset-4 shrink-0 max-w-[70%] sm:max-w-none truncate sm:whitespace-normal">
                  {note.title}
                </span>

                {/* Dotted leader filler */}
                <span className="hidden sm:block grow dotted-leader h-3 mx-2 opacity-25 group-hover:opacity-75 transition-opacity" />

                <span className="font-mono-ink text-xs opacity-50 shrink-0 whitespace-nowrap group-hover:opacity-100">
                  {note.date}
                </span>
              </Link>
            ))}
          </div>

          {/* See More Notes Link */}
          {posts.length > 5 && (
            <div className="pt-2">
              <Link
                id="see-more-notes-link"
                href="/notes"
                className="inline-flex items-center gap-1 font-mono-ink text-xs opacity-60 hover:opacity-100 hover:underline underline-offset-4 transition-opacity group"
              >
                <span>see all notes ({posts.length})</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          )}
        </section>

        {/* Minimal Hairline Divider */}
        <div className="w-full border-t border-dashed border-current opacity-20" />

        {/* Contact Details Section */}
        <section id="contact-section" className="space-y-5">
          <div className="flex justify-between items-baseline">
            <h2
              id="contact-heading"
              className="text-lg sm:text-xl font-medium tracking-tight"
            >
              Contact
            </h2>
          </div>

          <p className="text-sm sm:text-base leading-relaxed opacity-80">
            Reach out for collaborations, full-stack contracts, desktop tools, or bots.
          </p>

          {/* Contact List */}
          <div className="space-y-2.5 font-mono-ink text-xs sm:text-sm">
            {/* Email with copy button */}
            <div className="flex justify-between items-center py-1 border-b border-dashed border-current opacity-80 border-opacity-10">
              <span className="opacity-60">Email</span>
              <div className="flex items-center gap-2">
                <a
                  href="mailto:hi@emjjkk.tech"
                  className="hover:underline underline-offset-2 font-medium"
                >
                  hi@emjjkk.tech
                </a>
                <CopyEmailButton />
              </div>
            </div>

            {/* Website */}
            <div className="flex justify-between items-center py-1 border-b border-dashed border-current opacity-80 border-opacity-10">
              <span className="opacity-60">Website</span>
              <a
                href="https://emjjkk.tech"
                target="_blank"
                rel="noreferrer"
                className="hover:underline underline-offset-2 font-medium flex items-center gap-1"
              >
                <span>emjjkk.tech</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* GitHub */}
            <div className="flex justify-between items-center py-1 border-b border-dashed border-current opacity-80 border-opacity-10">
              <span className="opacity-60">GitHub</span>
              <a
                href="https://github.com/emjjkk"
                target="_blank"
                rel="noreferrer"
                className="hover:underline underline-offset-2 font-medium flex items-center gap-1"
              >
                <span>github.com/emjjkk</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* LinkedIn */}
            <div className="flex justify-between items-center py-1 border-b border-dashed border-current opacity-80 border-opacity-10">
              <span className="opacity-60">LinkedIn</span>
              <a
                href="https://linkedin.com/in/emjjkk"
                target="_blank"
                rel="noreferrer"
                className="hover:underline underline-offset-2 font-medium flex items-center gap-1"
              >
                <span>linkedin.com/in/emjjkk</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* X / Twitter */}
            <div className="flex justify-between items-center py-1 border-b border-dashed border-current opacity-80 border-opacity-10">
              <span className="opacity-60">X / Twitter</span>
              <a
                href="https://x.com/emjjkk"
                target="_blank"
                rel="noreferrer"
                className="hover:underline underline-offset-2 font-medium flex items-center gap-1"
              >
                <span>@emjjkk</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* Discord */}
            <div className="flex justify-between items-center py-1 border-b border-dashed border-current opacity-80 border-opacity-10">
              <span className="opacity-60">Discord</span>
              <span className="font-medium">@e.mjjkk</span>
            </div>
          </div>
        </section>

        {/* Minimal Simple Footer */}
        <footer
          id="portfolio-footer"
          className="pt-10 pb-16 font-mono-ink text-xs opacity-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t border-dashed border-current"
        >
          <span>&copy; emjjkk.tech. Some things are best viewed without a rulebook.</span>
          <a
            href="mailto:hi@emjjkk.tech"
            className="hover:underline"
          >
            hi@emjjkk.tech
          </a>
        </footer>
      </div>
    </main>
  );
}
