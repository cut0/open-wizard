import type { Context } from "../types";
import { createConvertCommand } from "./convert";

export const createCommand = (context: Context) => {
  createConvertCommand(context);
};
