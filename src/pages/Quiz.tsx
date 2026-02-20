import React, { useState, useCallback } from 'react';
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

type QuizState = 'categories' | 'quiz' | 'results';

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
  const [quizState, setQuizState] = useState<QuizState>('categories');
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const startQuiz = useCallback((category: QuizCategory) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(category.questions.length).fill(null));
    setShowExplanation(false);
    setQuizState('quiz');
  }, []);

  const selectAnswer = useCallback((answerIndex: number) => {
    if (showExplanation) return; // Prevent changing answer after reveal
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
      setQuizState('results');
    }
  }, [selectedCategory, currentQuestionIndex]);

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

  // Category Selection Screen
  const renderCategories = () => (
    <div className="quiz-categories-view">
      <section className="quiz-hero">
        <h1>Quiz Challenge</h1>
        <p className="lead">
          Choose a category and test your knowledge! Each quiz has 8 questions 
          with instant feedback and explanations.
        </p>
      </section>

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
  );

  // Active Quiz Screen
  const renderQuiz = () => {
    if (!selectedCategory) return null;
    const question = selectedCategory.questions[currentQuestionIndex];
    const selectedAnswer = selectedAnswers[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / selectedCategory.questions.length) * 100;

    return (
      <div className="quiz-active-view">
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
      </div>
    );
  };

  return (
    <div className="quiz-page">
      <div className="container">
        {quizState === 'categories' && renderCategories()}
        {quizState === 'quiz' && renderQuiz()}
        {quizState === 'results' && renderResults()}
      </div>
    </div>
  );
};

export default Quiz;
