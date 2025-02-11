import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import type { OpenAPIV3_1 } from "openapi-types";
import { addRequiredOption, createAddRequired } from "./add-required";

describe(addRequiredOption.name, () => {
  test("success", () => {
    const obj = {
      type: "object",
      properties: {
        prop1: {},
        prop2: {},
        prop3: {},
      },
    };

    addRequiredOption(obj as never);

    expect(obj).toEqual({
      type: "object",
      properties: {
        prop1: {},
        prop2: {},
        prop3: {},
      },
      required: ["prop1", "prop2", "prop3"],
    });
  });
});

describe(createAddRequired.name, () => {
  test("success", () => {
    const addRequired = createAddRequired();

    const res = addRequired(
      yaml.load(
        fs.readFileSync(
          path.join(__dirname, "../__test__/required-test-input.yml"),
          "utf8",
        ),
      ) as OpenAPIV3_1.Document,
    );

    expect(yaml.dump(res)).toBe(
      fs
        .readFileSync(
          path.join(__dirname, "../__test__/required-test-output.yml"),
          "utf8",
        )
        .replaceAll('"', "'"),
    );
  });
});
