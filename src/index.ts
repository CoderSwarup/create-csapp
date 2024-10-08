#!/usr/bin/env node

import { Command } from "commander";
import createUsualReactApp from "./React_Frontend_Application/CreateBasicRectApp";
import printWelcome from "./utils/PrintWelcome";
import createBasicBackendApplication from "./Node_Backend_Application/CreateBasicBackendApplicatiom";
import SocketIOSetup from "./Node_Backend_Application/SocketSetup";
import RedisSetup from "./Node_Backend_Application/RedisSetup";
import KafkaSetup from "./Node_Backend_Application/KafkaSetup";
import SwaggerSetup from "./Node_Backend_Application/SwaggerSetup";
import GraphQLSetup from "./Node_Backend_Application/GraphQlSetup";
import chalk from "chalk";
import SetupRedux from "./React_Frontend_Application/SetupRedux";
import SetupAxios from "./React_Frontend_Application/SetupAxios";
import { SetupTailwind } from "./React_Frontend_Application/SetupTailwind";
import PrismaSetup from "./Node_Backend_Application/PrismaSetup";

const program = new Command();

program
  .version("0.1.0")
  .description("A CLI for creating and managing React applications")
  .action(async () => {
    await printWelcome();
    await createUsualReactApp();
  });

program
  .command("fronted")
  .description("Create a new Frontend Application")
  .action(async () => {
    await printWelcome();
    await createUsualReactApp();
  });

program
  .command("backend")
  .description("Create a new Backend Application")
  .action(async () => {
    await printWelcome();
    await createBasicBackendApplication();
  });

// Initialize the commander program

program
  .command("add <feature>")
  .description("Add a feature to your application")
  .option("--help", "display help for command")
  .action(async (feature) => {
    await printWelcome();
    switch (feature) {
      case "redux":
        await SetupRedux();
        return;
      case "axios":
        await SetupAxios();
        return;
      case "tailwind":
        await SetupTailwind();
        return;
      case "socket-server":
        await SocketIOSetup();
        return;
      case "redis-server":
        await RedisSetup();
        return;
      case "kafka-server":
        await KafkaSetup();
        return;
      case "swagger-api-doc":
        await SwaggerSetup();
        return;
      case "graphql-server":
        await GraphQLSetup();
        return;
      case "prisma":
        await PrismaSetup();
        return;
      default:
        console.log(chalk.redBright(`Feature name is missing ❌ \n`));
        displayAvailableFeatures();
    }
  });

function displayAvailableFeatures() {
  console.log(chalk.yellow("Available features:\n"));
  console.log(chalk.cyan("  - redux"));
  console.log(chalk.cyan("  - axios"));
  console.log(chalk.cyan("  - tailwind"));
  console.log(chalk.yellow("  ------  "));

  console.log(chalk.cyan("  - socket-server"));
  console.log(chalk.cyan("  - redis-server"));
  console.log(chalk.cyan("  - kafka-server"));
  console.log(chalk.cyan("  - prisma"));
  console.log(chalk.cyan("  - swagger-api-doc"));
  console.log(chalk.cyan("  - graphql-server"));
}

// Parse the command line arguments
program.parse(process.argv);
