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

      const recipe = await ctx.prisma.recipe.findUnique({ where: { id } });

      if (!recipe) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Recipe not found. ",
        });
      }

      const recipeCreator = recipe.userId;

      if (loggedInUser.id !== recipeCreator) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to delete other people's recipes.",
        });
      }

      await ctx.prisma.recipe.delete({
        where: { id },
      });

      return true;
    },
  })
  .mutation("edit", {
    input: backendCreateRecipeSchema.extend({ id: z.string() }),
    async resolve({ ctx, input }) {
      const { id, name, displayImage, method, ingredients, tags } = input;

      const loggedInUser = ctx.session.user;

      const recipe = await ctx.prisma.recipe.findUnique({ where: { id } });

      if (!recipe) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Recipe does not exist. ",
        });
      }

      if (loggedInUser.id !== recipe.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to delete other people's recipes.",
        });
      }

      const updateRecipe = await ctx.prisma.recipe.update({
        where: { id },
        data: { name, displayImage, method, ingredients, tags },
      });

      return updateRecipe;
    },
  });
