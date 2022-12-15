import { describe, expect, it } from "vitest";
import { TRPCError } from "@trpc/server";
import { Recipe } from "@prisma/client";

import { createContextInner } from "../../src/server/router/context";
import {
  loggedInCaller,
  loggedOutCaller,
  loggedOutCtx,
  newRecipe,
} from "../data";

describe("recipe@create", async () => {
  it("should return 401 UNAUTHORIZED if a user tries to create a new recipe and is not logged in", async () => {
    await expect(async () => {
      await loggedOutCaller.mutation("recipe.create", newRecipe);
    }).rejects.toThrow(
      new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorised." })
    );
  });

  const user = await loggedOutCtx.prisma.user.findFirstOrThrow();

  const loggedInCtx = await createContextInner({
    session: {
      user: user,
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
    },
  });

  const recipe = await loggedInCaller.mutation("recipe.create", newRecipe);

  it("should return the newly created recipe", async () => {
    expect(recipe).toMatchObject<Recipe>({
      id: recipe.id,
      name: newRecipe.name,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      userId: loggedInCtx.session!.user.id,
      displayImage: newRecipe.displayImage,
      ingredients: newRecipe.ingredients,
      method: newRecipe.method,
      tags: recipe.tags,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
