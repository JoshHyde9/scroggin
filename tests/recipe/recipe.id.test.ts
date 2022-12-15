import { Recipe } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { describe, expect, it } from "vitest";

import { loggedOutCaller, loggedOutCtx } from "../data";

describe("recipe@getByID", async () => {
  it("should return 404 NOT FOUND if the recipe does not exist", async () => {
    await expect(async () => {
      await loggedOutCaller.query("recipe.getByID", { id: "dsajkjdskal" });
    }).rejects.toThrow(
      new TRPCError({ code: "NOT_FOUND", message: "Recipe not found." })
    );
  });

  const firstRecipe = await loggedOutCtx.prisma.recipe.findFirstOrThrow();

  const recipe = await loggedOutCaller.query("recipe.getByID", {
    id: firstRecipe.id,
  });

  it("should get a recipe when the id exists", () => {
    expect(recipe).toMatchObject<Recipe>({
      id: expect.any(String),
      name: expect.any(String),
      displayImage: expect.any(String),
      ingredients: expect.any(String),
      method: expect.any(String),
      tags: expect.any(Array<string>),
      userId: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
