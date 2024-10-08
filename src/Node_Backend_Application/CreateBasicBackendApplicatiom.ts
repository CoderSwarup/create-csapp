import chalk from "chalk";
import inquirer from "inquirer";
import { execSync } from "child_process";
import fs from "fs-extra";
import {
  APPJS_TEMPLATE,
  INDEXJS_TEMPLATE,
  README_TEMPLATE,
} from "./FileTemplates/BasicFileTemplate";
import GraphQLSetup from "./GraphQlSetup";
import KafkaSetup from "./KafkaSetup";
import RedisSetup from "./RedisSetup";
import PrismaSetup from "./PrismaSetup";
import SocketIOSetup from "./SocketSetup";
import SwaggerSetup from "./SwaggerSetup";

async function backendApp(isTypeScript: boolean) {
  console.log(
    chalk.yellowBright(
      `👷 Creating a Node Backend App with ${
        isTypeScript ? "TypeScript" : "JavaScript"
      }...`
    )
  );

  try {
    // Initialize Node project
    execSync(`npm init -y`, { stdio: "inherit" });

    // Create folder structure
    console.log(chalk.green("📁 Creating folder structure..."));
    fs.ensureDirSync("./public");
    fs.ensureDirSync("./src/controllers");
    fs.ensureDirSync("./src/db");
    fs.ensureDirSync("./src/middlewares");
    fs.ensureDirSync("./src/models");
    fs.ensureDirSync("./src/routes");
    fs.ensureDirSync("./src/utils");

    // Create basic files
    const ext = isTypeScript ? "ts" : "js";
    fs.writeFileSync(`./src/index.${ext}`, INDEXJS_TEMPLATE);
    fs.writeFileSync(`./src/app.${ext}`, APPJS_TEMPLATE);
    fs.ensureFileSync(`./src/constants.${ext}`);
    fs.writeFileSync("./.env", "");
    fs.ensureFileSync("./.env-sample");
    fs.writeFileSync("./.gitignore", "node_modules\n.env\n.env.*");
    fs.writeFileSync(
      "./.prettierignore",
      "/.vscode\n./dist\nnode_modules\nbuild\ndist\ncoverage\n*.log\n*.env\n.env\n.env.*"
    );
    fs.writeFileSync(
      "./.prettierrc",
      JSON.stringify(
        { semi: false, singleQuote: true, tabWidth: 2, trailingComma: "all" },
        null,
        2
      )
    );
    fs.writeFileSync("./README.md", README_TEMPLATE);

    // Adjust package.json scripts based on TypeScript or JavaScript
    const packageJson = JSON.parse(
      fs.readFileSync("./package.json").toString()
    );

    packageJson.scripts = {
      start: isTypeScript
        ? "npm run build && node dist/index.js" // Compiled JS in the dist folder for TypeScript
        : "node src/index.js",
      dev: isTypeScript
        ? 'tsc-watch --onSuccess "npm start"'
        : "nodemon -r dotenv/config --experimental-json-modules src/index.js",
      build: isTypeScript ? "tsc" : "", // Build script for TypeScript to compile the project
    };

    packageJson.main = isTypeScript ? "dist/src/index.js" : "src/index.js";
    packageJson.type = "module";
    fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));

    // Install dependencies
    console.log(chalk.green("📦 Installing dependencies..."));
    const dependencies = [
      "express",
      "dotenv",
      "cors",
      "cookie-parser",
      "nodemon",
    ];
    const devDependencies = isTypeScript
      ? [
          "typescript",
          "tsc-watch",
          "ts-node",
          "@types/node",
          "@types/express",
          "@types/cookie-parser",
          "@types/cors",
        ]
      : [];

    // Install core dependencies and TypeScript-specific dev dependencies if needed
    execSync(`npm install ${dependencies.join(" ")}`, {
      stdio: "inherit",
    });

    // TypeScript-specific setup
    if (isTypeScript) {
      execSync(`npm install -D ${devDependencies.join(" ")}`, {
        stdio: "inherit",
      });
      console.log(chalk.green("🔧 Setting up TypeScript configuration..."));
      fs.writeFileSync(
        "./tsconfig.json",
        JSON.stringify(
          {
            compilerOptions: {
              target: "ES2020",
              module: "esnext",
              strict: true,
              esModuleInterop: true,
              outDir: "./dist",
              rootDir: "./src",
              resolveJsonModule: true,
              skipLibCheck: true,
              moduleResolution: "node10",
            },
            include: ["src/**/*.ts", "src/**/*.yaml"],
            exclude: ["node_modules"],
          },
          null,
          2
        )
      );
    }

    console.log(
      chalk.greenBright(
        `🎉 Node Backend App with ${
          isTypeScript ? "TypeScript" : "JavaScript"
        } created successfully!`
      )
    );
  } catch (error) {
    console.error(chalk.red(`❌ Error occurred: ${error}`));
  }
}

const askQuestions = async (): Promise<void> => {
  console.log(
    chalk.blueBright(`🚀 Let's build an awesome Node.js backend project!\n`)
  );

  try {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "language",
        message: chalk.cyan("Do you want to use TypeScript or JavaScript?"),
        choices: ["TypeScript", "JavaScript"],
        default: "JavaScript",
      },
      {
        type: "confirm",
        name: "socket",
        message: chalk.cyan("Do you want to include Socket Server?"),
        default: true,
      },
      {
        type: "confirm",
        name: "graphql",
        message: chalk.cyan("Do you want to include GraphQL?"),
        default: true,
      },
      {
        type: "confirm",
        name: "kafka",
        message: chalk.cyan("Do you want to include Kafka?"),
        default: true,
      },
      {
        type: "confirm",
        name: "redis",
        message: chalk.cyan("Do you want to include Redis?"),
        default: true,
      },
      {
        type: "confirm",
        name: "prisma",
        message: chalk.cyan("Do you want to include Prisma?"),
        default: true,
      },
      {
        type: "confirm",
        name: "swagger",
        message: chalk.cyan("Do you want to include Swagger API?"),
        default: true,
      },
    ]);

    const isTypeScript = answers.language === "TypeScript";
    await backendApp(isTypeScript);

    if (answers.graphql == true) await GraphQLSetup();

    if (answers.kafka == true) await KafkaSetup();

    if (answers.redis == true) await RedisSetup();

    if (answers.prisma == true) await PrismaSetup();

    if (answers.socket == true) await SocketIOSetup();

    if (answers.swagger == true) await SwaggerSetup();
  } catch (error: any) {
    if (error.isTtyError) {
      console.log(chalk.red("\n ❌ Setup aborted.🚨"));
    }
  }
};

// Main function to start the CLI
export default async function createBasicBackendApplication() {
  await askQuestions();
}
