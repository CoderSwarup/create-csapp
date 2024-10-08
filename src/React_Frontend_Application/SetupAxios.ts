import { execSync } from "child_process";
import fs from "fs-extra";
import { isReactApp } from "../utils/isValidReactApp";
import chalk from "chalk";
import path from "path";
import { isTypeScriptProject } from "../utils/validate";

export default async function SetupAxios() {
  const isvalidProject = await isReactApp();

  if (!isvalidProject) {
    console.error(
      chalk.red(
        "❌ Sorry, Aborting Axios installation: This is not a React project."
      )
    );
    return;
  }

  const isTypeScript = isTypeScriptProject();
  const fileExtension = isTypeScript ? "ts" : "js";

  console.log(chalk.blue(`🔗 Setting up Axios...`));
  execSync("npm i axios", {
    stdio: "inherit",
  });

  // Create necessary folders
  console.log("Creating axios folder in src...");
  fs.ensureDirSync("./src/axios/apis");
  fs.ensureDirSync("./src/axios/urls");

  // Write the axios configuration file
  const axiosConfigFile = `./src/axios/axios.config.${fileExtension}`;
  try {
    fs.writeFileSync(axiosConfigFile, axiosConfigSource(isTypeScript));
    console.log(
      chalk.green(`✅ Axios config file created: ${axiosConfigFile}`)
    );
  } catch (error) {
    console.error(chalk.red(`❌ Error creating Axios config file: ${error}`));
  }

  // Ensure .env file exists and check for existing variable
  try {
    fs.ensureFileSync(".env");

    // Check if the variable already exists
    const currentEnv = fs.readFileSync(".env", "utf-8");
    if (!currentEnv.includes("VITE_BACKEND_BASE_URL")) {
      fs.appendFileSync(".env", envFile);
      console.log(chalk.green(`✅ Added VITE_BACKEND_BASE_URL to .env file.`));
    } else {
      console.log(
        chalk.yellow(`⚠️  VITE_BACKEND_BASE_URL already exists in .env file.`)
      );
    }

    console.log(chalk.green("\n ✅ Axios installed successfully!'\n"));
  } catch (error) {
    console.error(chalk.red(`❌ Error updating .env file: ${error}`));
  }

  // Add environment constants
  const envConstantsFile = `./src/axios/envConstants.${fileExtension}`;
  try {
    fs.writeFileSync(envConstantsFile, envConstants(isTypeScript));
    console.log(
      chalk.green(`✅ Environment constants file created: ${envConstantsFile}`)
    );
  } catch (error) {
    console.error(
      chalk.red(`❌ Error creating environment constants file: ${error}`)
    );
  }
}

// Generate axios configuration based on TypeScript or JavaScript
const axiosConfigSource = (isTypeScript: boolean): string => `
import axios from "axios";
import envConstants from "./envConstants";

export default axios.create({
  baseURL: envConstants.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // Add other default headers if needed
  },
  withCredentials: true,
});

// TypeScript version if applicable
${isTypeScript ? "export type AxiosInstance = typeof axios;" : ""}
`;

// Environment variables for .env file
const envFile = `VITE_BACKEND_BASE_URL=http://localhost:8080/api/v1/`;

// Generate environment constants based on TypeScript or JavaScript
const envConstants = (isTypeScript: boolean): string => `
export default {
    BASE_URL: import.meta.env.VITE_BACKEND_BASE_URL
};
`;
