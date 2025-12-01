import { TimerService } from "../../../infrastructure/services/TimerService";
import { IGameRepository } from "../../domain/repositories/GameRepository";
import { MakeGuessUseCase } from "./MakeGuessUseCase";
import { StartGameUseCase } from "./StartGameUseCase";

export class PlayRoundUseCase {
  constructor(
    private readonly gameRepository: IGameRepository,
    private readonly timerService: TimerService,
    private readonly startGameUseCase: StartGameUseCase,
    private readonly makeGuessUseCase: MakeGuessUseCase
  ) {}

  async execute(
    difficulty: string,
    guesses: number[],
    userId?: string
  ): Promise<RoundResult> {
    const timerId = `round_${Date.now()}`;
    this.timerService.start(timerId);

    try {
      // Start new game
      const game = await this.startGameUseCase.execute(
        difficulty as any,
        userId
      );

      let roundResult: Partial<RoundResult> = {
        gameId: game.id,
        isWin: false,
        secretNumber: game.secretNumber,
        attempts: 0,
        timeTaken: 0,
        difficulty: game.difficulty,
      };

      // Process each guess
      for (const guess of guesses) {
        const result = await this.makeGuessUseCase.execute(game.id, guess);

        roundResult.attempts = result.attempts;
        roundResult.timeTaken = result.timeTaken;
        roundResult.isWin = result.isCorrect;

        if (result.isCorrect || result.isGameOver) {
          break;
        }
      }

      const finalTime = this.timerService.stop(timerId);

      return {
        ...roundResult,
        totalTime: finalTime,
      } as RoundResult;
    } catch (error) {
      this.timerService.stop(timerId);
      throw error;
    }
  }
}

export interface RoundResult {
  gameId: string;
  isWin: boolean;
  secretNumber: number;
  attempts: number;
  timeTaken: number;
  totalTime: number;
  difficulty: string;
}
