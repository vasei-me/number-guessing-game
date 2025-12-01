export class RandomNumberService {
  generate(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateInRange(): number {
    return this.generate(1, 100);
  }
}
