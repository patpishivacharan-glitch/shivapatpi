import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Games.css';

interface GameCard {
  id: string;
  title: string;
  icon: string;
  description: string;
  path: string;
  available: boolean;
}

const games: GameCard[] = [
  {
    id: 'snake',
    title: 'Multiplayer Snake',
    icon: '🐍',
    description:
      'Classic snake with a realtime twist — join by name and see everyone playing live, with a running player count and shared scoreboard.',
    path: '/games/snake',
    available: true,
  },
];

const Games: React.FC = () => {
  return (
    <div className="games-page">
      <div className="games-hero">
        <h1>🎮 Games</h1>
        <p>Take a break and play. More games coming soon!</p>
      </div>

      <div className="games-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <div className="game-icon">{game.icon}</div>
            <h2>{game.title}</h2>
            <p>{game.description}</p>
            {game.available ? (
              <Link to={game.path} className="game-play-btn">
                Play Now
              </Link>
            ) : (
              <span className="game-soon">Coming Soon</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
