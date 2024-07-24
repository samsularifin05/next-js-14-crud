import { z } from "zod";

export const CreateUserRequestDto = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required")
  })
  .strict();

export type CreateUserRequestDto = z.infer<typeof CreateUserRequestDto>;
