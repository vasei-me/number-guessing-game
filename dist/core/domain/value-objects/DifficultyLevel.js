"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Difficulty = exports.DifficultyLevel = void 0;
var DifficultyLevel;
(function (DifficultyLevel) {
    DifficultyLevel["EASY"] = "easy";
    DifficultyLevel["MEDIUM"] = "medium";
    DifficultyLevel["HARD"] = "hard";
})(DifficultyLevel || (exports.DifficultyLevel = DifficultyLevel = {}));
class Difficulty {
    static getAttempts(level) {
        const attemptsMap = {
            [DifficultyLevel.EASY]: 10,
            [DifficultyLevel.MEDIUM]: 5,
            [DifficultyLevel.HARD]: 3,
        };
        return attemptsMap[level];
    }
    static getDisplayName(level) {
        const names = {
            [DifficultyLevel.EASY]: "آسان",
            [DifficultyLevel.MEDIUM]: "متوسط",
            [DifficultyLevel.HARD]: "سخت",
        };
        return names[level];
    }
}
exports.Difficulty = Difficulty;
