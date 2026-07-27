import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SnakeMultiplayer, Player } from '../services/snakeMultiplayer';
import {
  GameHistoryEntry,
  getHistory,
  addHistoryEntry,
  clearHistory,
  formatDate,
  formatTime,
} from '../services/gameHistory';
import '../styles/SnakeGame.css';

const GRID = 20; // 20 x 20 cells
const CELL = 20; // pixels per cell
const SPEED_MS = 120;

type Point = { x: number; y: number };
type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const OPPOSITE: Record<Dir, Dir> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
};

const randomCell = (): Point => ({
  x: Math.floor(Math.random() * GRID),
  y: Math.floor(Math.random() * GRID),
});

const SnakeGame: React.FC = () => {
  const [name, setName] = useState('');
  const [joined, setJoined] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [running, setRunning] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<GameHistoryEntry[]>([]);

  const mpRef = useRef<SnakeMultiplayer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game state kept in refs so the game loop reads the latest values.
  const snakeRef = useRef<Point[]>([{ x: 10, y: 10 }]);
  const dirRef = useRef<Dir>('RIGHT');
  const pendingDirRef = useRef<Dir>('RIGHT');
  const foodRef = useRef<Point>(randomCell());
  const scoreRef = useRef(0);
  const nameRef = useRef('');

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0b1021';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL, 0);
      ctx.lineTo(i * CELL, GRID * CELL);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL);
      ctx.lineTo(GRID * CELL, i * CELL);
      ctx.stroke();
    }

    // food
    const food = foodRef.current;
    ctx.fillStyle = '#ff5470';
    ctx.beginPath();
    ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2.6, 0, Math.PI * 2);
    ctx.fill();

    // snake
    const snake = snakeRef.current;
    snake.forEach((seg, idx) => {
      ctx.fillStyle = idx === 0 ? '#4ade80' : '#22c55e';
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
    });
  }, []);

  const resetGame = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 10 }];
    dirRef.current = 'RIGHT';
    pendingDirRef.current = 'RIGHT';
    foodRef.current = randomCell();
    scoreRef.current = 0;
    setScore(0);
    setGameOver(false);
    mpRef.current?.setScore(0);
    draw();
  }, [draw]);

  const step = useCallback(() => {
    const dir = pendingDirRef.current;
    dirRef.current = dir;
    const snake = snakeRef.current;
    const head = snake[0];
    const next: Point = { ...head };
    if (dir === 'UP') next.y -= 1;
    if (dir === 'DOWN') next.y += 1;
    if (dir === 'LEFT') next.x -= 1;
    if (dir === 'RIGHT') next.x += 1;

    const hitWall = next.x < 0 || next.y < 0 || next.x >= GRID || next.y >= GRID;
    const hitSelf = snake.some((s) => s.x === next.x && s.y === next.y);
    if (hitWall || hitSelf) {
      setRunning(false);
      setGameOver(true);
      addHistoryEntry(nameRef.current, scoreRef.current);
      setHistory(getHistory());
      return;
    }

    const newSnake = [next, ...snake];
    if (next.x === foodRef.current.x && next.y === foodRef.current.y) {
      scoreRef.current += 10;
      setScore(scoreRef.current);
      mpRef.current?.setScore(scoreRef.current);
      // place new food not on the snake
      let f = randomCell();
      while (newSnake.some((s) => s.x === f.x && s.y === f.y)) f = randomCell();
      foodRef.current = f;
    } else {
      newSnake.pop();
    }
    snakeRef.current = newSnake;
    draw();
  }, [draw]);

  // Game loop
  useEffect(() => {
    if (!running) return;
    const id = setInterval(step, SPEED_MS);
    return () => clearInterval(id);
  }, [running, step]);

  // Keyboard controls
  useEffect(() => {
    if (!joined) return;
    const handler = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
        w: 'UP',
        s: 'DOWN',
        a: 'LEFT',
        d: 'RIGHT',
      };
      const nd = map[e.key];
      if (!nd) return;
      e.preventDefault();
      if (nd !== OPPOSITE[dirRef.current]) pendingDirRef.current = nd;
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [joined]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const mp = new SnakeMultiplayer();
    mp.subscribe(setPlayers);
    mp.join(name.trim());
    mpRef.current = mp;
    nameRef.current = name.trim();
    setHistory(getHistory());
    setJoined(true);
    resetGame();
  };

  const openHistory = () => {
    setHistory(getHistory());
    setShowHistory(true);
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  const handleLeave = useCallback(() => {
    setRunning(false);
    mpRef.current?.leave();
    mpRef.current = null;
    setJoined(false);
    setPlayers([]);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mpRef.current?.leave();
      mpRef.current = null;
    };
  }, []);

  // Initial paint after joining
  useEffect(() => {
    if (joined) draw();
  }, [joined, draw]);

  const startOrPause = () => {
    if (gameOver) {
      resetGame();
      setRunning(true);
      return;
    }
    setRunning((r) => !r);
  };

  const move = (d: Dir) => {
    if (d !== OPPOSITE[dirRef.current]) pendingDirRef.current = d;
  };

  return (
    <div className="snake-page">
      <div className="snake-header">
        <Link to="/games" className="snake-back">← Games</Link>
        <h1>🐍 Multiplayer Snake</h1>
        <p className="snake-subtitle">
          Enter your name to join the arena. See everyone playing live!
        </p>
        <button className="snake-history-btn" onClick={openHistory}>
          📜 History
        </button>
      </div>

      {!joined ? (
        <form className="snake-join" onSubmit={handleJoin}>
          <label htmlFor="playerName">Your name</label>
          <input
            id="playerName"
            type="text"
            value={name}
            maxLength={20}
            placeholder="e.g. Shiva"
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <button type="submit" disabled={!name.trim()}>
            Join Game
          </button>
          <p className="snake-hint">
            Tip: open this page in another tab or device to see live multiplayer presence.
          </p>
        </form>
      ) : (
        <div className="snake-layout">
          <div className="snake-board-wrap">
            <div className="snake-stats">
              <span>Score: <strong>{score}</strong></span>
              <span className={`snake-status ${gameOver ? 'over' : running ? 'live' : 'idle'}`}>
                {gameOver ? 'Game Over' : running ? 'Playing' : 'Paused'}
              </span>
            </div>
            <canvas
              ref={canvasRef}
              width={GRID * CELL}
              height={GRID * CELL}
              className="snake-canvas"
            />
            <div className="snake-controls">
              <button className="snake-primary" onClick={startOrPause}>
                {gameOver ? 'Play Again' : running ? 'Pause' : 'Start'}
              </button>
              <button className="snake-secondary" onClick={handleLeave}>
                Leave
              </button>
            </div>
            <div className="snake-dpad">
              <button onClick={() => move('UP')} aria-label="Up">▲</button>
              <div>
                <button onClick={() => move('LEFT')} aria-label="Left">◀</button>
                <button onClick={() => move('DOWN')} aria-label="Down">▼</button>
                <button onClick={() => move('RIGHT')} aria-label="Right">▶</button>
              </div>
            </div>
            <p className="snake-hint">Use arrow keys or WASD to move.</p>
          </div>

          <aside className="snake-lobby">
            <h2>
              Players Online
              <span className="snake-count">{players.length}</span>
            </h2>
            <ul className="snake-player-list">
              {players.map((p) => (
                <li
                  key={p.id}
                  className={p.id === mpRef.current?.playerId ? 'me' : ''}
                >
                  <span className="dot" />
                  <span className="pname">
                    {p.name}
                    {p.id === mpRef.current?.playerId && ' (you)'}
                  </span>
                  <span className="pscore">{p.score}</span>
                </li>
              ))}
              {players.length === 0 && <li className="empty">No players yet…</li>}
            </ul>
          </aside>
        </div>
      )}

      {showHistory && (
        <div className="snake-modal-overlay" onClick={() => setShowHistory(false)}>
          <div className="snake-modal" onClick={(e) => e.stopPropagation()}>
            <div className="snake-modal-head">
              <h2>📜 Game History</h2>
              <button
                className="snake-modal-close"
                onClick={() => setShowHistory(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {history.length === 0 ? (
              <p className="snake-history-empty">No games played yet.</p>
            ) : (
              <div className="snake-history-table-wrap">
                <table className="snake-history-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Player</th>
                      <th>Score</th>
                      <th>Date</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((h, i) => (
                      <tr key={h.id}>
                        <td>{i + 1}</td>
                        <td>{h.name}</td>
                        <td>{h.score}</td>
                        <td>{formatDate(h.playedAt)}</td>
                        <td>{formatTime(h.playedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {history.length > 0 && (
              <div className="snake-modal-actions">
                <button className="snake-secondary" onClick={handleClearHistory}>
                  Clear History
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
