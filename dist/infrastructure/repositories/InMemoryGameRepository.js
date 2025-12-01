"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryGameRepository = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Game_1 = require("../../core/domain/entities/Game");
class InMemoryGameRepository {
    constructor() {
        this.games = new Map();
        this.dataPath = process.env.DATA_PATH || "/app/data/games.json";
        this.loadData();
    }
    loadData() {
        try {
            if (fs_1.default.existsSync(this.dataPath)) {
                const data = fs_1.default.readFileSync(this.dataPath, "utf8");
                const gamesData = JSON.parse(data);
                gamesData.forEach((gameData) => {
                    const game = this.deserializeGame(gameData);
                    if (game) {
                        this.games.set(game.id, game);
                    }
                });
            }
        }
        catch (error) {
            console.log("No existing data found, starting fresh");
        }
    }
    saveData() {
        try {
            const dir = path_1.default.dirname(this.dataPath);
            if (!fs_1.default.existsSync(dir)) {
                fs_1.default.mkdirSync(dir, { recursive: true });
            }
            const gamesArray = Array.from(this.games.values());
            fs_1.default.writeFileSync(this.dataPath, JSON.stringify(gamesArray, null, 2));
        }
        catch (error) {
            console.error("Error saving data:", error);
        }
    }
    deserializeGame(data) {
        try {
            return Object.assign(Object.create(Game_1.Game.prototype), data);
        }
        catch (error) {
            console.error("Error deserializing game:", error);
            return null;
        }
    }
    async save(game) {
        this.games.set(game.id, game);
        this.saveData();
        return game;
    }
    async findById(id) {
        return this.games.get(id) || null;
    }
    async update(game) {
        this.games.set(game.id, game);
        this.saveData();
        return game;
    }
    async delete(id) {
        this.games.delete(id);
        this.saveData();
    }
    async getHighScore(difficulty) {
        const games = Array.from(this.games.values()).filter((g) => g.difficulty === difficulty && g.getResult().result === "win");
        if (games.length === 0)
            return 0;
        return Math.min(...games.map((g) => g.getAttempts()));
    }
    async getUserStats(userId) {
        let games = Array.from(this.games.values());
        if (userId) {
            games = games.filter((g) => g.userId === userId);
        }
        const totalGames = games.length;
        const wins = games.filter((g) => g.getResult().result === "win").length;
        const wonGames = games.filter((g) => g.getResult().result === "win");
        const bestScore = wonGames.length > 0
            ? Math.min(...wonGames.map((g) => g.getAttempts()))
            : 0;
        const averageTime = totalGames > 0
            ? games.reduce((sum, g) => sum + g.getTimeTaken(), 0) / totalGames
            : 0;
        return { totalGames, wins, bestScore, averageTime };
    }
    async getRecentGames(limit) {
        const games = Array.from(this.games.values());
        return games
            .sort((a, b) => b.getResult().timeTaken - a.getResult().timeTaken)
            .slice(0, limit);
    }
}
exports.InMemoryGameRepository = InMemoryGameRepository;
