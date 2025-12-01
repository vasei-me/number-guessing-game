export const GameConfig = {
  MIN_NUMBER: 1,
  MAX_NUMBER: 100,
  DIFFICULTY_ATTEMPTS: {
    easy: 10,
    medium: 5,
    hard: 3,
  },
  HINT_THRESHOLD: 2,
  MAX_HINTS: 3,
} as const;

export type DifficultyKey = keyof typeof GameConfig.DIFFICULTY_ATTEMPTS;
