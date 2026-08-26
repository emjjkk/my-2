import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { getAllPosts, getPostBySlug, getAdjacentPosts } from '@/lib/posts';
import type { Metadata } from 'next';
import ThemeToggle from '@/components/ThemeToggle';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found — Emmanuel Alabi',
    };
  }

  return {
    title: `${post.title} — Emmanuel Alabi`,
    description: post.summary,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <main
      id="post-page-root"
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

      {/* Article Content Container */}
      <article className="w-full max-w-2xl mx-auto px-5 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Post Metadata Header */}
        <header className="space-y-3 border-b border-dashed border-current opacity-90 pb-6">
          <div className="flex items-center gap-2 font-mono-ink text-xs opacity-60 uppercase">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold tracking-tight leading-tight">
            {post.title}
          </h1>

          {post.summary && (
            <p className="font-serif-ink italic text-base sm:text-lg opacity-80 pt-1">
              {post.summary}
            </p>
          )}
        </header>

        {/* Markdown Formatted Body (Newsreader Serif Font with Syntax Highlighted Code) */}
        <div className="note-prose text-justify leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Next / Previous Post Navigation */}
        <div className="pt-10 border-t border-dashed border-current opacity-80 mt-12 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 font-mono-ink text-xs">
            {prev ? (
              <Link
                href={`/p/${prev.slug}`}
                className="group flex flex-col items-start gap-1 p-3 border border-dashed border-current/30 hover:border-current transition-colors text-left flex-1"
              >
                <span className="opacity-50 flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" /> Previous
                </span>
                <span className="font-sans font-medium line-clamp-1 group-hover:underline">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div className="flex-1 hidden sm:block" />
            )}

            {next ? (
              <Link
                href={`/p/${next.slug}`}
                className="group flex flex-col items-end gap-1 p-3 border border-dashed border-current/30 hover:border-current transition-colors text-right flex-1"
              >
                <span className="opacity-50 flex items-center gap-1">
                  Next <ArrowRight className="w-3 h-3" />
                </span>
                <span className="font-sans font-medium line-clamp-1 group-hover:underline">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div className="flex-1 hidden sm:block" />
            )}
          </div>

          {/* Footer */}
          <footer className="pt-6 font-mono-ink text-xs opacity-40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span>&copy; emjjkk.tech. Some things are best viewed without a rulebook.</span>
            <Link href="/" className="hover:underline">
              ← Return Home
            </Link>
          </footer>
        </div>
      </article>
    </main>
  );
}
