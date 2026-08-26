'use client';

import React, { useEffect, useState } from 'react';
import { Disc3, Code2, Gamepad2, Radio, Clock } from 'lucide-react';

interface LanyardActivity {
  type: number; // 0: Game/Playing, 1: Streaming, 2: Listening, 3: Watching, 4: Custom status
  name: string;
  details?: string;
  state?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
}

interface LanyardData {
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify?: {
    song: string;
    artist: string;
    album: string;
    timestamps: {
      start: number;
      end: number;
    };
  };
}

// User can set their Discord ID in NEXT_PUBLIC_DISCORD_USER_ID
// or we fall back to a reasonable default ID or dynamic fallback activity
const DEFAULT_DISCORD_ID = process.env.NEXT_PUBLIC_DISCORD_USER_ID || '1137024341908959242';

function getUtc2TimeString(): string {
  try {
    const now = new Date();
    const formatted = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Africa/Kigali', // UTC+2:00
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(now);
    return `${formatted} UTC+2`;
  } catch {
    return '12:00 PM UTC+2';
  }
}

function subscribeLiveTime(callback: () => void) {
  const timer = setInterval(callback, 1000);
  return () => clearInterval(timer);
}

function getLiveTimeSnapshot(): string {
  return getUtc2TimeString();
}

function getLiveTimeServerSnapshot(): string {
  return getUtc2TimeString();
}

export default function DiscordActivity() {
  const [activityText, setActivityText] = useState<string | null>(null);
  const [activityType, setActivityType] = useState<'coding' | 'game' | 'music' | 'online' | 'time'>('time');
  const [isShowingActivity, setIsShowingActivity] = useState<boolean>(false);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [showConfigHint, setShowConfigHint] = useState(false);

  const currentTime = React.useSyncExternalStore(
    subscribeLiveTime,
    getLiveTimeSnapshot,
    getLiveTimeServerSnapshot
  );

  // 6-second cycle toggle between Time and Activity with smooth fade effect
  useEffect(() => {
    if (!activityText) {
      return;
    }

    const cycleTimer = setInterval(() => {
      // 1. Fade out
      setIsFading(true);

      // 2. Swap text after fade-out duration
      setTimeout(() => {
        setIsShowingActivity((prev) => !prev);
        // 3. Fade back in
        setIsFading(false);
      }, 300);
    }, 4000);

    return () => clearInterval(cycleTimer);
  }, [activityText]);

  // Discord Lanyard listener
  useEffect(() => {
    let isMounted = true;

    async function fetchDiscordPresence() {
      if (!DEFAULT_DISCORD_ID) return;

      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DEFAULT_DISCORD_ID}`);
        if (!res.ok) {
          throw new Error('Lanyard fetch failed');
        }
        const json = await res.json();
        if (!json.success || !json.data || !isMounted) return;

        const data: LanyardData = json.data;

        // 1. Check Spotify listening status
        if (data.listening_to_spotify && data.spotify) {
          setActivityText(`Listening to ${data.spotify.song} — ${data.spotify.artist}`);
          setActivityType('music');
          return;
        }

        // 2. Check VS Code / Coding Activity
        const codingActivity = data.activities.find(
          (a) =>
            a.name.toLowerCase().includes('visual studio code') ||
            a.name.toLowerCase().includes('code') ||
            a.name.toLowerCase().includes('neovim') ||
            a.name.toLowerCase().includes('cursor') ||
            a.name.toLowerCase().includes('zed')
        );

        if (codingActivity) {
          let repoName = 'portfolio';
          if (codingActivity.details) {
            const match =
              codingActivity.details.match(/Workspace:\s*([^\s]+)/i) ||
              codingActivity.details.match(/in\s+([^\s]+)/i);
            if (match) {
              repoName = match[1];
            } else if (codingActivity.details.length < 25) {
              repoName = codingActivity.details;
            }
          } else if (codingActivity.state) {
            repoName = codingActivity.state.replace(/^Working on\s+/i, '');
          }

          setActivityText(`Coding in ${repoName}`);
          setActivityType('coding');
          return;
        }

        // 3. Check Game Activity
        const gameActivity = data.activities.find((a) => a.type === 0 && a.name !== 'Custom Status');
        if (gameActivity) {
          setActivityText(`Playing ${gameActivity.name}`);
          setActivityType('game');
          return;
        }

        // 4. Online or offline without rich presence
        setActivityText(null);
      } catch {
        if (isMounted) {
          setActivityText(null);
        }
      }
    }

    fetchDiscordPresence();
    const interval = setInterval(fetchDiscordPresence, 20000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const getIcon = (isShowingAct: boolean) => {
    if (!isShowingAct) {
      return <Clock className="w-3.5 h-3.5 opacity-80 shrink-0" />;
    }
    switch (activityType) {
      case 'music':
        return (
          <Disc3
            className="w-3.5 h-3.5 animate-spin opacity-80 shrink-0"
            style={{ animationDuration: '4s' }}
          />
        );
      case 'game':
        return <Gamepad2 className="w-3.5 h-3.5 opacity-80 shrink-0" />;
      case 'coding':
        return <Code2 className="w-3.5 h-3.5 opacity-80 shrink-0" />;
      default:
        return <Radio className="w-3.5 h-3.5 opacity-80 shrink-0" />;
    }
  };

  const isDisplayingActivity = isShowingActivity && !!activityText;
  const displayText = isDisplayingActivity ? activityText : currentTime;

  return (
    <div className="relative group inline-flex items-center gap-2 font-mono-ink text-xs opacity-75 hover:opacity-100 transition-opacity">
      <div
        className={`flex items-center gap-1.5 truncate max-w-[340px] sm:max-w-[340px] transition-opacity duration-300 ease-in-out ${
          isFading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {getIcon(isDisplayingActivity)}
        <span className="truncate tracking-tight" suppressHydrationWarning>
          {displayText}
        </span>
      </div>

      {/* Subtle hover tooltip to display discord connection info */}
      <button
        onClick={() => setShowConfigHint(!showConfigHint)}
        className="opacity-0 group-hover:opacity-40 hover:!opacity-100 text-[10px] underline cursor-pointer ml-0.5"
        title="Discord Presence Setup"
      >
        [?]
      </button>

      {showConfigHint && (
        <div className="absolute left-0 top-6 z-30 p-3 w-72 bg-[#fbfbf9] dark:bg-[#18191a] border border-dashed border-current text-[11px] font-mono-ink shadow-md space-y-1.5">
          <div className="flex justify-between items-center font-bold">
            <span>Discord Presence (Lanyard)</span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                setShowConfigHint(false);
              }}
              className="cursor-pointer text-xs"
            >
              ✕
            </span>
          </div>
          <p className="opacity-80">
            Powered by <strong>Lanyard API</strong>. Shows live UTC+2 time by default, and alternates with real-time Discord activity (coding, Spotify, games) with a smooth fade every 6 seconds.
          </p>
        </div>
      )}
    </div>
  );
}
