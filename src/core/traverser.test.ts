import { traverseSchemaObject } from "./traverser";

const obj = {
  type: "object",
  description: "root",
  properties: {
    a: {
      type: "string",
      description: "a",
    },
    b: {
      type: "object",
      description: "b",
      properties: {
        c: {
          type: "string",
          description: "c",
        },
      },
    },
    d: {
      type: "array",
      description: "d",
      items: {
        type: "string",
        description: "d item",
      },
    },
    e: {
      type: "array",
      description: "e",
      items: {
        type: "object",
        description: "e item",
        properties: {
          f: {
            type: "string",
            description: "f",
          },
        },
      },
    },
    g: {
      type: "array",
      description: "g",
      items: {
        $ref: "#/components/schemas/RefSchema",
      },
    },
  },
} as never;

describe(traverseSchemaObject.name, () => {
  const onMatch = vitest.fn();

  test("success", () => {
    traverseSchemaObject({ obj, onMatch });

    expect(onMatch.mock.calls).toEqual([
      [
        {
          type: "object",
          description: "root",
          properties: {
            a: {
              type: "string",
              description: "a",
            },
            b: {
              type: "object",
              description: "b",
              properties: {
                c: {
                  type: "string",
                  description: "c",
                },
              },
            },
            d: {
              type: "array",
              description: "d",
              items: {
                type: "string",
                description: "d item",
              },
            },
            e: {
              type: "array",
              description: "e",
              items: {
                type: "object",
                description: "e item",
                properties: {
                  f: {
                    type: "string",
                    description: "f",
                  },
                },
              },
            },
            g: {
              type: "array",
              description: "g",
              items: {
                $ref: "#/components/schemas/RefSchema",
              },
            },
          },
        },
      ],
      [
        {
          type: "string",
          description: "a",
        },
      ],
      [
        {
          type: "object",
          description: "b",
          properties: {
            c: {
              type: "string",
              description: "c",
            },
          },
        },
      ],
      [
        {
          type: "string",
          description: "c",
        },
      ],
      [
        {
          type: "array",
          description: "d",
          items: {
            type: "string",
            description: "d item",
          },
        },
      ],
      [
        {
          type: "string",
          description: "d item",
        },
      ],
      [
        {
          type: "array",
          description: "e",
          items: {
            type: "object",
            description: "e item",
            properties: {
              f: {
                type: "string",
                description: "f",
              },
            },
          },
        },
      ],
      [
        {
          type: "object",
          description: "e item",
          properties: {
            f: {
              type: "string",
              description: "f",
            },
          },
        },
      ],
      [
        {
          type: "string",
          description: "f",
        },
      ],
      [
        {
          type: "array",
          description: "g",
          items: {
            $ref: "#/components/schemas/RefSchema",
          },
        },
      ],
    ]);
  });
});
