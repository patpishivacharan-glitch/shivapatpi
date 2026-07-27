const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// ---------------------------------------------------------------------------
// Realtime multiplayer presence for the Snake game.
// Shared in-memory store + Server-Sent Events so every connected player sees
// all other players in realtime across devices/browsers (same origin/server).
// ---------------------------------------------------------------------------
const players = new Map(); // id -> { id, name, score, lastSeen }
const sseClients = new Set(); // active SSE response streams
const STALE_MS = 6000;

function snapshot() {
  const now = Date.now();
  for (const [id, p] of players) {
    if (now - p.lastSeen > STALE_MS) players.delete(id);
  }
  return Array.from(players.values()).sort(
    (a, b) => b.score - a.score || a.name.localeCompare(b.name)
  );
}

function broadcast() {
  const data = `data: ${JSON.stringify(snapshot())}\n\n`;
  for (const res of sseClients) {
    try {
      res.write(data);
    } catch (e) {
      sseClients.delete(res);
    }
  }
}

// Realtime stream of the current player list.
app.get('/api/snake/stream', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });
  res.flushHeaders();
  res.write(`data: ${JSON.stringify(snapshot())}\n\n`);
  sseClients.add(res);

  const keepAlive = setInterval(() => {
    try {
      res.write(': keep-alive\n\n');
    } catch (e) {
      /* ignore */
    }
  }, 15000);

  req.on('close', () => {
    clearInterval(keepAlive);
    sseClients.delete(res);
  });
});

// Presence heartbeat — register/update a player and return the live list.
app.post('/api/snake/heartbeat', (req, res) => {
  const { id, name, score } = req.body || {};
  if (!id) return res.status(400).json({ error: 'id is required' });
  players.set(id, {
    id,
    name: String(name || 'Anonymous').slice(0, 20),
    score: Number(score) || 0,
    lastSeen: Date.now(),
  });
  broadcast();
  res.json(snapshot());
});

// Explicit leave (also handled by staleness pruning).
app.post('/api/snake/leave', (req, res) => {
  const { id } = req.body || {};
  if (id) players.delete(id);
  broadcast();
  res.json({ ok: true });
});

// Periodically prune stale players and push updated counts to everyone.
setInterval(() => {
  const before = players.size;
  snapshot(); // prunes stale entries as a side effect
  if (players.size !== before) broadcast();
}, 3000);

// ---------------------------------------------------------------------------
// Static React app
// ---------------------------------------------------------------------------
// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});