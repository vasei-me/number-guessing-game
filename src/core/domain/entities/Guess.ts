export class Guess {
  constructor(
    public readonly number: number,
    public readonly timestamp: Date = new Date(),
    public readonly hint?: string
  ) {}

  isCorrect(secretNumber: number): boolean {
    return this.number === secretNumber;
  }

  getDifference(secretNumber: number): number {
    return Math.abs(this.number - secretNumber);
  }
}
