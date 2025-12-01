import { DifficultyLevel } from "../value-objects/DifficultyLevel";
import { GameResultVO } from "../value-objects/GameResult";
import { Guess } from "./Guess";

export class Game {
  private guesses: Guess[] = [];
  private startTime: Date;
  private endTime?: Date;

  constructor(
    public readonly id: string,
    public readonly secretNumber: number,
    public readonly maxAttempts: number,
    public readonly difficulty: DifficultyLevel,
    public readonly userId?: string
  ) {
    this.startTime = new Date();
  }

  makeGuess(guessNumber: number, hint?: string): GuessResult {
    const guess = new Guess(guessNumber, new Date(), hint);
    this.guesses.push(guess);

    if (guess.isCorrect(this.secretNumber)) {
      this.endTime = new Date();
      return { isCorrect: true, hint };
    }

    if (this.getRemainingAttempts() <= 0) {
      this.endTime = new Date();
      return { isCorrect: false, hint, isGameOver: true };
    }

    return {
      isCorrect: false,
      hint,
      isHigher: guessNumber > this.secretNumber,
      isGameOver: false,
    };
  }

  getAttempts(): number {
    return this.guesses.length;
  }

  getRemainingAttempts(): number {
    return this.maxAttempts - this.guesses.length;
  }

  getGuesses(): ReadonlyArray<Guess> {
    return [...this.guesses];
  }

  getTimeTaken(): number {
    const end = this.endTime || new Date();
    return Math.round((end.getTime() - this.startTime.getTime()) / 1000);
  }

  getResult(): GameResultVO {
    const lastGuess = this.guesses[this.guesses.length - 1];
    const isWon = lastGuess?.isCorrect(this.secretNumber) || false;
    const timeTaken = this.getTimeTaken();

    if (isWon) {
      return GameResultVO.win(
        this.guesses.length,
        this.secretNumber,
        timeTaken
      );
    }

    if (this.getRemainingAttempts() <= 0) {
      return GameResultVO.lose(this.secretNumber, timeTaken);
    }

    return GameResultVO.inProgress();
  }
}

export interface GuessResult {
  isCorrect: boolean;
  hint?: string;
  isHigher?: boolean;
  isGameOver?: boolean;
}
