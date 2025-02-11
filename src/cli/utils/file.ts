import fs from "node:fs";
import yaml from "js-yaml";

export const parseOpenApiFile = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, "utf8");

  try {
    const yamlObject = yaml.load(fileContent);

    if (yamlObject && typeof yamlObject === "object") {
      return yamlObject;
    }
  } catch (e) {
    try {
      const jsonObject = JSON.parse(fileContent);
      return jsonObject;
    } catch (jsonError) {
      throw new Error("The file is neither a valid YAML nor JSON.");
    }
  }
};
