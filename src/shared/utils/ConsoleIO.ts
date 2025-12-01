import * as readline from "readline";

export class ConsoleIO {
  private static instance: ConsoleIO;
  private rl: readline.Interface;

  private constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  static getInstance(): ConsoleIO {
    if (!ConsoleIO.instance) {
      ConsoleIO.instance = new ConsoleIO();
    }
    return ConsoleIO.instance;
  }

  question(query: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(query, (answer) => {
        resolve(answer);
      });
    });
  }

  print(message: string): void {
    console.log(message);
  }

  clear(): void {
    console.clear();
  }

  close(): void {
    this.rl.close();
  }
}
