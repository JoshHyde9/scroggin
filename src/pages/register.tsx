import type { NextPage } from "next";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { IRegister } from "../server/common/schemas";
import { trpc } from "../utils/trpc";

// TODO: Render tRPC errors
const Register: NextPage = () => {
  const router = useRouter();
  const { mutateAsync } = trpc.useMutation("user.register", {
    onSuccess: () => {
      console.log("Logged in!");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();

  const onSubmit = useCallback(
    async (data: IRegister) => {
      const result = await mutateAsync(data);

      if (result.staus === 201) {
        router.push("/");
      }
    },
    [mutateAsync, router]
  );

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
              type="email"
              autoComplete="off"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-xs text-red-500">Field is required.</span>
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
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
