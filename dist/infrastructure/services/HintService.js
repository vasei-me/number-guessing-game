"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HintService = void 0;
class HintService {
    getHint(game, lastGuess) {
        const attempts = game.getAttempts();
        const maxAttempts = game.maxAttempts;
        const secretNumber = game.secretNumber;
        if (attempts >= maxAttempts - 1) {
            const parity = secretNumber % 2 === 0 ? "زوج" : "فرد";
            const range = this.getRangeHint(secretNumber);
            return `عدد ${parity} است و ${range}`;
        }
        if (attempts >= Math.floor(maxAttempts / 2)) {
            const difference = Math.abs(lastGuess - secretNumber);
            if (difference > 50) {
                return "خیلی دور هستی!";
            }
            else if (difference > 25) {
                return "هنوز فاصله داری!";
            }
            else if (difference > 10) {
                return "نزدیک شدی!";
            }
            else {
                return "خیلی نزدیک شدی!";
            }
        }
        return "";
    }
    getRangeHint(number) {
        if (number <= 25)
            return "در ربع اول است (۱-۲۵)";
        if (number <= 50)
            return "در ربع دوم است (۲۶-۵۰)";
        if (number <= 75)
            return "در ربع سوم است (۵۱-۷۵)";
        return "در ربع چهارم است (۷۶-۱۰۰)";
    }
}
exports.HintService = HintService;
