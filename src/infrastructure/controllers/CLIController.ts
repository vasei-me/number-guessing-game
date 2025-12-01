import { MakeGuessUseCase } from "../../core/application/use-cases/MakeGuessUseCase";
import { StartGameUseCase } from "../../core/application/use-cases/StartGameUseCase";
import {
  Difficulty,
  DifficultyLevel,
} from "../../core/domain/value-objects/DifficultyLevel";
import { ConsoleIO } from "../../shared/utils/ConsoleIO";

export class CLIController {
  private consoleIO = ConsoleIO.getInstance();

  constructor(
    private readonly startGameUseCase: StartGameUseCase,
    private readonly makeGuessUseCase: MakeGuessUseCase
  ) {}

  async start(): Promise<void> {
    await this.showWelcomeMessage();

    let playAgain = true;
    while (playAgain) {
      await this.playGame();
      playAgain = await this.askPlayAgain();
    }

    this.consoleIO.print("بازی به پایان رسید. خداحافظ!");
    this.consoleIO.close();
  }

  private async showWelcomeMessage(): Promise<void> {
    this.consoleIO.clear();
    this.consoleIO.print("\x1b[36m🎮 بازی حدس عدد خوش آمدید!\x1b[0m");
    this.consoleIO.print("من به یک عدد بین ۱ تا ۱۰۰ فکر کرده‌ام.");
    this.consoleIO.print("سطح دشواری را انتخاب کنید:");
    this.consoleIO.print("۱. آسان (۱۰ فرصت)");
    this.consoleIO.print("۲. متوسط (۵ فرصت)");
    this.consoleIO.print("۳. سخت (۳ فرصت)");
  }

  private async playGame(): Promise<void> {
    const difficulty = await this.selectDifficulty();
    const game = await this.startGameUseCase.execute(difficulty);

    this.consoleIO.print(
      `\nسطح ${Difficulty.getDisplayName(difficulty)} انتخاب شد.`
    );
    this.consoleIO.print(`شما ${game.maxAttempts} فرصت دارید.\n`);

    await this.guessingLoop(game.id);
  }

  private async selectDifficulty(): Promise<DifficultyLevel> {
    while (true) {
      const choice = await this.consoleIO.question("انتخاب شما (۱-۳): ");

      const difficultyMap: Record<string, DifficultyLevel> = {
        "1": DifficultyLevel.EASY,
        "۲": DifficultyLevel.EASY,
        "2": DifficultyLevel.MEDIUM,
        "۳": DifficultyLevel.MEDIUM,
        "3": DifficultyLevel.HARD,
        "۴": DifficultyLevel.HARD,
      };

      const difficulty = difficultyMap[choice];
      if (difficulty) {
        return difficulty;
      }

      this.consoleIO.print("⚠️  لطفاً عدد ۱ تا ۳ را وارد کنید.");
    }
  }

  private async guessingLoop(gameId: string): Promise<void> {
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
      } catch (error: any) {
        this.consoleIO.print(`❌ خطا: ${error.message}`);
      }
    }
  }

  private async getValidGuess(): Promise<number> {
    while (true) {
      const input = await this.consoleIO.question("حدس شما: ");
      const guess = parseInt(input);

      if (!isNaN(guess) && guess >= 1 && guess <= 100) {
        return guess;
      }

      this.consoleIO.print("⚠️  لطفاً عدد بین ۱ تا ۱۰۰ وارد کنید.");
    }
  }

  private getResultMessage(result: any): string {
    if (result.isCorrect) {
      return `✅ درست حدس زدید!`;
    }

    if (result.isHigher) {
      return `⬆️  عدد شما بزرگ‌تر از عدد مخفی است.`;
    }

    return `⬇️  عدد شما کوچک‌تر از عدد مخفی است.`;
  }

  private async askPlayAgain(): Promise<boolean> {
    const answer = await this.consoleIO.question(
      "\nآیا می‌خواهید دوباره بازی کنید؟ (ب/خیر): "
    );
    return answer.toLowerCase() === "ب" || answer.toLowerCase() === "y";
  }
}
