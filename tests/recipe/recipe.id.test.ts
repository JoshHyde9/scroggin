import { Recipe } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { describe, expect, it } from "vitest";
import { appRouter } from "../../src/server/router";
import { createContextInner } from "../../src/server/router/context";

describe("recipe@getByID", async () => {
  const ctx = await createContextInner({ session: null });
  const caller = appRouter.createCaller(ctx);

  it("should return 404 NOT FOUND if the recipe does not exist", async () => {
    await expect(async () => {
      await caller.query("recipe.getByID", { id: "dsajkjdskal" });
    }).rejects.toThrow(
      new TRPCError({ code: "NOT_FOUND", message: "Recipe not found." })
    );
  });

  const recipe = await caller.query("recipe.getByID", {
    id: "6afb3dbc-35d4-4dff-86ef-896382d40678",
  });

  it("should get a recipe when the id exists", () => {
    expect(recipe).toMatchObject<Recipe>({
      id: expect.any(String),
      name: expect.any(String),
      displayImage: expect.any(String),
      ingredients: expect.any(String),
      method: expect.any(String),
      tags: expect.any(Array<string>),
      likeCount: expect.any(Number),
      userId: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
