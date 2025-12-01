"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guess = void 0;
class Guess {
    constructor(number, timestamp = new Date(), hint) {
        this.number = number;
        this.timestamp = timestamp;
        this.hint = hint;
    }
    isCorrect(secretNumber) {
        return this.number === secretNumber;
    }
    getDifference(secretNumber) {
        return Math.abs(this.number - secretNumber);
    }
}
exports.Guess = Guess;
