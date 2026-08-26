export interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
}

export const ALL_PROJECTS: Project[] = [
  {
    title: 'Livewall',
    category: 'Desktop App',
    description:
      'A lightweight live wallpaper engine for Windows with an ultra-minimal footprint (<10MB RAM). Enables smooth video wallpapers without draining system resources.',
    tech: ['Tauri', 'Rust', 'TypeScript', 'React'],
    github: 'https://github.com/emjjkk/livewall',
    link: 'https://github.com/emjjkk/livewall/releases',
  },
  {
    title: 'MyDE',
    category: 'Web Application',
    description:
      'Local-first browser web IDE equipped with local LLM integration and sandboxed in-browser code execution.',
    tech: ['Vite', 'React', 'TypeScript', 'WebContainers'],
    github: 'https://github.com/emjjkk/myde',
    link: 'https://myde.emjjkk.tech',
  },
  {
    title: 'beat-detection',
    category: 'Python CLI / Tool',
    description:
      'Automatic audio analysis script that detects beats, drops, and transients in music, generating exportable edit markers for DaVinci Resolve & Premiere Pro.',
    tech: ['Python', 'Librosa', 'NumPy', 'Audio DSP'],
    github: 'https://github.com/emjjkk/beat-detection',
  },
  {
    title: 'MyDoc',
    category: 'Web App / Tool',
    description:
      'Offline markdown-based documentation editor built for the browser with instant a unified previw + editor, where markdown is rendered in real-time as you type. Supports local-first storage and export to PDF.',
    tech: ['Next.js', 'TypeScript', 'TailwindCSS'],
    github: 'https://github.com/emjjkk/mydoc',
    link: 'https://mydoc.emjjkk.tech',
  },
  {
    title: 'Vistab',
    category: 'Browser Extension',
    description:
      'Minimalist new-tab dashboard extension for Chrome featuring a distraction-free to-do list, dynamic wallpaper toggling, and local data persistence.',
    tech: ['TypeScript', 'Chrome Extension API', 'CSS'],
    github: 'https://github.com/emjjkk/vistab',
  },
  {
    title: 'yt-downloader',
    category: 'Web Utility',
    description:
      'High-performance YouTube video & audio extraction web service utilizing authenticated session cookies to bypass automated bot checks cleanly.',
    tech: ['Python', 'Flask', 'yt-dlp'],
    github: 'https://github.com/emjjkk/yt-downloader',
  },
];
