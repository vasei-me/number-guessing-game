"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayRoundUseCase = void 0;
class PlayRoundUseCase {
    constructor(gameRepository, timerService, startGameUseCase, makeGuessUseCase) {
        this.gameRepository = gameRepository;
        this.timerService = timerService;
        this.startGameUseCase = startGameUseCase;
        this.makeGuessUseCase = makeGuessUseCase;
    }
    async execute(difficulty, guesses, userId) {
        const timerId = `round_${Date.now()}`;
        this.timerService.start(timerId);
        try {
            const game = await this.startGameUseCase.execute(difficulty, userId);
            let roundResult = {
                gameId: game.id,
                isWin: false,
                secretNumber: game.secretNumber,
                attempts: 0,
                timeTaken: 0,
                difficulty: game.difficulty,
            };
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
            };
        }
        catch (error) {
            this.timerService.stop(timerId);
            throw error;
        }
    }
}
exports.PlayRoundUseCase = PlayRoundUseCase;
