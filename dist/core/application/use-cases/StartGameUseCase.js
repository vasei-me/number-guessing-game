"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartGameUseCase = void 0;
const Game_1 = require("../../domain/entities/Game");
const DifficultyLevel_1 = require("../../domain/value-objects/DifficultyLevel");
class StartGameUseCase {
    constructor(gameRepository, randomNumberService) {
        this.gameRepository = gameRepository;
        this.randomNumberService = randomNumberService;
    }
    async execute(difficulty, userId) {
        const secretNumber = this.randomNumberService.generateInRange();
        const maxAttempts = DifficultyLevel_1.Difficulty.getAttempts(difficulty);
        const game = new Game_1.Game(this.generateGameId(), secretNumber, maxAttempts, difficulty, userId);
        return await this.gameRepository.save(game);
    }
    generateGameId() {
        return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}
exports.StartGameUseCase = StartGameUseCase;
