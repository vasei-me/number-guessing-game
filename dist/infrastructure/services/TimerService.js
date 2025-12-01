"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerService = void 0;
class TimerService {
    constructor() {
        this.timers = new Map();
    }
    start(timerId) {
        this.timers.set(timerId, new Date());
    }
    stop(timerId) {
        const startTime = this.timers.get(timerId);
        if (!startTime)
            return 0;
        const endTime = new Date();
        this.timers.delete(timerId);
        return Math.round((endTime.getTime() - startTime.getTime()) / 1000);
    }
    getElapsedTime(timerId) {
        const startTime = this.timers.get(timerId);
        if (!startTime)
            return 0;
        return Math.round((new Date().getTime() - startTime.getTime()) / 1000);
    }
}
exports.TimerService = TimerService;
