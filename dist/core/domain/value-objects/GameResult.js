"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameResultVO = exports.GameResult = void 0;
var GameResult;
(function (GameResult) {
    GameResult["WIN"] = "win";
    GameResult["LOSE"] = "lose";
    GameResult["IN_PROGRESS"] = "in_progress";
})(GameResult || (exports.GameResult = GameResult = {}));
class GameResultVO {
    constructor(result, attempts, secretNumber, timeTaken) {
        this.result = result;
        this.attempts = attempts;
        this.secretNumber = secretNumber;
        this.timeTaken = timeTaken;
    }
    static win(attempts, secretNumber, timeTaken) {
        return new GameResultVO(GameResult.WIN, attempts, secretNumber, timeTaken);
    }
    static lose(secretNumber, timeTaken) {
        return new GameResultVO(GameResult.LOSE, 0, secretNumber, timeTaken);
    }
    static inProgress() {
        return new GameResultVO(GameResult.IN_PROGRESS, 0, 0, 0);
    }
}
exports.GameResultVO = GameResultVO;
