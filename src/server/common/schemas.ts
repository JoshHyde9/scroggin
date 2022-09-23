import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const registerSchema = loginSchema.extend({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  confirmPassword: z.string().min(4),
});

export type ILogin = z.infer<typeof loginSchema>;
export type IRegister = z.infer<typeof registerSchema>;

export const recipeSchema = z.object({
  name: z.string().min(1),
  ingredients: z.string().min(1),
  method: z.string().min(1),
  tags: z.array(z.string()).nonempty(),
  likeCount: z.number(),
});

export type IRecipe = z.infer<typeof recipeSchema>;
