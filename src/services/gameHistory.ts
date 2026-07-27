// Persistent per-browser history of finished Snake games.
// Each record captures the player name, score and the exact time played.

export interface GameHistoryEntry {
  id: string;
  name: string;
  score: number;
  playedAt: number; // epoch millis
}

const HISTORY_KEY = 'snake-game-history';
const MAX_ENTRIES = 200;

export function getHistory(): GameHistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const list = raw ? (JSON.parse(raw) as GameHistoryEntry[]) : [];
    // Newest first.
    return list.sort((a, b) => b.playedAt - a.playedAt);
  } catch {
    return [];
  }
}

export function addHistoryEntry(name: string, score: number): GameHistoryEntry {
  const entry: GameHistoryEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: name.trim() || 'Anonymous',
    score,
    playedAt: Date.now(),
  };
  try {
    const list = getHistory();
    list.unshift(entry);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, MAX_ENTRIES)));
  } catch {
    /* ignore storage errors */
  }
  return entry;
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    /* ignore */
  }
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString();
}

export function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString();
}
