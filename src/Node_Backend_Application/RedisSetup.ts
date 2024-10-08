import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";
import { REDIS_CONFIG_TEMPLATE } from "./FileTemplates/RedisFileTemplate";
import { isTypeScriptProject } from "../utils/validate";

// Redis Setup function
const RedisSetup = async () => {
  try {
    console.log(chalk.cyan("\n🚀 Setup Redis..."));
    const isTypeScript = isTypeScriptProject();
    const ext = isTypeScript ? "ts" : "js";

    console.log(chalk.green("📁 Creating Redis structure..."));

    // Create Redis related directories
    fs.ensureDirSync("./src/redis");

    // Write Redis Config
    fs.writeFileSync(`./src/redis/index.${ext}`, REDIS_CONFIG_TEMPLATE);

    // Install required dependencies for Redis
    console.log(chalk.green("📦 Installing Redis dependencies..."));
    const dependencies = ["redis"];
    const devDependencies = isTypeScript ? ["@types/redis"] : [];

    // Install core dependencies and TypeScript-specific dev dependencies if needed
    execSync(`npm install ${dependencies.join(" ")}`, {
      stdio: "inherit",
    });
    if (isTypeScript) {
      execSync(`npm install --save-dev ${devDependencies.join(" ")}`, {
        stdio: "inherit",
      });
    }

    console.log(chalk.green("🎉 Redis setup completed!"));
  } catch (error) {
    console.error(chalk.red(`❌ Something Wrong Installing Redis`));
  }
};

export default RedisSetup;
