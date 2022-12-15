import { createContextInner } from "../src/server/router/context";
import { prisma } from "../src/server/db/client";
import { ICreateBackendRecipe } from "../src/server/common/schemas";
import { appRouter } from "../src/server/router";

// Logged out user
export const loggedOutCtx = await createContextInner({ session: null });
export const loggedOutCaller = appRouter.createCaller(loggedOutCtx);

// Logged in user
export const user = await prisma.user.findFirstOrThrow();
export const loggedInCtx = await createContextInner({
  session: {
    user,
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
  },
});
export const loggedInCaller = appRouter.createCaller(loggedInCtx);

// Recipe
export const newRecipe: ICreateBackendRecipe = {
  name: "Croissant",
  ingredients: "Do something",
  method: "Do something",
  displayImage:
    "https://static01.nyt.com/images/2021/04/07/dining/06croissantsrex1/merlin_184841898_ccc8fb62-ee41-44e8-9ddf-b95b198b88db-master768.jpg",
  tags: "Baking,Dessert",
};
