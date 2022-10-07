import { createRouter } from "./context";
import { registerSchema, updateUserSchema } from "../common/schemas";
import { TRPCError } from "@trpc/server";
import { hash, verify } from "argon2";
import { z } from "zod";

export const userRouter = createRouter()
  .mutation("register", {
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
  })
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorised." });
    }
    return next({
      ctx: {
        ...ctx,
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  })
  .mutation("update", {
    input: updateUserSchema,
    async resolve({ ctx, input }) {
      const { firstName, lastName, email, password, confirmPassword, image } =
        input;

      // If the user didn't input any information
      if (!firstName || !lastName || !email || !password || !image) {
        return;
      }

      const loggedInUserId = ctx.session.user.id;

      const user = await ctx.prisma.user.findUnique({
        where: { id: loggedInUserId },
      });

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User does not exist.",
        });
      }

      if (user.email !== email) {
        await ctx.prisma.user.update({
          where: { id: loggedInUserId },
          data: { email },
        });
        return user;
      }

      if (user.firstName !== firstName) {
        await ctx.prisma.user.update({
          where: { id: loggedInUserId },
          data: { firstName },
        });
        return user;
      }

      if (user.lastName !== lastName) {
        await ctx.prisma.user.update({
          where: { id: loggedInUserId },
          data: { lastName },
        });
        return user;
      }

      if (password !== confirmPassword) {
        const doesPasswordMatch = verify(user.password, password);

        if (!doesPasswordMatch) {
          const hashedPassword = await hash(password);
          await ctx.prisma.user.update({
            where: { id: loggedInUserId },
            data: { password: hashedPassword },
          });
          return user;
        }

        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Passwords do not match.",
        });
      }

      if (user.image !== image) {
        await ctx.prisma.user.update({
          where: { id: loggedInUserId },
          data: { image },
        });
        return user;
      }
    },
  });
