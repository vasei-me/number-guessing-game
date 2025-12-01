export enum GameResult {
  WIN = "win",
  LOSE = "lose",
  IN_PROGRESS = "in_progress",
}

export class GameResultVO {
  constructor(
    public readonly result: GameResult,
    public readonly attempts: number,
    public readonly secretNumber: number,
    public readonly timeTaken: number
  ) {}

  static win(
    attempts: number,
    secretNumber: number,
    timeTaken: number
  ): GameResultVO {
    return new GameResultVO(GameResult.WIN, attempts, secretNumber, timeTaken);
  }

  static lose(secretNumber: number, timeTaken: number): GameResultVO {
    return new GameResultVO(GameResult.LOSE, 0, secretNumber, timeTaken);
  }

  static inProgress(): GameResultVO {
    return new GameResultVO(GameResult.IN_PROGRESS, 0, 0, 0);
  }
}
