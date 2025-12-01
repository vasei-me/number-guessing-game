"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
class GameController {
    constructor(startGameUseCase, makeGuessUseCase) {
        this.startGameUseCase = startGameUseCase;
        this.makeGuessUseCase = makeGuessUseCase;
    }
    async startGame(difficulty, userId) {
        const game = await this.startGameUseCase.execute(difficulty, userId);
        return {
            success: true,
            message: "Game started successfully",
            data: {
                gameId: game.id,
                difficulty: game.difficulty,
                maxAttempts: game.maxAttempts,
                secretNumber: "hidden",
            },
        };
    }
    async makeGuess(gameId, guess) {
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
exports.GameController = GameController;
