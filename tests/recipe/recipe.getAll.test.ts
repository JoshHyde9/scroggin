import { Recipe } from "@prisma/client";
import { describe, expect, it } from "vitest";

import { loggedOutCaller } from "../data";

describe("recipe@getAll", async () => {
  const recipes = await loggedOutCaller.query("recipe.getAll");

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
