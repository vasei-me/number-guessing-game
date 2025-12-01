import { Game } from "../entities/Game";
import { DifficultyLevel } from "../value-objects/DifficultyLevel";

export interface GameStats {
  totalGames: number;
  wins: number;
  bestScore: number;
  averageTime: number;
}

export interface IGameRepository {
  save(game: Game): Promise<Game>;
  findById(id: string): Promise<Game | null>;
  update(game: Game): Promise<Game>;
  delete(id: string): Promise<void>;
  getHighScore(difficulty: DifficultyLevel): Promise<number>;
  getUserStats(userId?: string): Promise<GameStats>;
  getRecentGames(limit: number): Promise<Game[]>;
}
