# 🎯 Number Guessing Game

[![Docker Pulls](https://img.shields.io/docker/pulls/your-username/number-guessing-game)](https://hub.docker.com/r/your-username/number-guessing-game)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18-green.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A fully-featured command-line number guessing game built with TypeScript, following clean architecture principles, and containerized with Docker.

## 🎮 Features

### 🎯 **Core Gameplay**

- **Multiple Difficulty Levels**: Easy (10 attempts), Medium (5 attempts), Hard (3 attempts)
- **Smart Hints System**: Get intelligent hints when you're close to the number
- **Timer Tracking**: Real-time game duration tracking
- **Score System**: Best scores tracking per difficulty level
- **Game History**: Persistent game statistics and history

### 🏗️ **Technical Features**

- **Clean Architecture**: Separated Domain, Application, and Infrastructure layers
- **TypeScript**: Full type safety and modern JavaScript features
- **Dockerized**: Ready-to-run containerized application
- **CI/CD Pipeline**: Automated builds and deployments
- **Data Persistence**: JSON-based game data storage

## 🚀 Quick Start

### **Method 1: Using Docker (Recommended)**

```bash
# Pull and run from Docker Hub
docker run -it your-username/number-guessing-game

# Or with data persistence
docker run -it -v ./game-data:/app/data your-username/number-guessing-game
```

### **Method 2: Using GitHub Container Registry**

```bash
docker pull ghcr.io/your-username/number-guessing-game:latest
docker run -it ghcr.io/your-username/number-guessing-game:latest
```

### **Method 3: Local Development**

```bash
# Clone the repository
git clone https://github.com/your-username/number-guessing-game.git
cd number-guessing-game

# Install dependencies
npm install

# Build the project
npm run build

# Run the game
npm start

# For development with hot reload
npm run dev
```

## 📁 Project Structure

```
number-guessing-game/
├── 📂 src/
│   ├── 📂 core/                    # Domain Layer
│   │   ├── 📂 domain/             # Business entities and rules
│   │   │   ├── 📂 entities/       # Game, User, Guess
│   │   │   ├── 📂 value-objects/  # DifficultyLevel, GameResult
│   │   │   └── 📂 repositories/   # Repository interfaces
│   │   └── 📂 application/        # Use Cases
│   │       └── 📂 use-cases/      # StartGame, MakeGuess, PlayRound
│   ├── 📂 infrastructure/         # External implementations
│   │   ├── 📂 repositories/       # InMemoryGameRepository
│   │   ├── 📂 services/           # Timer, Hint, RandomNumber services
│   │   └── 📂 controllers/        # GameController, CLIController
│   ├── 📂 shared/                 # Shared utilities
│   │   └── 📂 utils/              # ConsoleIO, GameConfig
│   └── main.ts                    # Application entry point
├── 📂 dist/                       # Compiled JavaScript
├── 📂 data/                       # Game data storage
├── 📂 .github/workflows/          # CI/CD pipelines
├── 📜 Dockerfile                  # Production Docker configuration
├── 📜 Dockerfile.dev              # Development Docker configuration
├── 📜 docker-compose.yml          # Docker Compose setup
├── 📜 package.json                # Dependencies and scripts
├── 📜 tsconfig.json               # TypeScript configuration
└── 📜 README.md                   # This file
```

## 🐳 Docker Commands

### **Build and Run**

```bash
# Build the image
docker build -t number-guessing-game .

# Run interactively
docker run -it number-guessing-game

# Run with mounted volume for data persistence
docker run -it -v ./data:/app/data number-guessing-game
```

### **Development with Docker**

```bash
# Build development image
docker build -f Dockerfile.dev -t number-game:dev .

# Run with hot reload
docker run -it -v ${PWD}/src:/app/src -v ${PWD}/dist:/app/dist number-game:dev
```

### **Using Docker Compose**

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f
```

## 📊 Game Statistics

The game automatically tracks:

- **Total games played**
- **Win/Loss ratio**
- **Best scores** per difficulty level
- **Average completion time**
- **Recent game history**

All statistics are saved in `/app/data/games.json` and persist between sessions.

## 🔧 Available Scripts

```bash
npm run build      # Compile TypeScript to JavaScript
npm start          # Run the compiled game
npm run dev        # Run with ts-node for development
npm run clean      # Clean build artifacts
npm run docker:build  # Build Docker image
npm run docker:run    # Run Docker container
npm test           # Run tests (coming soon)
```

## 🛠️ Development

### **Prerequisites**

- Node.js 18 or higher
- TypeScript 5.0+
- Docker (optional)
- Git

### **Setting Up Development Environment**

```bash
# 1. Clone the repository
git clone https://github.com/your-username/number-guessing-game.git

# 2. Install dependencies
npm install

# 3. Configure environment (optional)
cp .env.example .env

# 4. Start development server
npm run dev
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📈 CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

1. **On every push to main branch:**

   - TypeScript compilation check
   - Docker image build
   - Automated testing
   - Push to Docker Hub/GitHub Container Registry

2. **Automated deployments:**
   - Latest tag always points to stable build
   - Version tags for each commit SHA
   - Badges for build status and Docker pulls
     Project URL:https://roadmap.sh/projects/number-guessing-game
