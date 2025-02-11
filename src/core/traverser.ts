import type { OpenAPIV3_1 } from "openapi-types";

type Payload = {
  obj: OpenAPIV3_1.SchemaObject;
  onMatch?: (_: OpenAPIV3_1.SchemaObject) => void;
};

export const traverseSchemaObject = ({ obj, onMatch }: Payload) => {
  const search = (obj: OpenAPIV3_1.SchemaObject) => {
    if (obj.type !== "object" && obj.type !== "array") {
      onMatch?.(obj);
      return;
    }

    /**
     * NOTE: Handle array of objects
     */
    if (obj.type === "array") {
      onMatch?.(obj);

      if (!("$ref" in obj.items)) {
        const items: OpenAPIV3_1.SchemaObject = obj.items;
        search(items);
      }
    }

    /**
     * NOTE: Handle object
     */
    if (obj.type === "object") {
      onMatch?.(obj);
      const properties = Object.values(obj.properties ?? {});

      for (const prop of properties) {
        if ("$ref" in prop) {
          continue;
        }

        search(prop);
      }
    }
  };

  search(obj);
};
