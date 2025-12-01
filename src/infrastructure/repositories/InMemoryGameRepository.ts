import fs from "fs";
import path from "path";
import { Game } from "../../core/domain/entities/Game";
import {
  GameStats,
  IGameRepository,
} from "../../core/domain/repositories/GameRepository";
import { DifficultyLevel } from "../../core/domain/value-objects/DifficultyLevel";

export class InMemoryGameRepository implements IGameRepository {
  private games: Map<string, Game> = new Map();
  private dataPath: string;

  constructor() {
    this.dataPath = process.env.DATA_PATH || "/app/data/games.json";
    this.loadData();
  }

  private loadData(): void {
    try {
      if (fs.existsSync(this.dataPath)) {
        const data = fs.readFileSync(this.dataPath, "utf8");
        const gamesData: Game[] = JSON.parse(data);

        gamesData.forEach((gameData) => {
          const game = this.deserializeGame(gameData);
          if (game) {
            this.games.set(game.id, game);
          }
        });
      }
    } catch (error) {
      console.log("No existing data found, starting fresh");
    }
  }

  private saveData(): void {
    try {
      const dir = path.dirname(this.dataPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const gamesArray = Array.from(this.games.values());
      fs.writeFileSync(this.dataPath, JSON.stringify(gamesArray, null, 2));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

  private deserializeGame(data: any): Game | null {
    try {
      return Object.assign(Object.create(Game.prototype), data);
    } catch (error) {
      console.error("Error deserializing game:", error);
      return null;
    }
  }

  async save(game: Game): Promise<Game> {
    this.games.set(game.id, game);
    this.saveData();
    return game;
  }

  async findById(id: string): Promise<Game | null> {
    return this.games.get(id) || null;
  }

  async update(game: Game): Promise<Game> {
    this.games.set(game.id, game);
    this.saveData();
    return game;
  }

  async delete(id: string): Promise<void> {
    this.games.delete(id);
    this.saveData();
  }

  async getHighScore(difficulty: DifficultyLevel): Promise<number> {
    const games = Array.from(this.games.values()).filter(
      (g) => g.difficulty === difficulty && g.getResult().result === "win"
    );

    if (games.length === 0) return 0;

    return Math.min(...games.map((g) => g.getAttempts()));
  }

  async getUserStats(userId?: string): Promise<GameStats> {
    let games = Array.from(this.games.values());

    if (userId) {
      games = games.filter((g) => g.userId === userId);
    }

    const totalGames = games.length;
    const wins = games.filter((g) => g.getResult().result === "win").length;
    const wonGames = games.filter((g) => g.getResult().result === "win");
    const bestScore =
      wonGames.length > 0
        ? Math.min(...wonGames.map((g) => g.getAttempts()))
        : 0;
    const averageTime =
      totalGames > 0
        ? games.reduce((sum, g) => sum + g.getTimeTaken(), 0) / totalGames
        : 0;

    return { totalGames, wins, bestScore, averageTime };
  }

  async getRecentGames(limit: number): Promise<Game[]> {
    const games = Array.from(this.games.values());
    return games
      .sort((a, b) => b.getResult().timeTaken - a.getResult().timeTaken)
      .slice(0, limit);
  }
}
