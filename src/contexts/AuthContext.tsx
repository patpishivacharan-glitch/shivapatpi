import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  User,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirebaseAuth, googleProvider, microsoftProvider, isFirebaseConfigured } from '../firebase';

export interface QuizHistoryEntry {
  id: string;
  categoryId: string;
  categoryTitle: string;
  categoryIcon: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string; // ISO date string
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  firebaseAvailable: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithMicrosoft: () => Promise<void>;
  logout: () => Promise<void>;
  quizHistory: QuizHistoryEntry[];
  addQuizHistory: (entry: Omit<QuizHistoryEntry, 'id' | 'completedAt'>) => void;
  clearHistory: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const HISTORY_STORAGE_KEY = 'quiz_history';

function getStoredHistory(uid: string): QuizHistoryEntry[] {
  try {
    const raw = localStorage.getItem(`${HISTORY_STORAGE_KEY}_${uid}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setStoredHistory(uid: string, history: QuizHistoryEntry[]) {
  localStorage.setItem(`${HISTORY_STORAGE_KEY}_${uid}`, JSON.stringify(history));
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [quizHistory, setQuizHistory] = useState<QuizHistoryEntry[]>([]);
  const firebaseAvailable = isFirebaseConfigured();

  useEffect(() => {
    if (!firebaseAvailable) {
      setLoading(false);
      return;
    }
    try {
      const auth = getFirebaseAuth();
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
        if (firebaseUser) {
          setQuizHistory(getStoredHistory(firebaseUser.uid));
        } else {
          setQuizHistory([]);
        }
        setLoading(false);
      });
      return unsubscribe;
    } catch (error) {
      console.error('Firebase init error:', error);
      setLoading(false);
    }
  }, [firebaseAvailable]);

  const signInWithGoogle = useCallback(async () => {
    try {
      const auth = getFirebaseAuth();
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  }, []);

  const signInWithMicrosoft = useCallback(async () => {
    try {
      const auth = getFirebaseAuth();
      await signInWithPopup(auth, microsoftProvider);
    } catch (error: any) {
      console.error('Microsoft sign-in error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const auth = getFirebaseAuth();
      await signOut(auth);
    } catch (error: any) {
      console.error('Sign-out error:', error);
    }
  }, []);

  const addQuizHistory = useCallback(
    (entry: Omit<QuizHistoryEntry, 'id' | 'completedAt'>) => {
      if (!user) return;
      const newEntry: QuizHistoryEntry = {
        ...entry,
        id: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        completedAt: new Date().toISOString(),
      };
      setQuizHistory((prev) => {
        const updated = [newEntry, ...prev];
        setStoredHistory(user.uid, updated);
        return updated;
      });
    },
    [user]
  );

  const clearHistory = useCallback(() => {
    if (!user) return;
    setQuizHistory([]);
    setStoredHistory(user.uid, []);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        firebaseAvailable,
        signInWithGoogle,
        signInWithMicrosoft,
        logout,
        quizHistory,
        addQuizHistory,
        clearHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
