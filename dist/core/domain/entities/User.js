"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, score = 0, gamesPlayed = 0, gamesWon = 0) {
        this.id = id;
        this.name = name;
        this.score = score;
        this.gamesPlayed = gamesPlayed;
        this.gamesWon = gamesWon;
    }
    addGameResult(isWin, scoreIncrement = 0) {
        this.gamesPlayed++;
        if (isWin) {
            this.gamesWon++;
            this.score += scoreIncrement;
        }
    }
    getWinRate() {
        return this.gamesPlayed > 0 ? (this.gamesWon / this.gamesPlayed) * 100 : 0;
    }
}
exports.User = User;
