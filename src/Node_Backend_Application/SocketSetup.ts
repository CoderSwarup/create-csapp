import fs from "fs-extra";
import chalk from "chalk";
import { execSync } from "child_process";
import path from "path";
import {
  SOCKET_EVENT_TEMPLATE,
  SOCKET_EVENT_TEMPLATE_TYPESCRIPT,
  SOCKET_IO_TEMPLATE,
  SOCKET_IO_TEMPLATE_TYPESCRIPT,
} from "./FileTemplates/SocketFileTemplate";
import { isTypeScriptProject } from "../utils/validate";

// Socket.IO Setup function
const SocketIOSetup = async () => {
  try {
    console.log(chalk.cyan("\n🚀 Setup Socket Server..."));
    const isTypeScript = isTypeScriptProject();
    const ext = isTypeScript ? "ts" : "js";

    console.log(chalk.green("📁 Creating Socket.IO structure..."));

    // Create directories related to Socket.IO setup
    fs.ensureDirSync("./src/socket");
    fs.ensureDirSync("./src/socket/events");

    fs.writeFileSync(
      `./src/socket/index.${ext}`,
      isTypeScript
        ? SOCKET_IO_TEMPLATE_TYPESCRIPT.trim()
        : SOCKET_IO_TEMPLATE.trim()
    );

    fs.writeFileSync(
      `./src/socket/events/index.${ext}`,
      isTypeScript
        ? SOCKET_EVENT_TEMPLATE_TYPESCRIPT.trim()
        : SOCKET_EVENT_TEMPLATE.trim()
    );

    console.log(chalk.green("🎉 Socket.IO setup completed!"));

    // Install Socket.IO dependency
    console.log(chalk.green("📦 Installing Socket.IO dependencies..."));
    const dependencies = ["socket.io"];

    // Adjust installation for TypeScript if necessary

    execSync(`npm install ${dependencies.join(" ")}`, { stdio: "inherit" });
    if (isTypeScript) {
      execSync(`npm install -D @types/socket.io`, { stdio: "inherit" });
    }
    console.log(chalk.green("🎉 Socket Server setup completed!"));
  } catch (error) {
    console.error(chalk.red(`❌ Something Wrong Installing Socket IO`));
  }
};

// Export the setup function for reuse
export default SocketIOSetup;
