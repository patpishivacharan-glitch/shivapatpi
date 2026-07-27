// Lightweight realtime multiplayer presence + score sync.
//
// Uses BroadcastChannel for instant cross-tab messaging and localStorage as the
// shared source of truth so that presence survives reloads and works across every
// tab/window on the same origin. Players that stop sending heartbeats are pruned,
// giving an accurate realtime count of who is currently playing.

export interface Player {
  id: string;
  name: string;
  score: number;
  lastSeen: number;
}

const STORAGE_KEY = 'snake-multiplayer-players';
const CHANNEL_NAME = 'snake-multiplayer';
const HEARTBEAT_MS = 2000;
const STALE_MS = 6000;

type Listener = (players: Player[]) => void;

function readStore(): Record<string, Player> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, Player>) : {};
  } catch {
    return {};
  }
}

function writeStore(players: Record<string, Player>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
  } catch {
    /* ignore quota / serialization errors */
  }
}

function prune(players: Record<string, Player>): Record<string, Player> {
  const now = Date.now();
  const alive: Record<string, Player> = {};
  Object.values(players).forEach((p) => {
    if (now - p.lastSeen <= STALE_MS) {
      alive[p.id] = p;
    }
  });
  return alive;
}

export class SnakeMultiplayer {
  private id: string;
  private name = '';
  private score = 0;
  private channel: BroadcastChannel | null = null;
  private listeners = new Set<Listener>();
  private heartbeat: ReturnType<typeof setInterval> | null = null;
  private storageHandler: ((e: StorageEvent) => void) | null = null;
  private beforeUnload: (() => void) | null = null;

  constructor() {
    this.id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }

  get playerId(): string {
    return this.id;
  }

  join(name: string): void {
    this.name = name.trim() || 'Anonymous';
    this.score = 0;

    if (typeof BroadcastChannel !== 'undefined') {
      this.channel = new BroadcastChannel(CHANNEL_NAME);
      this.channel.onmessage = () => this.emit();
    }

    this.storageHandler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) this.emit();
    };
    window.addEventListener('storage', this.storageHandler);

    this.beforeUnload = () => this.leave();
    window.addEventListener('beforeunload', this.beforeUnload);

    this.writeSelf();
    this.heartbeat = setInterval(() => this.writeSelf(), HEARTBEAT_MS);
    this.emit();
  }

  setScore(score: number): void {
    this.score = score;
    this.writeSelf();
  }

  private writeSelf(): void {
    const players = prune(readStore());
    players[this.id] = {
      id: this.id,
      name: this.name,
      score: this.score,
      lastSeen: Date.now(),
    };
    writeStore(players);
    this.notifyChannel();
    this.emit();
  }

  private notifyChannel(): void {
    if (this.channel) {
      try {
        this.channel.postMessage('update');
      } catch {
        /* channel closed */
      }
    }
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.getPlayers());
    return () => this.listeners.delete(listener);
  }

  getPlayers(): Player[] {
    return Object.values(prune(readStore())).sort(
      (a, b) => b.score - a.score || a.name.localeCompare(b.name)
    );
  }

  private emit(): void {
    const players = this.getPlayers();
    this.listeners.forEach((l) => l(players));
  }

  leave(): void {
    if (this.heartbeat) {
      clearInterval(this.heartbeat);
      this.heartbeat = null;
    }
    const players = prune(readStore());
    delete players[this.id];
    writeStore(players);
    this.notifyChannel();

    if (this.storageHandler) {
      window.removeEventListener('storage', this.storageHandler);
      this.storageHandler = null;
    }
    if (this.beforeUnload) {
      window.removeEventListener('beforeunload', this.beforeUnload);
      this.beforeUnload = null;
    }
    if (this.channel) {
      this.channel.close();
      this.channel = null;
    }
    this.listeners.clear();
  }
}
