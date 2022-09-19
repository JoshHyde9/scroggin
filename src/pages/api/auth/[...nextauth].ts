import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verify } from "argon2";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "../../../server/db/client";

import { loginSchema } from "../../../server/common/schemas";

export const authOptions: NextAuthOptions = {
  jwt: {
    maxAge: 10 * 24 * 60 * 60, // 10 days
  },
  pages: { signIn: "/login", newUser: "/register" },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session({ session, token }) {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email..." },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password...",
        },
      },
      authorize: async (credentials, req) => {
        const userCreds = await loginSchema.parseAsync(credentials);

        const user = await prisma.user.findFirst({
          where: { email: userCreds.email },
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await verify(user.password, userCreds.password);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
