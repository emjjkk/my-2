import fs from 'fs';
import path from 'path';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  file: string;
}

export interface PostWithContent extends PostMeta {
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'posts');
const postsJsonPath = path.join(postsDirectory, 'posts.json');

export function getAllPosts(): PostMeta[] {
  try {
    const fileContents = fs.readFileSync(postsJsonPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading posts.json:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): PostWithContent | null {
  const posts = getAllPosts();
  const postMeta = posts.find((p) => p.slug === slug);
  if (!postMeta) return null;

  try {
    const filePath = path.join(postsDirectory, postMeta.file);
    let content = '';
    if (fs.existsSync(filePath)) {
      content = fs.readFileSync(filePath, 'utf8');
    } else {
      content = `# ${postMeta.title}\n\n${postMeta.summary}`;
    }
    return {
      ...postMeta,
      content,
    };
  } catch (error) {
    console.error(`Error reading post file for slug ${slug}:`, error);
    return {
      ...postMeta,
      content: `# ${postMeta.title}\n\n${postMeta.summary}`,
    };
  }
}

export function getAdjacentPosts(currentSlug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return { prev: null, next: null };

  const prev = index > 0 ? posts[index - 1] : null;
  const next = index < posts.length - 1 ? posts[index + 1] : null;

  return { prev, next };
}
