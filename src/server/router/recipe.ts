import { createRouter } from "./context";
import { TRPCError } from "@trpc/server";
import { recipeSchema } from "../common/schemas";

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
    input: recipeSchema,
    async resolve({ ctx, input }) {
      const { name, ingredients, method, tags } = input;

      const tagArray = tags.replace(/ /g, "").split(",");

      console.log(tagArray);

      const user = ctx.session.user;

      if (
        name.trim() === "" ||
        ingredients.trim() === "" ||
        method.trim() === "" ||
        tags.length <= 0
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please fill in required field. ",
        });
      }

      const newRecipe = await ctx.prisma.recipe.create({
        data: { name, ingredients, method, tags: tagArray, userId: user.id },
      });

      return newRecipe;
    },
  });
