import { execSync } from "child_process";
import * as fs from "fs-extra";
import inquirer from "inquirer";
import path from "path";
import chalk from "chalk";
import { SetupTailwind } from "./SetupTailwind";
import SetupAxios from "./SetupAxios";
import SetupRedux from "./SetupRedux";

// Directly using emojis instead of relying on node-emoji

// Enhanced alias installation output
function installAlias() {
  console.log(chalk.magenta("Installing alias..."));
  execSync("npm i -D @types/node", { stdio: "inherit" });

  updateViteConfig();
  updateTsConfig();
  updateTsConfigApp();

  console.log(chalk.green(`✅ Alias installed successfully!`));
}

function updateViteConfig() {
  try {
    const viteConfigPath = path.join(process.cwd(), "vite.config.ts");
    const viteConfig = `
      import path from "path"
      import react from "@vitejs/plugin-react"
      import { defineConfig } from "vite"
    
      export default defineConfig({
        plugins: [react()],
        resolve: {
          alias: {
            "@": path.resolve(__dirname, "./src"),
          },
        },
      })
      `;

    fs.writeFileSync(viteConfigPath, viteConfig);
    console.log("Updated vite.config.ts");
  } catch (error) {
    console.log("Error updating vite.config.ts:", error);
  }
}

function updateTsConfig() {
  try {
    const tsconfigPath = path.join(process.cwd(), "tsconfig.json");
    let tsconfigContent = fs.readFileSync(tsconfigPath, "utf8");
    let tsconfig = JSON.parse(tsconfigContent);

    tsconfig.compilerOptions = {
      ...(tsconfig.compilerOptions || {}),
      baseUrl: ".",
      paths: {
        "@/*": ["./src/*"],
      },
    };

    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2), "utf8");
    console.log("tsconfig.json updated successfully!");
  } catch (error) {
    console.log("Error updating tsconfig.json:", error);
  }
}

function updateTsConfigApp() {
  try {
    const tsconfigAppJsonPath = path.join(process.cwd(), "tsconfig.app.json");
    let tsconfigAppJsonContent = fs.readFileSync(tsconfigAppJsonPath, "utf8");

    tsconfigAppJsonContent = tsconfigAppJsonContent.replace(/^\uFEFF/, ""); // Remove BOM if present
    tsconfigAppJsonContent = tsconfigAppJsonContent.replace(
      /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm,
      "$1"
    ); // Remove comments

    let tsconfigAppJson = JSON.parse(tsconfigAppJsonContent);
    tsconfigAppJson.compilerOptions = {
      ...tsconfigAppJson.compilerOptions,
      baseUrl: ".",
      paths: {
        "@/*": ["./src/*"],
      },
    };

    fs.writeFileSync(
      tsconfigAppJsonPath,
      JSON.stringify(tsconfigAppJson, null, 2),
      "utf8"
    );
    console.log("tsconfig.app.json updated successfully!");
  } catch (error) {
    console.error("Error updating tsconfig.app.json:", error);
  }
}

async function reactApp(isTypeScript: boolean) {
  console.log(
    chalk.yellowBright(
      `👷 Creating a usual React App with ${
        isTypeScript ? "TypeScript" : "JavaScript"
      }...`
    )
  );

  try {
    const template = isTypeScript ? "react-ts" : "react";
    execSync(`npm create vite@latest . -- --template ${template}`, {
      stdio: "inherit",
    });
    execSync("npm i", { stdio: "inherit" });

    console.log(chalk.green(`📁 Creating some useful folders...`));
    fs.ensureDirSync("./src/components");
    fs.ensureDirSync("./src/pages");
    fs.ensureDirSync("./src/context");
    fs.ensureDirSync("./src/hooks");
    fs.ensureDirSync("./src/services");
    fs.ensureDirSync("./src/redux");
    fs.ensureDirSync("./src/styles");
    fs.ensureDirSync("./src/utils");
    fs.ensureFileSync(".env");

    // Environment variables for .env file
    const envFile = `VITE_BACKEND_BASE_URL=http://localhost:8080/api/v1/`;
    fs.appendFileSync(".env", envFile);

    if (isTypeScript) {
      installAlias();
    }

    console.log(
      chalk.greenBright(
        `🎉 React App with ${
          isTypeScript ? "TypeScript" : "JavaScript"
        } created successfully! \n`
      )
    );
  } catch (error) {
    console.error(
      chalk.red(`❌ Error occurred while creating the React app: ${error}`)
    );
  }
}

// Function to ask questions for user preferences
const askQuestions = async (): Promise<void> => {
  console.log(chalk.blueBright(`🚀 Let's build an awesome React project!\n`));

  try {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "language",
        message: chalk.cyan("Do you want to use TypeScript or JavaScript?"),
        choices: ["TypeScript", "JavaScript"],
      },
      {
        type: "confirm",
        name: "tailwind",
        message: chalk.cyan("Do you want to add Tailwind CSS?"),
      },

      {
        type: "confirm",
        name: "redux",
        message: chalk.cyan("Do you want to add Redux?"),
      },
      {
        type: "confirm",
        name: "axios",
        message: chalk.cyan("Do you want to add Axios?"),
      },
    ]);

    const isTypeScript = answers.language === "TypeScript";
    await reactApp(isTypeScript);

    if (answers.tailwind) {
      await SetupTailwind();
    }

    if (answers.redux) {
      await SetupRedux();
    }
    if (answers.axios) {
      await SetupAxios();
    }
  } catch (error: any) {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.error(
        chalk.red("Prompt couldn't be rendered in the current environment.")
      );
    } else {
      // // Handle the exit error
      // const userConfirmed = await inquirer.prompt([
      //   {
      //     type: "confirm",
      //     name: "abort",
      //     message: chalk.red("🚨 Are you sure you want to abort setup?"),
      //   },
      // ]);
      // if (userConfirmed.abort) {
      //   console.log(chalk.red("❌ Setup aborted."));
      //   process.exit(1); // Exit the process
      // } else {
      //   console.log(chalk.green("✅ Continuing setup..."));
      //   await askQuestions(); // Restart the questions
      // }
      console.log(chalk.red("\n ❌ Setup aborted.🚨"));
    }
  }
};

// Main function to start the CLI
export default async function createUsualReactApp() {
  await askQuestions();
}
