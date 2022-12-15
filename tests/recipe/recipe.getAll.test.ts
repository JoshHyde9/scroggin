import { Recipe } from "@prisma/client";
import { describe, expect, it } from "vitest";
import { appRouter } from "../../src/server/router";
import { createContextInner } from "../../src/server/router/context";

describe("recipe@getAll", async () => {
  const ctx = await createContextInner({ session: null });
  const caller = appRouter.createCaller(ctx);

  const recipes = await caller.query("recipe.getAll");

  it("should get an array of recipes with valid keys", () => {
    expect(recipes).toEqual(
      expect.arrayContaining<Recipe>([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          displayImage: expect.any(String),
          ingredients: expect.any(String),
          method: expect.any(String),
          tags: expect.any(Array<string>),
          userId: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ])
    );
  });
});
