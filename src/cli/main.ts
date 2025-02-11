import { Command } from "commander";
import packageJson from "../../package.json" assert { type: "json" };
import { createUsecases } from "../core";
import { createCommand } from "./commands";

const run = async () => {
  const command = new Command()
    .name(packageJson.name)
    .description(packageJson.description)
    .version(packageJson.version);

  createCommand({
    command,
    usecases: createUsecases(),
  });

  command.parse(process.argv);
};

run();
