import { z } from "zod";

export const UpdateUserRequestDto = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format")
});

export type UpdateUserRequestDto = z.infer<typeof UpdateUserRequestDto>;
