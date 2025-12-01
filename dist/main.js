"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MakeGuessUseCase_1 = require("./core/application/use-cases/MakeGuessUseCase");
const StartGameUseCase_1 = require("./core/application/use-cases/StartGameUseCase");
const CLIController_1 = require("./infrastructure/controllers/CLIController");
const InMemoryGameRepository_1 = require("./infrastructure/repositories/InMemoryGameRepository");
const HintService_1 = require("./infrastructure/services/HintService");
const RandomNumberService_1 = require("./infrastructure/services/RandomNumberService");
const TimerService_1 = require("./infrastructure/services/TimerService");
const ConsoleIO_1 = require("./shared/utils/ConsoleIO");
async function main() {
    try {
        console.log("🚀 Starting Number Guessing Game...\n");
        const consoleIO = ConsoleIO_1.ConsoleIO.getInstance();
        const randomNumberService = new RandomNumberService_1.RandomNumberService();
        const hintService = new HintService_1.HintService();
        const timerService = new TimerService_1.TimerService();
        const gameRepository = new InMemoryGameRepository_1.InMemoryGameRepository();
        const startGameUseCase = new StartGameUseCase_1.StartGameUseCase(gameRepository, randomNumberService);
        const makeGuessUseCase = new MakeGuessUseCase_1.MakeGuessUseCase(gameRepository, hintService);
        const cliController = new CLIController_1.CLIController(startGameUseCase, makeGuessUseCase);
        await cliController.start();
    }
    catch (error) {
        console.error("❌ Error starting game:", error);
        process.exit(1);
    }
}
if (require.main === module) {
    main();
}
