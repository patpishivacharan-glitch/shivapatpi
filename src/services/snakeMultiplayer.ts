// Realtime multiplayer presence + score sync backed by the server.
//
// Uses Server-Sent Events (EventSource) to receive the live player list pushed
// by the backend, and periodic heartbeats (fetch POST) to register presence and
// score. Because the state lives on the shared server, every player sees all
// other players in realtime across devices and browsers — no page refresh needed.

export interface Player {
  id: string;
  name: string;
  score: number;
  lastSeen?: number;
}

const HEARTBEAT_MS = 2000;

type Listener = (players: Player[]) => void;

export class SnakeMultiplayer {
  private id: string;
  private name = '';
  private score = 0;
  private source: EventSource | null = null;
  private heartbeat: ReturnType<typeof setInterval> | null = null;
  private beforeUnload: (() => void) | null = null;
  private listeners = new Set<Listener>();
  private cache: Player[] = [];

  constructor() {
    this.id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }

  get playerId(): string {
    return this.id;
  }

  join(name: string): void {
    this.name = name.trim() || 'Anonymous';
    this.score = 0;

    // Open the realtime stream of players.
    try {
      this.source = new EventSource('/api/snake/stream');
      this.source.onmessage = (e: MessageEvent) => {
        try {
          const players = JSON.parse(e.data) as Player[];
          this.cache = players;
          this.emit();
        } catch {
          /* ignore malformed frame */
        }
      };
      this.source.onerror = () => {
        // EventSource auto-reconnects; also refresh via heartbeat.
        this.sendHeartbeat();
      };
    } catch {
      this.source = null;
    }

    this.beforeUnload = () => this.sendLeaveBeacon();
    window.addEventListener('beforeunload', this.beforeUnload);
    window.addEventListener('pagehide', this.beforeUnload);

    this.sendHeartbeat();
    this.heartbeat = setInterval(() => this.sendHeartbeat(), HEARTBEAT_MS);
  }

  setScore(score: number): void {
    this.score = score;
    this.sendHeartbeat();
  }

  private sendHeartbeat(): void {
    fetch('/api/snake/heartbeat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: this.id, name: this.name, score: this.score }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((players: Player[] | null) => {
        if (players) {
          this.cache = players;
          this.emit();
        }
      })
      .catch(() => {
        /* offline / server down — stream will resync on reconnect */
      });
  }

  private sendLeaveBeacon(): void {
    try {
      const blob = new Blob([JSON.stringify({ id: this.id })], {
        type: 'application/json',
      });
      navigator.sendBeacon('/api/snake/leave', blob);
    } catch {
      /* ignore */
    }
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.cache);
    return () => this.listeners.delete(listener);
  }

  getPlayers(): Player[] {
    return this.cache;
  }

  private emit(): void {
    this.listeners.forEach((l) => l(this.cache));
  }

  leave(): void {
    if (this.heartbeat) {
      clearInterval(this.heartbeat);
      this.heartbeat = null;
    }
    if (this.source) {
      this.source.close();
      this.source = null;
    }
    if (this.beforeUnload) {
      window.removeEventListener('beforeunload', this.beforeUnload);
      window.removeEventListener('pagehide', this.beforeUnload);
      this.beforeUnload = null;
    }

    // Notify the server we're gone (best-effort).
    fetch('/api/snake/leave', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: this.id }),
    }).catch(() => this.sendLeaveBeacon());

    this.listeners.clear();
    this.cache = [];
  }
}
