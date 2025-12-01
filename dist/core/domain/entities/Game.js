"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const GameResult_1 = require("../value-objects/GameResult");
const Guess_1 = require("./Guess");
class Game {
    constructor(id, secretNumber, maxAttempts, difficulty, userId) {
        this.id = id;
        this.secretNumber = secretNumber;
        this.maxAttempts = maxAttempts;
        this.difficulty = difficulty;
        this.userId = userId;
        this.guesses = [];
        this.startTime = new Date();
    }
    makeGuess(guessNumber, hint) {
        const guess = new Guess_1.Guess(guessNumber, new Date(), hint);
        this.guesses.push(guess);
        if (guess.isCorrect(this.secretNumber)) {
            this.endTime = new Date();
            return { isCorrect: true, hint };
        }
        if (this.getRemainingAttempts() <= 0) {
            this.endTime = new Date();
            return { isCorrect: false, hint, isGameOver: true };
        }
        return {
            isCorrect: false,
            hint,
            isHigher: guessNumber > this.secretNumber,
            isGameOver: false,
        };
    }
    getAttempts() {
        return this.guesses.length;
    }
    getRemainingAttempts() {
        return this.maxAttempts - this.guesses.length;
    }
    getGuesses() {
        return [...this.guesses];
    }
    getTimeTaken() {
        const end = this.endTime || new Date();
        return Math.round((end.getTime() - this.startTime.getTime()) / 1000);
    }
    getResult() {
        const lastGuess = this.guesses[this.guesses.length - 1];
        const isWon = lastGuess?.isCorrect(this.secretNumber) || false;
        const timeTaken = this.getTimeTaken();
        if (isWon) {
            return GameResult_1.GameResultVO.win(this.guesses.length, this.secretNumber, timeTaken);
        }
        if (this.getRemainingAttempts() <= 0) {
            return GameResult_1.GameResultVO.lose(this.secretNumber, timeTaken);
        }
        return GameResult_1.GameResultVO.inProgress();
    }
}
exports.Game = Game;
