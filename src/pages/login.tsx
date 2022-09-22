import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";

import { ILogin, loginSchema } from "../server/common/schemas";
import { signIn } from "next-auth/react";
import { useState } from "react";

const Login: NextPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    const result = await signIn("credentials", {
      ...data,
      callbackUrl: "/",
      redirect: false,
    });

    if (!result?.ok) {
      setError(result!.error!);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center mt-3">
      <h1 className="text-5xl mb-3">Login</h1>
      <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none"
              autoComplete="off"
              placeholder="Email..."
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message?.startsWith("F")
                  ? "Field is required."
                  : "Invalid email."}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-wrap mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none"
              type="password"
              placeholder="Password..."
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-xs text-red-500">Field is required.</span>
            )}
          </div>
        </div>

        {error && (
          <div className="flex flex-wrap mb-2 px-3">
            <p className="leading-relaxed text-xs text-red-500">{error}</p>
          </div>
        )}

        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
