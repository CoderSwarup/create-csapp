import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";
import {
  PRISMA_CLIENT_TEMPLATE,
  PRISMA_SCHEMA_TEMPLATE,
} from "./FileTemplates/PrismaFileTemplate";
import { isTypeScriptProject } from "../utils/validate";

// Prisma Setup function
const PrismaSetup = async () => {
  try {
    console.log(chalk.cyan("\n🚀 Setup Prisma..."));

    const isTypeScript = isTypeScriptProject();
    const ext = isTypeScript ? "ts" : "js";

    // Install required dependencies for Prisma
    console.log(chalk.green("📦 Installing Prisma dependencies..."));
    const dependencies = ["@prisma/client"];
    const devDependencies = ["prisma"];

    // Install core dependencies and TypeScript-specific dev dependencies if needed
    execSync(`npm install ${dependencies.join(" ")}`, {
      stdio: "inherit",
    });
    execSync(`npm install --save-dev ${devDependencies.join(" ")}`, {
      stdio: "inherit",
    });

    // Run Prisma init to create the .env file
    execSync("npx prisma init", { stdio: "inherit" });

    console.log(chalk.green("📁 Creating Prisma structure..."));

    // Create Prisma related directories
    // fs.ensureDirSync("./prisma");

    // Write Prisma schema
    fs.writeFileSync(`./prisma/schema.prisma`, PRISMA_SCHEMA_TEMPLATE);

    // Write database connection setup
    fs.writeFileSync(`./src/prismaClient.${ext}`, PRISMA_CLIENT_TEMPLATE);

    console.log(chalk.green("🎉 Prisma setup completed!"));
  } catch (error) {
    console.log(error);

    console.error(chalk.red(`❌ Something Wrong Installing Prisma`));
  }
};
export default PrismaSetup;
