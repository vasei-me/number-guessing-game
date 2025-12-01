"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIController = void 0;
const DifficultyLevel_1 = require("../../core/domain/value-objects/DifficultyLevel");
const ConsoleIO_1 = require("../../shared/utils/ConsoleIO");
class CLIController {
    constructor(startGameUseCase, makeGuessUseCase) {
        this.startGameUseCase = startGameUseCase;
        this.makeGuessUseCase = makeGuessUseCase;
        this.consoleIO = ConsoleIO_1.ConsoleIO.getInstance();
    }
    async start() {
        await this.showWelcomeMessage();
        let playAgain = true;
        while (playAgain) {
            await this.playGame();
            playAgain = await this.askPlayAgain();
        }
        this.consoleIO.print("بازی به پایان رسید. خداحافظ!");
        this.consoleIO.close();
    }
    async showWelcomeMessage() {
        this.consoleIO.clear();
        this.consoleIO.print("\x1b[36m🎮 بازی حدس عدد خوش آمدید!\x1b[0m");
        this.consoleIO.print("من به یک عدد بین ۱ تا ۱۰۰ فکر کرده‌ام.");
        this.consoleIO.print("سطح دشواری را انتخاب کنید:");
        this.consoleIO.print("۱. آسان (۱۰ فرصت)");
        this.consoleIO.print("۲. متوسط (۵ فرصت)");
        this.consoleIO.print("۳. سخت (۳ فرصت)");
    }
    async playGame() {
        const difficulty = await this.selectDifficulty();
        const game = await this.startGameUseCase.execute(difficulty);
        this.consoleIO.print(`\nسطح ${DifficultyLevel_1.Difficulty.getDisplayName(difficulty)} انتخاب شد.`);
        this.consoleIO.print(`شما ${game.maxAttempts} فرصت دارید.\n`);
        await this.guessingLoop(game.id);
    }
    async selectDifficulty() {
        while (true) {
            const choice = await this.consoleIO.question("انتخاب شما (۱-۳): ");
            const difficultyMap = {
                "1": DifficultyLevel_1.DifficultyLevel.EASY,
                "۲": DifficultyLevel_1.DifficultyLevel.EASY,
                "2": DifficultyLevel_1.DifficultyLevel.MEDIUM,
                "۳": DifficultyLevel_1.DifficultyLevel.MEDIUM,
                "3": DifficultyLevel_1.DifficultyLevel.HARD,
                "۴": DifficultyLevel_1.DifficultyLevel.HARD,
            };
            const difficulty = difficultyMap[choice];
            if (difficulty) {
                return difficulty;
            }
            this.consoleIO.print("⚠️  لطفاً عدد ۱ تا ۳ را وارد کنید.");
        }
    }
    async guessingLoop(gameId) {
        while (true) {
            const guess = await this.getValidGuess();
            try {
                const result = await this.makeGuessUseCase.execute(gameId, guess);
                this.consoleIO.print("\n" + this.getResultMessage(result));
                if (result.hint) {
                    this.consoleIO.print(`💡 ${result.hint}`);
                }
                if (result.isCorrect) {
                    this.consoleIO.print(`🎉 تبریک! شما برنده شدید!`);
                    this.consoleIO.print(`⏱️  زمان بازی: ${result.timeTaken} ثانیه`);
                    break;
                }
                if (result.isGameOver) {
                    this.consoleIO.print(`💔 متأسفانه باختید!`);
                    break;
                }
                this.consoleIO.print(`فرصت باقی‌مانده: ${result.remainingAttempts}`);
            }
            catch (error) {
                this.consoleIO.print(`❌ خطا: ${error.message}`);
            }
        }
    }
    async getValidGuess() {
        while (true) {
            const input = await this.consoleIO.question("حدس شما: ");
            const guess = parseInt(input);
            if (!isNaN(guess) && guess >= 1 && guess <= 100) {
                return guess;
            }
            this.consoleIO.print("⚠️  لطفاً عدد بین ۱ تا ۱۰۰ وارد کنید.");
        }
    }
    getResultMessage(result) {
        if (result.isCorrect) {
            return `✅ درست حدس زدید!`;
        }
        if (result.isHigher) {
            return `⬆️  عدد شما بزرگ‌تر از عدد مخفی است.`;
        }
        return `⬇️  عدد شما کوچک‌تر از عدد مخفی است.`;
    }
    async askPlayAgain() {
        const answer = await this.consoleIO.question("\nآیا می‌خواهید دوباره بازی کنید؟ (ب/خیر): ");
        return answer.toLowerCase() === "ب" || answer.toLowerCase() === "y";
    }
}
exports.CLIController = CLIController;
