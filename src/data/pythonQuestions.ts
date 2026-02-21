// 500 original Python MCQs across 5 chapters — Beginner, Intermediate & Advanced
// Each quiz session randomly selects 10 questions (2 per chapter) for variety

import { PythonQuestion } from './pythonQuestionTypes';
export type { PythonQuestion } from './pythonQuestionTypes';
export { chapterNames } from './pythonQuestionTypes';

import chapter1Questions from './pythonChapter1';
import chapter2Questions from './pythonChapter2';
import chapter3Questions from './pythonChapter3';
import chapter4Questions from './pythonChapter4';
import chapter5Questions from './pythonChapter5';

const pythonQuestionPool: PythonQuestion[] = [
  ...chapter1Questions,
  ...chapter2Questions,
  ...chapter3Questions,
  ...chapter4Questions,
  ...chapter5Questions,
];

export default pythonQuestionPool;

/**
 * Randomly selects a balanced set of questions from the 500-question pool.
 * Picks 2 questions from each of the 5 chapters (10 total) for broad coverage.
 * Within each chapter, balances difficulty levels.
 */
export function getRandomPythonQuestions(count: number = 10): PythonQuestion[] {
  const chapters = [1, 2, 3, 4, 5];
  const perChapter = Math.floor(count / chapters.length); // 2 per chapter for count=10
  const remainder = count % chapters.length;

  const shuffle = <T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const picked: PythonQuestion[] = [];

  chapters.forEach((ch, idx) => {
    const chQuestions = pythonQuestionPool.filter(q => q.chapter === ch);
    const pickCount = perChapter + (idx < remainder ? 1 : 0);
    picked.push(...shuffle(chQuestions).slice(0, pickCount));
  });

  // Re-number IDs sequentially and shuffle the final set
  return shuffle(picked).map((q, index) => ({ ...q, id: index + 1 }));
}
