import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { isReactApp } from "../utils/isValidReactApp";
import { isTypeScriptProject } from "../utils/validate";

export async function SetupTailwind() {
  const isReact = await isReactApp();

  if (!isReact) {
    console.log(
      chalk.red("🚫 This is not a valid React project. Aborting installation.")
    );
    return;
  }

  try {
    const isTypeScript = isTypeScriptProject();

    console.log(chalk.blue(`🎨 Setting up Tailwind CSS...`));
    execSync(
      "npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p",
      { stdio: "inherit" }
    );
    console.log(chalk.green("✅ Tailwind CSS installed successfully!"));

    console.log("Configuring Tailwind CSS...");
    const tailwindConfigPath = path.join(process.cwd(), "tailwind.config.js");
    const content = `
      /** @type {import('tailwindcss').Config} */
      export default {
        content: ["./src/**/*.{${isTypeScript ? "ts,tsx" : "js,jsx"}}"],
        theme: {
          extend: {},
        },
        plugins: [],
      }
    `;

    fs.writeFileSync(tailwindConfigPath, content);
    console.log(chalk.green("✅ Tailwind CSS configuration complete!"));

    // Modify the index.css to include Tailwind directives
    const indexCssFile = path.join(process.cwd(), "./src/index.css");
    const tailwindImports = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`;
    fs.ensureFileSync(indexCssFile);

    // Read the current content of index.css
    const currentContent = fs.readFileSync(indexCssFile, "utf-8");
    fs.writeFileSync(indexCssFile, tailwindImports + currentContent);

    console.log(chalk.green("✅ Tailwind CSS imported into index.css!"));
  } catch (error) {
    console.log(chalk.green("❌ Failed to Setup the Tailwind"));
    process.exit(-1);
  }
}
