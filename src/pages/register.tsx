import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";

import { IRegister, registerSchema } from "../server/common/schemas";
import { trpc } from "../utils/trpc";
import { getSession } from "next-auth/react";

const Register: NextPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { mutate } = trpc.useMutation("user.register", {
    onSuccess: () => {
      router.push("/");
    },
    onError: async (error) => {
      setError(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<IRegister> = (data) => {
    setError("");
    mutate(data);
  };

  return (
    <div className="flex flex-col items-center mt-3">
      <h1 className="text-5xl mb-3">Register</h1>
      <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap mb-6">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label
              className="block uppercase tracking-wide text-xs font-bold mb-2"
              htmlFor="firstName"
            >
              First Name:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none"
              {...register("firstName", { required: true })}
              name="firstName"
              autoComplete="off"
            />
            {errors.firstName && (
              <span className="text-xs text-red-500">Field is required.</span>
            )}
          </div>
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label
              className="block uppercase tracking-wide text-xs font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none"
              {...register("lastName", { required: true })}
              name="lastName"
              autoComplete="off"
            />
            {errors.lastName && (
              <span className="text-xs text-red-500">Field is required.</span>
            )}
          </div>
        </div>
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
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-xs text-red-500">Field is required.</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none"
              type="password"
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword && (
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
            className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
export default Register;
