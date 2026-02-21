export interface PythonQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  chapter: number;
}

export const chapterNames: Record<number, string> = {
  1: 'Python Basics',
  2: 'Control Structures',
  3: 'Functions & Modules',
  4: 'Data Structures',
  5: 'Object-Oriented Programming'
};
