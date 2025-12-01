import { MakeGuessUseCase } from "./core/application/use-cases/MakeGuessUseCase";
import { StartGameUseCase } from "./core/application/use-cases/StartGameUseCase";
import { CLIController } from "./infrastructure/controllers/CLIController";
import { InMemoryGameRepository } from "./infrastructure/repositories/InMemoryGameRepository";
import { HintService } from "./infrastructure/services/HintService";
import { RandomNumberService } from "./infrastructure/services/RandomNumberService";
import { TimerService } from "./infrastructure/services/TimerService";
import { ConsoleIO } from "./shared/utils/ConsoleIO";

async function main() {
  try {
    console.log("🚀 Starting Number Guessing Game...\n");

    // Initialize all dependencies
    const consoleIO = ConsoleIO.getInstance();
    const randomNumberService = new RandomNumberService();
    const hintService = new HintService();
    const timerService = new TimerService();
    const gameRepository = new InMemoryGameRepository();

    // Initialize use cases
    const startGameUseCase = new StartGameUseCase(
      gameRepository,
      randomNumberService
    );
    const makeGuessUseCase = new MakeGuessUseCase(gameRepository, hintService);

    // Initialize and start CLI controller
    const cliController = new CLIController(startGameUseCase, makeGuessUseCase);
    await cliController.start();
  } catch (error) {
    console.error("❌ Error starting game:", error);
    process.exit(1);
  }
}

// Run the application
if (require.main === module) {
  main();
}
