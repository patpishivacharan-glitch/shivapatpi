import React, { useState, useCallback } from 'react';
import { useAuth, QuizHistoryEntry } from '../contexts/AuthContext';
import '../styles/Quiz.css';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  questions: Question[];
}

type QuizState = 'login' | 'categories' | 'quiz' | 'results';

const quizCategories: QuizCategory[] = [
  {
    id: 'technical',
    title: 'Technical',
    icon: '💻',
    description: 'Test your knowledge on programming, web development, and software engineering concepts.',
    color: '#6366f1',
    questions: [
      {
        id: 1,
        question: 'What does "REST" stand for in RESTful APIs?',
        options: [
          'Representational State Transfer',
          'Remote Execution Service Technology',
          'Real-time Event Streaming Transfer',
          'Resource Enabled Server Technology'
        ],
        correctAnswer: 0,
        explanation: 'REST stands for Representational State Transfer, an architectural style for designing networked applications.'
      },
      {
        id: 2,
        question: 'Which hook in React is used to manage side effects?',
        options: ['useState', 'useReducer', 'useEffect', 'useMemo'],
        correctAnswer: 2,
        explanation: 'useEffect is the React hook designed for managing side effects like data fetching, subscriptions, and DOM manipulation.'
      },
      {
        id: 3,
        question: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],
        correctAnswer: 2,
        explanation: 'Binary search has O(log n) time complexity because it halves the search space with each comparison.'
      },
      {
        id: 4,
        question: 'Which of the following is NOT a JavaScript data type?',
        options: ['Symbol', 'BigInt', 'Float', 'Undefined'],
        correctAnswer: 2,
        explanation: 'Float is not a JavaScript data type. JavaScript uses "number" for all numeric values including floating point.'
      },
      {
        id: 5,
        question: 'What does CSS Grid\'s "fr" unit represent?',
        options: [
          'Fixed ratio',
          'Fraction of available space',
          'Frame rate',
          'Full row'
        ],
        correctAnswer: 1,
        explanation: 'The "fr" unit represents a fraction of the available space in the grid container.'
      },
      {
        id: 6,
        question: 'Which design pattern does React\'s Context API primarily implement?',
        options: ['Observer', 'Singleton', 'Provider', 'Factory'],
        correctAnswer: 2,
        explanation: 'React Context API uses the Provider pattern to pass data through the component tree without prop drilling.'
      },
      {
        id: 7,
        question: 'What is the purpose of a "closure" in JavaScript?',
        options: [
          'To close a browser window',
          'To encapsulate variables in a function scope',
          'To terminate a loop',
          'To delete an object'
        ],
        correctAnswer: 1,
        explanation: 'A closure is a function that retains access to its outer scope\'s variables even after the outer function has returned.'
      },
      {
        id: 8,
        question: 'Which HTTP status code indicates "Not Found"?',
        options: ['200', '301', '404', '500'],
        correctAnswer: 2,
        explanation: '404 is the HTTP status code that indicates the requested resource was not found on the server.'
      }
    ]
  },
  {
    id: 'spiritual',
    title: 'Spiritual Wisdom',
    icon: '🧘',
    description: 'Explore your understanding of spiritual teachings, meditation, and ancient wisdom traditions.',
    color: '#8b5cf6',
    questions: [
      {
        id: 1,
        question: 'The Bhagavad Gita is a part of which ancient Indian epic?',
        options: ['Ramayana', 'Mahabharata', 'Vedas', 'Upanishads'],
        correctAnswer: 1,
        explanation: 'The Bhagavad Gita is a 700-verse Hindu scripture that is part of the epic Mahabharata.'
      },
      {
        id: 2,
        question: 'What does the Sanskrit word "Yoga" literally mean?',
        options: ['Exercise', 'Union', 'Peace', 'Flexibility'],
        correctAnswer: 1,
        explanation: 'Yoga comes from the Sanskrit root "yuj" meaning to yoke or unite, symbolizing the union of body, mind, and spirit.'
      },
      {
        id: 3,
        question: 'How many chapters are there in the Bhagavad Gita?',
        options: ['12', '15', '18', '21'],
        correctAnswer: 2,
        explanation: 'The Bhagavad Gita consists of 18 chapters, each representing a different yoga or path of spiritual wisdom.'
      },
      {
        id: 4,
        question: 'What is "Dharma" most closely translated to?',
        options: [
          'Religion',
          'Righteous duty or cosmic law',
          'Meditation practice',
          'Temple worship'
        ],
        correctAnswer: 1,
        explanation: 'Dharma encompasses righteous duty, moral law, and the cosmic order that maintains the universe.'
      },
      {
        id: 5,
        question: 'Who narrated the Bhagavad Gita to Arjuna?',
        options: ['Brahma', 'Shiva', 'Krishna', 'Vishnu'],
        correctAnswer: 2,
        explanation: 'Lord Krishna narrated the Bhagavad Gita to Arjuna on the battlefield of Kurukshetra.'
      },
      {
        id: 6,
        question: 'What is the Eightfold Path associated with?',
        options: ['Hinduism', 'Buddhism', 'Jainism', 'Sikhism'],
        correctAnswer: 1,
        explanation: 'The Noble Eightfold Path is a core teaching of Buddhism, outlining the path to liberation from suffering.'
      },
      {
        id: 7,
        question: 'What does "Karma" literally mean?',
        options: ['Fate', 'Luck', 'Action', 'Punishment'],
        correctAnswer: 2,
        explanation: 'Karma literally means "action" or "deed" in Sanskrit. It refers to the principle that every action has consequences.'
      },
      {
        id: 8,
        question: 'Which of these is one of the four Vedas?',
        options: ['Bhagavad Gita', 'Rig Veda', 'Mahabharata', 'Ramayana'],
        correctAnswer: 1,
        explanation: 'The Rig Veda is one of the four Vedas, which are the oldest sacred texts of Hinduism. The four Vedas are Rig, Sama, Yajur, and Atharva.'
      }
    ]
  },
  {
    id: 'books',
    title: 'Books & Literature',
    icon: '📚',
    description: 'Challenge yourself with questions about famous books, authors, and literary concepts.',
    color: '#10b981',
    questions: [
      {
        id: 1,
        question: 'Who wrote "The Alchemist"?',
        options: ['Gabriel Garcia Marquez', 'Paulo Coelho', 'Jorge Luis Borges', 'Isabel Allende'],
        correctAnswer: 1,
        explanation: 'Paulo Coelho, a Brazilian author, wrote "The Alchemist" in 1988. It has become one of the best-selling books in history.'
      },
      {
        id: 2,
        question: '"Atomic Habits" was written by which author?',
        options: ['Cal Newport', 'James Clear', 'Charles Duhigg', 'BJ Fogg'],
        correctAnswer: 1,
        explanation: 'James Clear wrote "Atomic Habits," which explores how tiny changes in behavior can lead to remarkable results.'
      },
      {
        id: 3,
        question: 'Which book introduced the concept of "emotional intelligence"?',
        options: [
          'Thinking, Fast and Slow',
          'Emotional Intelligence by Daniel Goleman',
          'The Power of Now',
          'Mindset by Carol Dweck'
        ],
        correctAnswer: 1,
        explanation: 'Daniel Goleman\'s "Emotional Intelligence" (1995) popularized the concept and its importance in personal and professional success.'
      },
      {
        id: 4,
        question: 'Who wrote "Sapiens: A Brief History of Humankind"?',
        options: ['Jared Diamond', 'Yuval Noah Harari', 'Steven Pinker', 'Malcolm Gladwell'],
        correctAnswer: 1,
        explanation: 'Yuval Noah Harari, an Israeli historian, wrote "Sapiens" which explores the history of humankind from the Stone Age to the present.'
      },
      {
        id: 5,
        question: '"Clean Code" is a famous programming book by which author?',
        options: ['Martin Fowler', 'Robert C. Martin', 'Kent Beck', 'Donald Knuth'],
        correctAnswer: 1,
        explanation: 'Robert C. Martin (Uncle Bob) wrote "Clean Code: A Handbook of Agile Software Craftsmanship."'
      },
      {
        id: 6,
        question: 'Which book says "Be the change you wish to see in the world"?',
        options: [
          'The 7 Habits of Highly Effective People',
          'This is often attributed to Mahatma Gandhi',
          'The Art of War',
          'Man\'s Search for Meaning'
        ],
        correctAnswer: 1,
        explanation: 'This quote is commonly attributed to Mahatma Gandhi, though the exact phrasing is a paraphrase of his broader teachings.'
      },
      {
        id: 7,
        question: 'Who is the author of "Thinking, Fast and Slow"?',
        options: ['Dan Ariely', 'Daniel Kahneman', 'Nassim Taleb', 'Richard Thaler'],
        correctAnswer: 1,
        explanation: 'Daniel Kahneman, a Nobel Prize-winning psychologist, wrote "Thinking, Fast and Slow" about the two systems of thought.'
      },
      {
        id: 8,
        question: '"The Pragmatic Programmer" was co-authored by Andrew Hunt and who?',
        options: ['Robert C. Martin', 'David Thomas', 'Kent Beck', 'Martin Fowler'],
        correctAnswer: 1,
        explanation: 'David Thomas co-authored "The Pragmatic Programmer" with Andrew Hunt. It\'s a classic software development book.'
      }
    ]
  },
  {
    id: 'general',
    title: 'General Knowledge',
    icon: '🌍',
    description: 'A mix of fun and interesting questions spanning science, history, geography, and more.',
    color: '#f59e0b',
    questions: [
      {
        id: 1,
        question: 'Which planet is known as the "Red Planet"?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 1,
        explanation: 'Mars is called the Red Planet because of iron oxide (rust) on its surface, giving it a reddish appearance.'
      },
      {
        id: 2,
        question: 'What is the smallest unit of matter?',
        options: ['Molecule', 'Cell', 'Atom', 'Quark'],
        correctAnswer: 3,
        explanation: 'Quarks are the smallest known fundamental particles. They combine to form protons and neutrons within atoms.'
      },
      {
        id: 3,
        question: 'Which country has the most natural languages spoken?',
        options: ['India', 'Papua New Guinea', 'Indonesia', 'Nigeria'],
        correctAnswer: 1,
        explanation: 'Papua New Guinea has over 840 living languages, making it the most linguistically diverse country on Earth.'
      },
      {
        id: 4,
        question: 'What year was the World Wide Web invented?',
        options: ['1985', '1989', '1993', '1995'],
        correctAnswer: 1,
        explanation: 'Tim Berners-Lee invented the World Wide Web in 1989 while working at CERN.'
      },
      {
        id: 5,
        question: 'Which element has the chemical symbol "Au"?',
        options: ['Silver', 'Aluminum', 'Gold', 'Argon'],
        correctAnswer: 2,
        explanation: 'Au comes from the Latin word "Aurum" meaning gold. It has been a precious metal throughout human history.'
      },
      {
        id: 6,
        question: 'How many bones does an adult human body have?',
        options: ['186', '206', '226', '256'],
        correctAnswer: 1,
        explanation: 'An adult human body has 206 bones. Babies are born with about 270 bones, some of which fuse together as they grow.'
      },
      {
        id: 7,
        question: 'What is the longest river in the world?',
        options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
        correctAnswer: 1,
        explanation: 'The Nile River, stretching about 6,650 km through northeastern Africa, is traditionally considered the longest river in the world.'
      },
      {
        id: 8,
        question: 'Which mathematician is known as the "Father of Geometry"?',
        options: ['Pythagoras', 'Euclid', 'Archimedes', 'Aristotle'],
        correctAnswer: 1,
        explanation: 'Euclid, an ancient Greek mathematician, is known as the "Father of Geometry" for his work "Elements."'
      }
    ]
  }
];

const Quiz: React.FC = () => {
  const { user, loading, firebaseAvailable, signInWithGoogle, signInWithMicrosoft, logout, quizHistory, addQuizHistory, clearHistory } = useAuth();
  const [quizState, setQuizState] = useState<QuizState>(firebaseAvailable ? 'login' : 'categories');
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [authError, setAuthError] = useState<string>('');
  const [showHistory, setShowHistory] = useState(false);

  // Redirect to categories if already logged in (only when Firebase is configured)
  React.useEffect(() => {
    if (!firebaseAvailable) {
      if (quizState === 'login') setQuizState('categories');
      return;
    }
    if (user && quizState === 'login') {
      setQuizState('categories');
    }
    if (!user && !loading && quizState !== 'login') {
      setQuizState('login');
    }
  }, [user, loading, quizState, firebaseAvailable]);

  const getFriendlyAuthError = (error: any): string => {
    const code = error?.code || '';
    if (code === 'auth/configuration-not-found') {
      return 'This sign-in provider is not enabled yet. Please enable it in Firebase Console → Authentication → Sign-in method.';
    }
    if (code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.') {
      return 'Firebase API key is invalid. Please check your .env configuration.';
    }
    if (code === 'auth/popup-closed-by-user') {
      return 'Sign-in was cancelled. Please try again.';
    }
    if (code === 'auth/popup-blocked') {
      return 'Pop-up was blocked by your browser. Please allow pop-ups and try again.';
    }
    if (code === 'auth/network-request-failed') {
      return 'Network error. Please check your internet connection and try again.';
    }
    return error?.message || 'Sign-in failed. Please try again.';
  };

  const handleGoogleSignIn = async () => {
    setAuthError('');
    try {
      await signInWithGoogle();
    } catch (error: any) {
      setAuthError(getFriendlyAuthError(error));
    }
  };

  const handleMicrosoftSignIn = async () => {
    setAuthError('');
    try {
      await signInWithMicrosoft();
    } catch (error: any) {
      setAuthError(getFriendlyAuthError(error));
    }
  };

  const handleLogout = async () => {
    await logout();
    setQuizState('login');
  };

  const startQuiz = useCallback((category: QuizCategory) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(category.questions.length).fill(null));
    setShowExplanation(false);
    setQuizState('quiz');
  }, []);

  const selectAnswer = useCallback((answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswers(prev => {
      const updated = [...prev];
      updated[currentQuestionIndex] = answerIndex;
      return updated;
    });
    setShowExplanation(true);
  }, [showExplanation, currentQuestionIndex]);

  const nextQuestion = useCallback(() => {
    if (!selectedCategory) return;
    setShowExplanation(false);
    if (currentQuestionIndex < selectedCategory.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Save to history before showing results
      const score = selectedCategory.questions.reduce((s, q, i) => {
        return s + (selectedAnswers[i] === q.correctAnswer ? 1 : 0);
      }, 0);
      addQuizHistory({
        categoryId: selectedCategory.id,
        categoryTitle: selectedCategory.title,
        categoryIcon: selectedCategory.icon,
        score,
        totalQuestions: selectedCategory.questions.length,
        percentage: Math.round((score / selectedCategory.questions.length) * 100),
      });
      setQuizState('results');
    }
  }, [selectedCategory, currentQuestionIndex, selectedAnswers, addQuizHistory]);

  const goBackToCategories = useCallback(() => {
    setQuizState('categories');
    setSelectedCategory(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowExplanation(false);
  }, []);

  const retryQuiz = useCallback(() => {
    if (selectedCategory) {
      startQuiz(selectedCategory);
    }
  }, [selectedCategory, startQuiz]);

  const getScore = (): number => {
    if (!selectedCategory) return 0;
    return selectedCategory.questions.reduce((score, question, index) => {
      return score + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScorePercentage = (): number => {
    if (!selectedCategory) return 0;
    return Math.round((getScore() / selectedCategory.questions.length) * 100);
  };

  const getResultMessage = (): { emoji: string; title: string; message: string } => {
    const percentage = getScorePercentage();
    if (percentage === 100) return { emoji: '🏆', title: 'Perfect Score!', message: 'Outstanding! You\'re a true expert!' };
    if (percentage >= 75) return { emoji: '🌟', title: 'Excellent!', message: 'Great job! You really know your stuff!' };
    if (percentage >= 50) return { emoji: '👍', title: 'Good Effort!', message: 'Not bad! Keep learning and you\'ll improve!' };
    if (percentage >= 25) return { emoji: '📖', title: 'Keep Learning!', message: 'There\'s room for improvement. Don\'t give up!' };
    return { emoji: '💪', title: 'Don\'t Give Up!', message: 'Every expert was once a beginner. Try again!' };
  };

  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getUserDisplayName = (): string => {
    if (!user) return '';
    return user.displayName || user.email || 'User';
  };

  const getUserPhoto = (): string | null => {
    return user?.photoURL || null;
  };

  // User bar shown during quiz and categories (only when logged in)
  const renderUserBar = () => {
    if (!firebaseAvailable || !user) return null;
    return (
      <div className="quiz-user-bar">
        <div className="user-info-row">
          {getUserPhoto() ? (
            <img src={getUserPhoto()!} alt="Avatar" className="user-avatar" referrerPolicy="no-referrer" />
          ) : (
            <div className="user-avatar-placeholder">
              {getUserDisplayName().charAt(0).toUpperCase()}
            </div>
          )}
          <div className="user-details">
            <span className="user-name">{getUserDisplayName()}</span>
            {user?.email && <span className="user-email">{user.email}</span>}
          </div>
        </div>
        <div className="user-actions">
          <button
            className="history-toggle-btn"
            onClick={() => setShowHistory(!showHistory)}
            title="Quiz History"
          >
            📊 History {quizHistory.length > 0 && <span className="history-badge">{quizHistory.length}</span>}
          </button>
          <button className="logout-btn" onClick={handleLogout} title="Sign Out">
            Sign Out
          </button>
        </div>
      </div>
    );
  };

  // History sidebar/panel
  const renderHistoryPanel = () => (
    <div className={`history-panel ${showHistory ? 'open' : ''}`}>
      <div className="history-panel-header">
        <h3>📊 Quiz History</h3>
        <button className="history-close-btn" onClick={() => setShowHistory(false)}>✕</button>
      </div>
      {quizHistory.length === 0 ? (
        <div className="history-empty">
          <span className="history-empty-icon">📝</span>
          <p>No quizzes completed yet.</p>
          <p className="history-empty-sub">Take a quiz to see your results here!</p>
        </div>
      ) : (
        <>
          <div className="history-stats">
            <div className="history-stat">
              <span className="stat-number">{quizHistory.length}</span>
              <span className="stat-label">Quizzes Taken</span>
            </div>
            <div className="history-stat">
              <span className="stat-number">
                {Math.round(quizHistory.reduce((sum, h) => sum + h.percentage, 0) / quizHistory.length)}%
              </span>
              <span className="stat-label">Avg Score</span>
            </div>
            <div className="history-stat">
              <span className="stat-number">
                {Math.max(...quizHistory.map(h => h.percentage))}%
              </span>
              <span className="stat-label">Best Score</span>
            </div>
          </div>
          <div className="history-list">
            {quizHistory.map((entry) => (
              <div key={entry.id} className="history-entry">
                <div className="history-entry-icon">{entry.categoryIcon}</div>
                <div className="history-entry-info">
                  <span className="history-entry-title">{entry.categoryTitle}</span>
                  <span className="history-entry-date">{formatDate(entry.completedAt)}</span>
                </div>
                <div className={`history-entry-score ${entry.percentage >= 75 ? 'great' : entry.percentage >= 50 ? 'good' : 'low'}`}>
                  {entry.score}/{entry.totalQuestions}
                  <span className="history-entry-pct">{entry.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
          <button className="clear-history-btn" onClick={clearHistory}>
            🗑️ Clear History
          </button>
        </>
      )}
    </div>
  );

  // Login Screen
  const renderLogin = () => (
    <div className="quiz-login-view">
      <div className="login-card">
        <div className="login-icon">🧩</div>
        <h1>Quiz Challenge</h1>
        <p className="login-subtitle">
          Sign in to start taking quizzes, track your scores, and view your history.
        </p>

        {authError && (
          <div className="auth-error">
            <span>⚠️</span> {authError}
          </div>
        )}

        <div className="login-buttons">
          <button className="login-btn google-btn" onClick={handleGoogleSignIn}>
            <svg className="login-provider-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>

          <button className="login-btn microsoft-btn" onClick={handleMicrosoftSignIn}>
            <svg className="login-provider-icon" viewBox="0 0 24 24" width="20" height="20">
              <rect fill="#F25022" x="1" y="1" width="10" height="10"/>
              <rect fill="#7FBA00" x="13" y="1" width="10" height="10"/>
              <rect fill="#00A4EF" x="1" y="13" width="10" height="10"/>
              <rect fill="#FFB900" x="13" y="13" width="10" height="10"/>
            </svg>
            Sign in with Microsoft
          </button>
        </div>

        <p className="login-note">
          🔒 We only use your name and email for the quiz experience. No data is shared externally.
        </p>
      </div>
    </div>
  );

  // Category Selection Screen
  const renderCategories = () => (
    <div className="quiz-categories-view">
      {renderUserBar()}

      <section className="quiz-hero">
        <h1>Quiz Challenge</h1>
        <p className="lead">
          {user
            ? <>Welcome, <strong>{getUserDisplayName()}</strong>! Choose a category and test your knowledge.</>
            : <>Choose a category and test your knowledge! Each quiz has 8 questions with instant feedback.</>
          }
        </p>
      </section>

      <div className="quiz-main-area">
        <div className="categories-grid">
          {quizCategories.map(category => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => startQuiz(category)}
              style={{ '--category-color': category.color } as React.CSSProperties}
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <div className="category-meta">
                <span className="question-count">{category.questions.length} Questions</span>
                <span className="start-label">Start Quiz →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {renderHistoryPanel()}
      {showHistory && <div className="history-overlay" onClick={() => setShowHistory(false)} />}
    </div>
  );

  // Active Quiz Screen
  const renderQuiz = () => {
    if (!selectedCategory) return null;
    const question = selectedCategory.questions[currentQuestionIndex];
    const selectedAnswer = selectedAnswers[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / selectedCategory.questions.length) * 100;

    return (
      <div className="quiz-active-view">
        {renderUserBar()}

        <div className="quiz-header-bar">
          <button className="back-btn" onClick={goBackToCategories}>
            ← Categories
          </button>
          <div className="quiz-info">
            <span className="category-badge" style={{ backgroundColor: selectedCategory.color }}>
              {selectedCategory.icon} {selectedCategory.title}
            </span>
          </div>
          <span className="question-counter">
            {currentQuestionIndex + 1} / {selectedCategory.questions.length}
          </span>
        </div>

        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%`, backgroundColor: selectedCategory.color }}
          />
        </div>

        <div className="question-card">
          <h2 className="question-text">{question.question}</h2>
          <div className="options-list">
            {question.options.map((option, index) => {
              let optionClass = 'option-btn';
              if (showExplanation) {
                if (index === question.correctAnswer) {
                  optionClass += ' correct';
                } else if (index === selectedAnswer && index !== question.correctAnswer) {
                  optionClass += ' incorrect';
                } else {
                  optionClass += ' dimmed';
                }
              } else if (selectedAnswer === index) {
                optionClass += ' selected';
              }

              return (
                <button
                  key={index}
                  className={optionClass}
                  onClick={() => selectAnswer(index)}
                  disabled={showExplanation}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="option-text">{option}</span>
                  {showExplanation && index === question.correctAnswer && (
                    <span className="option-icon">✓</span>
                  )}
                  {showExplanation && index === selectedAnswer && index !== question.correctAnswer && (
                    <span className="option-icon">✗</span>
                  )}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className={`explanation-box ${selectedAnswer === question.correctAnswer ? 'correct' : 'incorrect'}`}>
              <div className="explanation-header">
                {selectedAnswer === question.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
              </div>
              <p>{question.explanation}</p>
            </div>
          )}

          {showExplanation && (
            <button className="next-btn" onClick={nextQuestion}>
              {currentQuestionIndex < selectedCategory.questions.length - 1
                ? 'Next Question →'
                : 'See Results 🎉'}
            </button>
          )}
        </div>

        {renderHistoryPanel()}
        {showHistory && <div className="history-overlay" onClick={() => setShowHistory(false)} />}
      </div>
    );
  };

  // Results Screen
  const renderResults = () => {
    if (!selectedCategory) return null;
    const score = getScore();
    const percentage = getScorePercentage();
    const result = getResultMessage();

    return (
      <div className="quiz-results-view">
        {renderUserBar()}

        <div className="results-card">
          <div className="results-emoji">{result.emoji}</div>
          <h1>{result.title}</h1>
          <p className="results-message">{result.message}</p>

          <div className="score-circle-container">
            <div className="score-circle" style={{ '--score-color': selectedCategory.color } as React.CSSProperties}>
              <svg viewBox="0 0 120 120" className="score-ring">
                <circle cx="60" cy="60" r="54" className="score-ring-bg" />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  className="score-ring-fill"
                  style={{
                    strokeDasharray: `${(percentage / 100) * 339.292} 339.292`,
                    stroke: selectedCategory.color
                  }}
                />
              </svg>
              <div className="score-text">
                <span className="score-number">{percentage}%</span>
                <span className="score-detail">{score}/{selectedCategory.questions.length}</span>
              </div>
            </div>
          </div>

          <div className="results-breakdown">
            <h2>Question Breakdown</h2>
            <div className="breakdown-list">
              {selectedCategory.questions.map((question, index) => {
                const isCorrect = selectedAnswers[index] === question.correctAnswer;
                return (
                  <div key={index} className={`breakdown-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="breakdown-status">
                      {isCorrect ? '✅' : '❌'}
                    </div>
                    <div className="breakdown-content">
                      <p className="breakdown-question">Q{index + 1}: {question.question}</p>
                      {!isCorrect && (
                        <p className="breakdown-answer">
                          Correct answer: <strong>{question.options[question.correctAnswer]}</strong>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="results-actions">
            <button className="retry-btn" onClick={retryQuiz}>
              🔄 Retry Quiz
            </button>
            <button className="categories-btn" onClick={goBackToCategories}>
              📋 All Categories
            </button>
          </div>
        </div>

        {renderHistoryPanel()}
        {showHistory && <div className="history-overlay" onClick={() => setShowHistory(false)} />}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="quiz-page">
        <div className="container">
          <div className="quiz-loading">
            <div className="loading-spinner" />
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="container">
        {quizState === 'login' && renderLogin()}
        {quizState === 'categories' && renderCategories()}
        {quizState === 'quiz' && renderQuiz()}
        {quizState === 'results' && renderResults()}
      </div>
    </div>
  );
};

export default Quiz;
