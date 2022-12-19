import { Prisma } from "@prisma/client";
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

export const createRecipeSchema = z.object({
  name: z.string().min(1),
  displayImage: z.string().url(),
  ingredients: z.string().min(1),
  method: z.string().min(1),
});

export const frontendCreateRecipeSchema = createRecipeSchema.extend({
  id: z.string(),
  tags: z.array(z.string()).min(1),
});

export const backendCreateRecipeSchema = createRecipeSchema.extend({
  tags: z.string().min(1),
});

export const recipeSchema = frontendCreateRecipeSchema.extend({
  likes: z.array(z.object({ userId: z.string(), recipeId: z.string() })),
  createdAt: z.date(),
});

export type ICreateFontendRecipe = z.infer<typeof frontendCreateRecipeSchema>;
export type ICreateBackendRecipe = z.infer<typeof backendCreateRecipeSchema>;
export type IRecipe = z.infer<typeof recipeSchema>;

export const likeSchema = z.object({
  userId: z.string().min(1),
  recipeId: z.string().min(1),
});
export type ILike = z.infer<typeof likeSchema>;

const editRecipeSchema = backendCreateRecipeSchema.extend({
  id: z.string(),
});

export type EditRecipeSchema = z.infer<typeof editRecipeSchema>;

export const updateUserSchema = registerSchema.extend({
  image: z.string().url(),
});

export type IUpdateUserSchema = z.infer<typeof updateUserSchema>;

export type RecipeWithLikes = Prisma.RecipeGetPayload<{
  include: {
    _count: {
      select: { likes: true };
    };
  };
}>;

export type RecipeWithUserAndLikes = Prisma.RecipeGetPayload<{
  include: {
    _count: {
      select: { likes: true };
    };
    user: {
      select: { firstName: true; lastName: true; id: true; image: true };
    };
  };
}>;
