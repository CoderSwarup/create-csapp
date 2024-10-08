import fs from "fs-extra";
import chalk from "chalk";
import { execSync } from "child_process";
import path from "path";
import {
  SWAGGER_TEMPLATE,
  SWAGGER_YAML_TEMPLATE,
  ROUTE_FILE_TEMPLATE,
  SWAGGER_TEMPLATE_TYPESCRIPT,
  ROUTE_FILE_TEMPLATE_TYPESCRIPT,
} from "./FileTemplates/SwaggerFileTemplate"; // Ensure to create these templates
import { isTypeScriptProject } from "../utils/validate";

// Swagger Setup function
const SwaggerSetup = async () => {
  try {
    console.log(chalk.cyan("\n🚀 Setup Swagger Api Doc..."));
    const isTypeScript = isTypeScriptProject();
    const ext = isTypeScript ? "ts" : "js";

    console.log(chalk.green("📁 Creating Swagger structure..."));

    // Create directories related to Swagger setup
    fs.ensureDirSync("./src/SwaggerAPIDoc");

    // Create Swagger and route files
    fs.writeFileSync(
      `./src/SwaggerAPIDoc/swagger.${ext}`,
      isTypeScript
        ? SWAGGER_TEMPLATE_TYPESCRIPT.trim()
        : SWAGGER_TEMPLATE.trim()
    );
    fs.writeFileSync(
      `./src/SwaggerAPIDoc/routeFile.${ext}`,
      isTypeScript
        ? ROUTE_FILE_TEMPLATE_TYPESCRIPT.trim()
        : ROUTE_FILE_TEMPLATE.trim()
    );
    fs.writeFileSync(
      `./src/SwaggerAPIDoc/swagger.yaml`,
      SWAGGER_YAML_TEMPLATE.trim()
    );

    console.log(chalk.green("🎉 Swagger setup completed!"));

    // Install Swagger dependencies
    console.log(chalk.green("📦 Installing Swagger dependencies..."));
    const dependencies = ["swagger-jsdoc", "swagger-ui-express", "yaml"];
    const devDependencies = isTypeScript
      ? ["@types/swagger-jsdoc", "@types/swagger-ui-express"]
      : [];

    // Install core dependencies
    execSync(`npm install ${dependencies.join(" ")}`, { stdio: "inherit" });

    if (isTypeScript) {
      execSync(`npm install -D ${devDependencies.join(" ")}`, {
        stdio: "inherit",
      });
    }
    console.log(chalk.green("🎉 Swagger Server setup completed!"));
  } catch (error) {
    console.error(chalk.red(`❌ Something went wrong setting up Swagger`));
  }
};

// Export the setup function for reuse
export default SwaggerSetup;
