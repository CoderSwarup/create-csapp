import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";
import { isTypeScriptProject } from "../utils/validate";
import {
  KAFKA_CONFIG_TEMPLATE,
  KAFKA_CONSUMER_TEMPLATE,
  KAFKA_CONSUMER_TEMPLATE_TYPESCRIPT,
  KAFKA_PRODUCER_TEMPLATE,
  KAFKA_PRODUCER_TEMPLATE_TYPESCRIPT,
} from "./FileTemplates/KafkaFileTemplates";

// Kafka Setup function
const KafkaSetup = async () => {
  try {
    console.log(chalk.cyan("\n🚀 Setup Kafka..."));
    const isTypeScript = isTypeScriptProject();
    const ext = isTypeScript ? "ts" : "js";

    console.log(chalk.green("📁 Creating Kafka structure..."));

    // Create Kafka related directories
    fs.ensureDirSync("./src/kafka/config");
    fs.ensureDirSync("./src/kafka/producer");
    fs.ensureDirSync("./src/kafka/consumer");

    // Write Kafka Config
    fs.writeFileSync(`./src/kafka/config/index.${ext}`, KAFKA_CONFIG_TEMPLATE);

    // Write Kafka Producer
    fs.writeFileSync(
      `./src/kafka/producer/index.${ext}`,
      isTypeScript
        ? KAFKA_PRODUCER_TEMPLATE_TYPESCRIPT
        : KAFKA_PRODUCER_TEMPLATE
    );

    // Write Kafka Consumer
    fs.writeFileSync(
      `./src/kafka/consumer/index.${ext}`,
      isTypeScript
        ? KAFKA_CONSUMER_TEMPLATE_TYPESCRIPT
        : KAFKA_CONSUMER_TEMPLATE
    );

    // Install required dependencies for Kafka
    console.log(chalk.green("📦 Installing Kafka dependencies..."));
    const dependencies = ["kafkajs"];
    const devDependencies = isTypeScript ? ["@types/node"] : [];

    // Install core dependencies and TypeScript-specific dev dependencies if needed
    execSync(`npm install ${dependencies.join(" ")}`, {
      stdio: "inherit",
    });
    if (isTypeScript) {
      execSync(`npm install --save-dev ${devDependencies.join(" ")}`, {
        stdio: "inherit",
      });
    }

    console.log(chalk.green("🎉 Kafka setup completed!"));
  } catch (error) {
    console.error(chalk.red(`❌ Something Wrong Installing Kafka`));
  }
};
export default KafkaSetup;
