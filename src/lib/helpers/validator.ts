// src/utils/validator.ts

import { ZodSchema } from "zod";

export function validateSchema<T>(schema: ZodSchema, data: T) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errorMessages = result.error.errors
      .map((err) => {
        if (err.code === "unrecognized_keys") {
          const unrecognizedKeys = err.keys
            ? err.keys.join(", ")
            : "Unknown keys";
          return `Validation failed ${unrecognizedKeys} not allowed`;
        }
        if (err.message.includes("Duplicate entry")) {
          return "A record with this email already exists.";
        }
        return `${err.path[0]}: ${err.message}`;
      })
      .join(", ");

    return { isValid: false, errors: errorMessages };
  }
  return { isValid: true, data: result.data };
}
