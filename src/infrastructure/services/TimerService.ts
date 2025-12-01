export class TimerService {
  private timers: Map<string, Date> = new Map();

  start(timerId: string): void {
    this.timers.set(timerId, new Date());
  }

  stop(timerId: string): number {
    const startTime = this.timers.get(timerId);
    if (!startTime) return 0;

    const endTime = new Date();
    this.timers.delete(timerId);

    return Math.round((endTime.getTime() - startTime.getTime()) / 1000);
  }

  getElapsedTime(timerId: string): number {
    const startTime = this.timers.get(timerId);
    if (!startTime) return 0;

    return Math.round((new Date().getTime() - startTime.getTime()) / 1000);
  }
}
