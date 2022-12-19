import { TRPCError } from "@trpc/server";
import { describe, expect, it } from "vitest";

import { loggedInCaller, loggedOutCaller, loggedOutCtx } from "../data";

const itif = (condition: boolean) => (condition ? it : it.skip);

describe("recipe@like", async () => {
  const recipe = await loggedOutCtx.prisma.recipe.findFirstOrThrow({
    include: { _count: { select: { likes: true } }, likes: true },
  });

  it("should return 401 UNAUTHORIZED if a logged out user tries to like a recipe", async () => {
    await expect(async () => {
      await loggedOutCaller.mutation("recipe.like", { id: recipe.id });
    }).rejects.toThrow(
      new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorised." })
    );
  });

  it("should return 400 BAD REQUEST when the recipe does not exist", async () => {
    await expect(async () => {
      await loggedInCaller.mutation("recipe.like", {
        id: `${recipe.id}d`,
      });
    }).rejects.toThrow(
      new TRPCError({ code: "BAD_REQUEST", message: "Recipe does not exist." })
    );
  });

  const like = await loggedInCaller.mutation("recipe.like", {
    id: recipe.id,
  });

  const likedRecipe = await loggedOutCtx.prisma.recipe.findFirstOrThrow({
    include: { _count: { select: { likes: true } }, likes: true },
  });

  itif(typeof like === "boolean")(
    "should return true if the user unlikes the recipe",
    () => {
      expect(like).toStrictEqual(true);
    }
  );

  itif(typeof like === "object")(
    "like should exist on the recipe",
    async () => {
      expect(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        likedRecipe.likes.some((recipeLikes) => recipeLikes.id === like.id)
      ).toBe(true);
    }
  );

  itif(typeof like === "object")(
    "recipe should have it's like count increased by one",
    () => {
      expect(likedRecipe._count.likes).toStrictEqual(recipe._count.likes + 1);
    }
  );
});
