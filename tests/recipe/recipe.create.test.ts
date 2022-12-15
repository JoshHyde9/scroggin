import { describe, expect, it } from "vitest";
import { TRPCError } from "@trpc/server";
import { Recipe } from "@prisma/client";

import { appRouter } from "../../src/server/router";
import { createContextInner } from "../../src/server/router/context";

import { ICreateBackendRecipe } from "../../src/server/common/schemas";

describe("recipe@create", async () => {
  const loggedOutCtx = await createContextInner({ session: null });
  const caller = appRouter.createCaller(loggedOutCtx);

  const newRecipe: ICreateBackendRecipe = {
    name: "Croissant",
    ingredients: "Do something",
    method: "Do something",
    displayImage:
      "https://static01.nyt.com/images/2021/04/07/dining/06croissantsrex1/merlin_184841898_ccc8fb62-ee41-44e8-9ddf-b95b198b88db-master768.jpg",
    tags: "Baking,Dessert",
  };

  it("should return 401 UNAUTHORIZED if a user tries to create a new recipe and is not logged in", async () => {
    await expect(async () => {
      await caller.mutation("recipe.create", newRecipe);
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

  const loggedInCaller = appRouter.createCaller(loggedInCtx);

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
