import { Game } from "../../core/domain/entities/Game";

export class HintService {
  getHint(game: Game, lastGuess: number): string {
    const attempts = game.getAttempts();
    const maxAttempts = game.maxAttempts;
    const secretNumber = game.secretNumber;

    if (attempts >= maxAttempts - 1) {
      // Last attempt hint
      const parity = secretNumber % 2 === 0 ? "زوج" : "فرد";
      const range = this.getRangeHint(secretNumber);
      return `عدد ${parity} است و ${range}`;
    }

    if (attempts >= Math.floor(maxAttempts / 2)) {
      // Mid-game hint
      const difference = Math.abs(lastGuess - secretNumber);

      if (difference > 50) {
        return "خیلی دور هستی!";
      } else if (difference > 25) {
        return "هنوز فاصله داری!";
      } else if (difference > 10) {
        return "نزدیک شدی!";
      } else {
        return "خیلی نزدیک شدی!";
      }
    }

    return "";
  }

  private getRangeHint(number: number): string {
    if (number <= 25) return "در ربع اول است (۱-۲۵)";
    if (number <= 50) return "در ربع دوم است (۲۶-۵۰)";
    if (number <= 75) return "در ربع سوم است (۵۱-۷۵)";
    return "در ربع چهارم است (۷۶-۱۰۰)";
  }
}
