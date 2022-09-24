import { createRouter } from "./context";
import { TRPCError } from "@trpc/server";
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
  });
