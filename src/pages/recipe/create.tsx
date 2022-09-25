import { useState } from "react";
import { NextPage } from "next";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  backendCreateRecipeSchema,
  ICreateBackendRecipe,
} from "../../server/common/schemas";
import { trpc } from "../../utils/trpc";

import { Tiptap } from "../../components/TipTap";

const CreateRecipe: NextPage = () => {
  const [error, setError] = useState("");

  const { mutate } = trpc.useMutation("recipe.create", {
    onSuccess: () => {
      setError("");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreateBackendRecipe>({
    resolver: zodResolver(backendCreateRecipeSchema),
  });

  const onSubmit: SubmitHandler<ICreateBackendRecipe> = async (data) => {
    mutate(data);
    setError("");
  };

  return (
    <div className="flex flex-col items-center mt-3">
      <h1 className="text-5xl mb-3">Create a recipe</h1>
      <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none"
              autoComplete="off"
              placeholder="Pan-fried kangaroo fillets with snow peas"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-xs text-red-500">Field is required.</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="image"
            >
              Image:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none"
              autoComplete="off"
              placeholder="https://static01.nyt.com/images/2021/04/07/dining/06croissantsrex1/merlin_184841898_ccc8fb62-ee41-44e8-9ddf-b95b198b88db-master768.jpg"
              {...register("displayImage", { required: true })}
            />
            <p className="text-xs italic">
              note: this image is to a url (this may change in the future)
            </p>
            {errors.displayImage && (
              <span className="text-xs text-red-500">Field is required.</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="ingredients"
            >
              Ingredients:
            </label>
            <Controller
              control={control}
              name="ingredients"
              render={({ field }) => {
                return (
                  <Tiptap
                    content={field.value}
                    onChange={field.onChange}
                    editable={true}
                  />
                );
              }}
              rules={{ required: true }}
            />
            {errors.ingredients && (
              <span className="text-xs text-red-500">Field is required.</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="method"
            >
              Method:
            </label>
            <Controller
              control={control}
              name="method"
              render={({ field }) => {
                return (
                  <Tiptap
                    content={field.value}
                    onChange={field.onChange}
                    editable={true}
                  />
                );
              }}
              rules={{ required: true }}
            />
            {errors.method && (
              <span className="text-xs text-red-500">Field is required.</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="tags"
            >
              Tags:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none"
              autoComplete="off"
              placeholder="Dinner, Easy"
              {...register("tags", { required: true })}
            />
            {errors.name && (
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
            Create recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
