import { MakeGuessUseCase } from "../../core/application/use-cases/MakeGuessUseCase";
import { StartGameUseCase } from "../../core/application/use-cases/StartGameUseCase";
import { DifficultyLevel } from "../../core/domain/value-objects/DifficultyLevel";

export class GameController {
  constructor(
    private readonly startGameUseCase: StartGameUseCase,
    private readonly makeGuessUseCase: MakeGuessUseCase
  ) {}

  async startGame(difficulty: DifficultyLevel, userId?: string) {
    const game = await this.startGameUseCase.execute(difficulty, userId);

    return {
      success: true,
      message: "Game started successfully",
      data: {
        gameId: game.id,
        difficulty: game.difficulty,
        maxAttempts: game.maxAttempts,
        secretNumber: "hidden", // Don't reveal the number
      },
    };
  }

  async makeGuess(gameId: string, guess: number) {
    const result = await this.makeGuessUseCase.execute(gameId, guess);

    const response = {
      success: true,
      data: {
        isCorrect: result.isCorrect,
        hint: result.hint,
        attempts: result.attempts,
        remainingAttempts: result.remainingAttempts,
        timeTaken: result.timeTaken,
        isGameOver: result.isGameOver,
      },
    };

    if (result.isCorrect || result.isGameOver) {
      response.data["secretNumber"] = result.game.secretNumber;
    }

    return response;
  }
}
