import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";
import {
  GRAPHQL_RESOLVER_TEMPLATE,
  GRAPHQL_SCHEMA_TEMPLATE,
  GRAPHQL_SERVER_TEMPLATE,
} from "./FileTemplates/GraphQlFileTemplates";
import { isTypeScriptProject } from "../utils/validate";

// GraphQL Setup function
const GraphQLSetup = async () => {
  try {
    console.log(chalk.cyan("\n🚀 Setup GraphQL..."));
    const isTypeScript = isTypeScriptProject();
    const ext = isTypeScript ? "ts" : "js";

    console.log(chalk.green("📁 Creating GraphQL structure..."));

    // Create GraphQL related directories
    fs.ensureDirSync("./src/graphql/schemas");
    fs.ensureDirSync("./src/graphql/resolvers");

    // Write GraphQL Schema
    fs.writeFileSync(
      `./src/graphql/schemas/index.${ext}`,
      GRAPHQL_SCHEMA_TEMPLATE
    );
    // Write GraphQL Resolvers
    fs.writeFileSync(
      `./src/graphql/resolvers/index.${ext}`,
      GRAPHQL_RESOLVER_TEMPLATE
    );
    // Write GraphQL Server Initialization
    fs.writeFileSync(`./src/graphql/index.${ext}`, GRAPHQL_SERVER_TEMPLATE);

    // Install required dependencies for GraphQL
    console.log(chalk.green("📦 Installing GraphQL dependencies..."));
    const dependencies = ["@apollo/server", "graphql"];
    const devDependencies = isTypeScript
      ? ["@types/node", "@types/express"]
      : [];

    //   Install core dependencies and TypeScript-specific dev dependencies if needed
    execSync(`npm install ${dependencies.join(" ")}`, {
      stdio: "inherit",
    });
    if (isTypeScript) {
      execSync(`npm install --save-dev ${devDependencies.join(" ")}`, {
        stdio: "inherit",
      });
    }

    console.log(chalk.green("🎉 GraphQL setup completed!"));
  } catch (error) {
    console.error(chalk.red(`❌ SomeThing Wrong Installing GraphQl`));
  }
};
export default GraphQLSetup;
