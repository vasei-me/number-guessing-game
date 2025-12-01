export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public score: number = 0,
    public gamesPlayed: number = 0,
    public gamesWon: number = 0
  ) {}

  addGameResult(isWin: boolean, scoreIncrement: number = 0): void {
    this.gamesPlayed++;
    if (isWin) {
      this.gamesWon++;
      this.score += scoreIncrement;
    }
  }

  getWinRate(): number {
    return this.gamesPlayed > 0 ? (this.gamesWon / this.gamesPlayed) * 100 : 0;
  }
}
