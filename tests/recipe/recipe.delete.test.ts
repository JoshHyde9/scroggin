import { TRPCError } from "@trpc/server";
import { describe, expect, it } from "vitest";
import {
  loggedInCaller,
  loggedInCtx,
  loggedOutCaller,
  loggedOutCtx,
} from "../data";

describe("recipe@delete", async () => {
  const recipe = await loggedOutCtx.prisma.recipe.findFirstOrThrow();

  it("should return 401 UNAUTHORIZED if a user tries to delete an existing recipe and is not logged in", async () => {
    await expect(async () => {
      await loggedOutCaller.mutation("recipe.delete", { id: recipe.id });
    }).rejects.toThrow(
      new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorised." })
    );
  });

  it("should return 400 BAD REQUEST when the recipe does not exist", async () => {
    await expect(async () => {
      await loggedInCaller.mutation("recipe.delete", {
        id: `${recipe.id}d`,
      });
    }).rejects.toThrow(
      new TRPCError({ code: "BAD_REQUEST", message: "Recipe does not exist." })
    );
  });

  it("should return 403 FORBIDDEN when the logged in user tries to delete another user's recipe", async () => {
    await expect(async () => {
      await loggedInCaller.mutation("recipe.delete", { id: recipe.id });
    }).rejects.toThrow(
      new TRPCError({
        code: "FORBIDDEN",
        message: "You are not allowed to delete other people's recipes.",
      })
    );
  });

  it("should successfully delete a recipe and return true", async () => {
    const recipe = await loggedInCtx.prisma.recipe.findFirstOrThrow({
      where: { userId: loggedInCtx.session?.user.id },
    });

    const deletedRecipe = await loggedInCaller.mutation("recipe.delete", {
      id: recipe.id,
    });

    expect(deletedRecipe).toStrictEqual(true);
  });
});
