// ابتدا بدون دکوریتور Injectable بنویسیم
import { Game } from "../../domain/entities/Game";
import {
  DifficultyLevel,
  Difficulty,
} from "../../domain/value-objects/DifficultyLevel";
import { IGameRepository } from "../../domain/repositories/GameRepository";
import { RandomNumberService } from "../../../infrastructure/services/RandomNumberService";

export class StartGameUseCase {
  constructor(
    private readonly gameRepository: IGameRepository,
    private readonly randomNumberService: RandomNumberService
  ) {}

  async execute(difficulty: DifficultyLevel, userId?: string): Promise<Game> {
    const secretNumber = this.randomNumberService.generateInRange();
    const maxAttempts = Difficulty.getAttempts(difficulty); // اینجا تغییر دادم

    const game = new Game(
      this.generateGameId(),
      secretNumber,
      maxAttempts,
      difficulty,
      userId
    );

    return await this.gameRepository.save(game);
  }

  private generateGameId(): string {
    return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
