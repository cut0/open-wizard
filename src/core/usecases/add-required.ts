import type { OpenAPIV3_1 } from "openapi-types";
import { traverseSchemaObject } from "../traverser";

export const addRequiredOption = (obj: OpenAPIV3_1.SchemaObject) => {
  if (obj.type === "object") {
    const properties = Object.keys(obj.properties ?? {});

    if (properties.length !== 0 && obj.required == null) {
      obj.required = [];
    }

    for (const key of properties) {
      obj.required?.push(key);
    }
  }
};

export const createAddRequired = () => (baseDoc: OpenAPIV3_1.Document) => {
  {
    /**
     * NOTE
     * - components.schemas
     */
    const componentSchemas = Object.values(baseDoc.components?.schemas ?? {});
    for (const schema of componentSchemas) {
      traverseSchemaObject({ obj: schema, onMatch: addRequiredOption });
    }
  }
  {
    /**
     * NOTE
     * - paths.*.*.responses.*.content.*.schema
     */
    const contentSchemas = Object.values(baseDoc.paths ?? {})
      .flatMap((path) =>
        path != null
          ? [
              path.get,
              path.post,
              path.put,
              path.delete,
              path.options,
              path.head,
              path.patch,
              path.trace,
            ].filter((x) => x != null)
          : [],
      )
      .flatMap((path) => Object.values(path?.responses ?? {}))
      .flatMap((response) => {
        if ("$ref" in response) {
          return [];
        }
        return Object.values(response.content ?? {});
      })
      .flatMap((content) => {
        if (content.schema == null || "$ref" in content.schema) {
          return [];
        }
        return [{ schema: content.schema }];
      });

    for (const { schema } of contentSchemas) {
      traverseSchemaObject({ obj: schema, onMatch: addRequiredOption });
    }
  }

  return baseDoc;
};
