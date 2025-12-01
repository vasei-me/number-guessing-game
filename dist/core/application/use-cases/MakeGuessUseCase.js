"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeGuessUseCase = void 0;
class MakeGuessUseCase {
    constructor(gameRepository, hintService) {
        this.gameRepository = gameRepository;
        this.hintService = hintService;
    }
    async execute(gameId, guessNumber) {
        const game = await this.gameRepository.findById(gameId);
        if (!game) {
            throw new Error("Game not found");
        }
        if (guessNumber < 1 || guessNumber > 100) {
            throw new Error("Guess must be between 1 and 100");
        }
        const hint = this.hintService.getHint(game, guessNumber);
        const result = game.makeGuess(guessNumber, hint);
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
exports.MakeGuessUseCase = MakeGuessUseCase;
