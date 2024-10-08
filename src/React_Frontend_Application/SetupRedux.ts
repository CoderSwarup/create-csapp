import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";
import { isReactApp } from "../utils/isValidReactApp";
import chalk from "chalk";
import { isTypeScriptProject } from "../utils/validate";

export default async function SetupRedux() {
  const isValidProject = await isReactApp();
  if (!isValidProject) {
    console.error(
      chalk.red(
        "❌ Aborting Redux installation: This is not a valid React project."
      )
    );
    return;
  }

  const isTypeScript = isTypeScriptProject();
  const fileExtension = isTypeScript ? "ts" : "js";
  console.log(chalk.blue(`⚙️  Setting up Redux Toolkit and React-Redux...`));
  execSync("npm install @reduxjs/toolkit react-redux", {
    stdio: "inherit",
  });

  // Create store folder and file
  fs.ensureDirSync("./src/redux/reducers");

  const storeFile = `./src/redux/store.${fileExtension}`;
  try {
    fs.writeFileSync(storeFile, storeFileSource(isTypeScript));
    console.log(chalk.green(`✅ Redux store file created at: ${storeFile}`));
  } catch (error) {
    console.error(chalk.red(`❌ Error creating Redux store file: ${error}`));
  }

  // Modify main file (main.tsx or main.jsx) to include the Redux Provider
  const mainFilePath = path.join(process.cwd(), `./src/main.${fileExtension}x`);
  try {
    if (fs.existsSync(mainFilePath)) {
      const mainFileContent = fs.readFileSync(mainFilePath, "utf-8");
      const updatedMainFileContent = updateMainFile(
        mainFileContent,
        isTypeScript
      );
      fs.writeFileSync(mainFilePath, updatedMainFileContent);
      console.log(
        chalk.green(`✅ main.${fileExtension}x updated with Redux Provider!`)
      );
    } else {
      console.error(
        chalk.red(`❌ Error: main.${fileExtension}x file not found.`)
      );
    }

    console.log(
      chalk.green(
        "\n ✅ Redux Toolkit and React-Redux installed successfully! \n"
      )
    );
  } catch (error) {
    console.error(
      chalk.red(`❌ Error updating main.${fileExtension}x file: ${error}`)
    );
    process.exit(-1);
  }
}

// Generate the store file based on TypeScript or JavaScript
const storeFileSource = (isTypeScript: boolean): string => `
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});

${
  isTypeScript
    ? `
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
`
    : ""
}
`;

// Update the main file to wrap the app with the Redux Provider
function updateMainFile(content: string, isTypeScript: boolean): string {
  const reduxProviderImport = `import { Provider } from "react-redux";\nimport { store } from "@/redux/store";\n`;
  const updatedContent = content
    .replace(/import App/, `${reduxProviderImport}import App`) // Add imports
    .replace(/<App \/>/, "<Provider store={store}><App /></Provider>"); // Wrap App with Provider

  return updatedContent;
}
