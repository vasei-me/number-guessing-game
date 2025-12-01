export enum DifficultyLevel {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export class Difficulty {
  static getAttempts(level: DifficultyLevel): number {
    const attemptsMap: Record<DifficultyLevel, number> = {
      [DifficultyLevel.EASY]: 10,
      [DifficultyLevel.MEDIUM]: 5,
      [DifficultyLevel.HARD]: 3,
    };
    return attemptsMap[level];
  }

  static getDisplayName(level: DifficultyLevel): string {
    const names: Record<DifficultyLevel, string> = {
      [DifficultyLevel.EASY]: "آسان",
      [DifficultyLevel.MEDIUM]: "متوسط",
      [DifficultyLevel.HARD]: "سخت",
    };
    return names[level];
  }
}
