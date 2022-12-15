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
          message: "No recipes were found.",
        });
      }

      return allRecipes;
    },
  })
  .query("getByID", {
    input: z.object({ id: z.string().optional() }),
    async resolve({ ctx, input }) {
      const { id } = input;

      if (!id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Recipe not found.",
        });
      }

      const recipe = await ctx.prisma.recipe.findUnique({
        where: { id },
      });

      if (!recipe) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Recipe not found.",
        });
      }

      return recipe;
    },
  })
  .query("getRecipeAndCreatorByID", {
    input: z.object({ recipeId: z.string() }),
    async resolve({ ctx, input }) {
      const { recipeId } = input;

      const recipeAndCreator = await ctx.prisma.recipe.findUnique({
        where: { id: recipeId },
        include: {
          _count: { select: { likes: true } },
          user: {
            select: { firstName: true, lastName: true, id: true, image: true },
          },
        },
      });

      return recipeAndCreator;
    },
  })
  .query("hasUserLikedRecipe", {
    input: z.object({
      userId: z.string().optional(),
      recipeId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { userId, recipeId } = input;

      if (!userId) {
        return null;
      }

      const isLiked = await ctx.prisma.like.findFirst({
        where: { userId, recipeId },
      });

      return isLiked;
    },
  })
  .query("getUserLikes", {
    input: z.object({ userId: z.string().optional() }),
    async resolve({ ctx, input }) {
      const { userId } = input;

      if (!userId) {
        return null;
      }

      const userLikedRecipes = await ctx.prisma.recipe.findMany({
        include: {
          likes: { where: { userId } },
          _count: { select: { likes: true } },
        },
      });

      if (!userLikedRecipes) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User does not have any likes recipes.",
        });
      }

      return userLikedRecipes;
    },
  })
  .query("getRecipeCreator", {
    input: z.object({ userId: z.string() }),
    async resolve({ ctx, input }) {
      const { userId } = input;
      const recipeCreator = await ctx.prisma.user.findUnique({
        where: { id: userId },
      });

      return recipeCreator;
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
          message: "Recipe does not exist.",
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
          message: "Recipe does not exist.",
        });
      }

      if (loggedInUser.id !== recipe.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to delete other people's recipes.",
        });
      }

      const tagArray = tags.replace(/ /g, "").split(",");

      const updateRecipe = await ctx.prisma.recipe.update({
        where: { id },
        data: { name, displayImage, method, ingredients, tags: tagArray },
      });

      return updateRecipe;
    },
  })
  .mutation("like", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;

      const loggedInUser = ctx.session.user;

      const recipe = await ctx.prisma.recipe.findUnique({
        where: { id },
        include: {
          likes: { where: { userId: loggedInUser.id, recipeId: id } },
        },
      });

      if (!recipe) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Recipe does not exist. ",
        });
      }

      if (!recipe.likes[0]) {
        return ctx.prisma.like.create({
          data: { userId: loggedInUser.id, recipeId: recipe.id },
        });
      } else {
        return ctx.prisma.like.deleteMany({
          where: { id: recipe.likes[0].id },
        });
      }
    },
  });
