import path from "path";
import fs from "fs";
import chalk from "chalk";

export async function isReactApp() {
  const packageJsonPath = path.resolve(process.cwd(), "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    console.log(
      chalk.red(
        " Error: ❌ package.json not found. This is not a valid project directory. \n"
      )
    );
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  const dependencies = packageJson.dependencies || {};
  const devDependencies = packageJson.devDependencies || {};

  // Check if React is installed
  if (dependencies.react || devDependencies.react) {
    return true;
  } else {
    console.error(
      chalk.red(
        "❌ Error: React is not found in dependencies. Please ensure you're in a React project."
      )
    );
    return false;
  }
}
