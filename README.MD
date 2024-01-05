# Practical task

In this introduction part of Node.js program, you will need to become familiar with Node.js, install NPM, and be able to manage multiple versions of Node.js. This typically involves downloading the Node.js installer from the official website and running it to complete the installation. After that Node.js and NPM could be used to create and run applications, manage dependencies and switch between different versions of Node.js using NVM.

## Prerequisites

1. Install the latest `LTS` (Long Term Support) version of **Node.js**, by any available means `(.exe, nvm, brew, etc.)`.
2. Check in the console (terminal) that the Node.js installation was done properly by running the following commands `node -v` or `node -version`.
3. Create a repo for your homework tasks on **GitHub** or **Git Epam**.
4. Provide your mentor with the link to the repo and add read access permissions.

## Home task

1. Create `package.json` by running the following commands `npm init` or `npm init -y`.
2. Install npm package **nodemon** globally or locally as dev dependency.
3. Create `index.js` file with `getRandomNumber()` function. The program should be started via npm script using `nodemon`.
4. Run `getRandomNumber()` function in REPL mode to perform operations from CLI.
5. Install **NVM** verify installation `command -v` nvm.

## Acceptance criteria

1. Prerequisites are fulfilled to the full extent.
2. The Repository access provided to the mentor.
3. The repository contains `package.json` and `index.js` files with `getRandomNumber()` function.
4. The repository contains screens that prove the following:
+ working with different versions of Node.js by using nvm
+ working with REPL execution `getRandomNumber()` function in CLI
+ working with nodemon

## Evaluation criteria

### 5-point scoring system

- `3` - Acceptance criteria 1-2 are implemented.
- `4` - Acceptance criteria 1-3 are implemented.
- `5` - Acceptance criteria 1-4 are implemented.

### 100-point scoring system

- `60 - 69` - Acceptance criteria 1-2 are partially implemented.
- `70 - 79` - Acceptance criteria 1-2 are implemented.
- `80 - 89` - Acceptance criteria 1-3 are implemented.
- `90 - 100` - Acceptance criteria 1-4 are implemented.