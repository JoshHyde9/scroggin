import { useState } from "react";
import { NextPage } from "next";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ICreateRecipe, createRecipeSchema } from "../../server/common/schemas";
import Tiptap from "../../components/TipTap";

const CreateRecipe: NextPage = () => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreateRecipe>({
    resolver: zodResolver(createRecipeSchema),
  });

  const onSubmit: SubmitHandler<ICreateRecipe> = async (data) => {
    console.log(data);
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
              htmlFor="ingredients"
            >
              Ingredients:
            </label>
            <Controller
              control={control}
              name="ingredients"
              render={({ field }) => {
                return (
                  <Tiptap description={field.value} onChange={field.onChange} />
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
                  <Tiptap description={field.value} onChange={field.onChange} />
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
              placeholder="Dinner, easy"
              {...register("tags", { required: true })}
            />
            {errors.tags && (
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
