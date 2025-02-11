import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import type { Context } from "../types";
import { parseOpenApiFile } from "../utils/file";

type Options = {
  required: boolean;
  format?: "yaml" | "json";
  output: string;
};

export const createConvertCommand = (context: Context) => {
  const { command, usecases } = context;

  command
    .command("convert <target>")
    .option(
      "-r, --required",
      "Forcing component schemas and responses to be marked as required",
      false,
    )
    .option("-f, --format <format>", "Output format (yaml or json)")
    .requiredOption("-o, --output <output>", "Output file path")
    .description("Convert your OpenAPI file")
    .action(
      (target: string, { output, format: formatProp, required }: Options) => {
        const base = parseOpenApiFile(target);
        let res = base;

        if (required) {
          res = usecases.addRequired(base);
        }

        const format =
          formatProp != null ? formatProp : path.extname(output).slice(1);

        if (format === "json") {
          const file = path.format({
            ...path.parse(output),
            base: undefined,
            ext: ".json",
          });
          fs.writeFileSync(file, res, "utf8");
        } else {
          const file = path.format({
            ...path.parse(output),
            base: undefined,
            ext: ".yaml",
          });
          fs.writeFileSync(file, yaml.dump(res), "utf8");
        }
      },
    );
};
