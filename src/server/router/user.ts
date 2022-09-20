import { createRouter } from "./context";
import { registerSchema } from "../common/schemas";
import { TRPCError } from "@trpc/server";
import { hash } from "argon2";

export const userRouter = createRouter().mutation("register", {
  input: registerSchema,
  resolve: async ({ input, ctx }) => {
    const { firstName, lastName, email, password, confirmPassword } = input;

    if (password.trim() !== confirmPassword.trim()) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Passwords must match.",
      });
    }

    const user = await ctx.prisma.user.findFirst({
      where: { email },
    });

    if (user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Email is already in use.",
      });
    }

    try {
      const hashedPassword = await hash(password);

      const newUser = await ctx.prisma.user.create({
        data: { firstName, lastName, email, password: hashedPassword },
      });

      return {
        status: 201,
        message: "Account created successfully.",
        user: newUser,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Server crapped itself, please try again.",
      });
    }
  },
});
