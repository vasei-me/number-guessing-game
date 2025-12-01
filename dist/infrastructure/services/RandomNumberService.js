"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomNumberService = void 0;
class RandomNumberService {
    generate(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    generateInRange() {
        return this.generate(1, 100);
    }
}
exports.RandomNumberService = RandomNumberService;
