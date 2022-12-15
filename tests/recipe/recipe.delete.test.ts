import { TRPCError } from "@trpc/server";
import { describe, expect, it } from "vitest";
import { loggedOutCaller, loggedOutCtx } from "../data";

describe("recipe@delete", async () => {
  const recipe = await loggedOutCtx.prisma.recipe.findFirstOrThrow();

  it("should return 401 UNAUTHORIZED if a user tries to create a new recipe and is not logged in", async () => {
    await expect(async () => {
      await loggedOutCaller.mutation("recipe.delete", { id: recipe.id });
    }).rejects.toThrow(
      new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorised." })
    );
  });
});
