import type { Command } from "commander";
import type { createUsecases } from "../core";

export type Context = {
  command: Command;
  usecases: ReturnType<typeof createUsecases>;
};
