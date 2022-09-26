import { GetServerSidePropsContext, NextPage, PreviewData } from "next/types";
import { useState } from "react";
import { useRouter } from "next/router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { prisma } from "../../../server/db/client";
import { trpc } from "../../../utils/trpc";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import {
  backendCreateRecipeSchema,
  ICreateBackendRecipe,
} from "../../../server/common/schemas";

import { Tiptap } from "../../../components/TipTap";
import { ParsedUrlQuery } from "querystring";
import { Recipe } from "@prisma/client";

interface PageProps {
  recipe: Recipe | null;
}

/* TODO:
 * Work out why I have to force the page props instead of getting inference like I did with page /recipe/[id].tsx
 * Turn this form into a custom hook
 */

const EditRecipe: NextPage<PageProps> = ({ recipe }: PageProps) => {
  const router = useRouter();
  const [error, setError] = useState("");

  const { mutate: editRecipe } = trpc.useMutation(["recipe.edit"], {
    onSuccess: ({ id }) => {
      setError("");
      router.push(`/recipe/${id}`);
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

  if (!recipe) {
    return <div>loading...</div>;
  }

  const onSubmit: SubmitHandler<ICreateBackendRecipe> = async (data) => {
    editRecipe({ id: recipe.id, ...data });
    setError("");
  };

  return (
    <div className="flex flex-col items-center mt-3">
      <h1 className="text-5xl mb-3">Edit your recipe</h1>
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
              defaultValue={recipe.name}
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
              defaultValue={recipe.displayImage}
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
              defaultValue={recipe.ingredients}
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
              defaultValue={recipe.method}
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
              defaultValue={recipe.tags}
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
            Edit recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const userSession = await getServerAuthSession(context);

  // Re-route to home page if the user is not logged in
  if (!userSession) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const id = context.query.id as string | undefined;

  // Re-route to the home page if there is no id provided
  if (!id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let recipe = await prisma.recipe.findFirst({ where: { id } });

  // Don't pass anything into the page if the recipe is undefined
  // TODO: Route to 404 page
  if (!recipe) {
    return {
      props: {},
    };
  }

  const recipeCreator = await prisma.user.findFirst({
    where: { id: recipe.userId },
    select: { id: true, firstName: true, lastName: true, image: true },
  });

  // Re-route to home page if the logged in user is not the owner of the recipe
  if (!recipeCreator) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  recipe = JSON.parse(JSON.stringify(recipe));

  return {
    props: { recipe },
  };
};

export default EditRecipe;
