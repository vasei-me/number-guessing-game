import { HintService } from "../../../infrastructure/services/HintService";
import { Game } from "../../domain/entities/Game";
import { IGameRepository } from "../../domain/repositories/GameRepository";

export class MakeGuessUseCase {
  constructor(
    private readonly gameRepository: IGameRepository,
    private readonly hintService: HintService
  ) {}

  async execute(gameId: string, guessNumber: number): Promise<GuessResponse> {
    const game = await this.gameRepository.findById(gameId);

    if (!game) {
      throw new Error("Game not found");
    }

    // Validate guess
    if (guessNumber < 1 || guessNumber > 100) {
      throw new Error("Guess must be between 1 and 100");
    }

    // Get hint based on game state
    const hint = this.hintService.getHint(game, guessNumber);

    // Make the guess
    const result = game.makeGuess(guessNumber, hint);

    // Update game in repository
    await this.gameRepository.update(game);

    return {
      ...result,
      game,
      attempts: game.getAttempts(),
      remainingAttempts: game.getRemainingAttempts(),
      timeTaken: game.getTimeTaken(),
    };
  }
}

export interface GuessResponse {
  isCorrect: boolean;
  hint?: string;
  isHigher?: boolean;
  isGameOver?: boolean;
  game: Game;
  attempts: number;
  remainingAttempts: number;
  timeTaken: number;
}
