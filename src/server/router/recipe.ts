import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createRouter } from "./context";
import { backendCreateRecipeSchema } from "../common/schemas";

export const recipeRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      const allRecipes = await ctx.prisma.recipe.findMany({
        orderBy: { createdAt: "desc" },
      });

      if (!allRecipes) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No posts were found.",
        });
      }

      return allRecipes;
    },
  })
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorised." });
    }
    return next({
      ctx: {
        ...ctx,
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  })
  .mutation("create", {
    input: backendCreateRecipeSchema,
    async resolve({ ctx, input }) {
      const { name, displayImage, ingredients, method, tags } = input;

      const tagArray = tags.replace(/ /g, "").split(",");

      const user = ctx.session.user;

      const newRecipe = await ctx.prisma.recipe.create({
        data: {
          name,
          displayImage,
          ingredients,
          method,
          tags: tagArray,
          userId: user.id,
        },
      });

      return newRecipe;
    },
  })
  .mutation("delete", {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      const { id } = input;

      const loggedInUser = ctx.session.user;

      const recipeCreator = await ctx.prisma.recipe.findFirst({
        where: { userId: loggedInUser.id },
      });

      if (!recipeCreator) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found." });
      }

      if (loggedInUser.id !== recipeCreator.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to delete other people's recipes.",
        });
      }

      const deleteRecipe = await ctx.prisma.recipe.delete({
        where: { id },
      });
    },
  });
