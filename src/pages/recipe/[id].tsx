import {
  NextPage,
  GetStaticPropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "next";
import { createSSGHelpers } from "@trpc/react/ssg";
import superjson from "superjson";

import { useRouter } from "next/router";
import dayjs from "dayjs";
import Image from "next/image";
import NextLink from "next/link";

import { prisma } from "../../server/db/client";
import { trpc } from "../../utils/trpc";

import { RecipeTags } from "../../components/RecipeTags";
import { Tiptap } from "../../components/TipTap";
import { appRouter } from "../../server/router";
import { createContextInner } from "../../server/router/context";
import { useSession } from "next-auth/react";
import { RecipeLoadingSkeleton } from "../../components/layout/RecipeLoadingSkeleton";

const RecipePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  id,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const utils = trpc.useContext();
  const router = useRouter();
  const { data: userSession } = useSession();

  if (!id) {
    return <div>loading...</div>;
  }

  const recipeQuery = trpc.useQuery(["recipe.getByID", { id }]);

  if (recipeQuery.status !== "success") {
    return <div>loading...</div>;
  }

  const { data: recipe } = recipeQuery;

  const { mutate: deleteRecipe } = trpc.useMutation(["recipe.delete"], {
    onSuccess: () => {
      router.push("/");
    },
  });

  if (!recipe || !recipe.userId) {
    return <div>loading...</div>;
  }

  const isRecipeLikedQuery = trpc.useQuery([
    "recipe.hasUserLikedRecipe",
    { recipeId: recipe.id, userId: userSession?.user?.id },
  ]);

  const { data: isRecipeLiked } = isRecipeLikedQuery;

  const { mutate: likeRecipe } = trpc.useMutation(["recipe.like"], {
    onSuccess: () => {
      utils.invalidateQueries(["recipe.getByID", { id: recipe.id }]);
      utils.invalidateQueries([
        "recipe.hasUserLikedRecipe",
        { userId: userSession?.user?.id, recipeId: recipe.id },
      ]);
    },
  });

  const { data: recipeCreator } = trpc.useQuery([
    "recipe.getRecipeCreator",
    { userId: recipe.userId },
  ]);

  if (!recipeCreator) {
    return <RecipeLoadingSkeleton />;
  }

  return (
    <div className="container mx-auto max-w-5xl">
      <h1 className="text-4xl text-center italic">{recipe.name}</h1>
      <div className="relative h-60 w-11/12 block mx-auto my-5 lg:w-1/2">
        <Image
          src={recipe.displayImage}
          layout="fill"
          className="h-full w-full px-5 rounded-3xl"
          alt="Photo of recipe"
          priority
        />
      </div>
      <div className="max-w-md mx-auto my-2 px-5">
        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            {!userSession?.user ? (
              <NextLink href="/login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="hover:cursor-pointer hover:fill-red-400 hover:stroke-red-400 ease-in-out duration-300"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </NextLink>
            ) : (
              <button onClick={() => likeRecipe({ id: recipe.id })}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={
                    isRecipeLiked
                      ? "stroke-red-500 fill-red-500 hover:fill-red-400 hover:stroke-red-400 ease-in-out duration-300"
                      : "hover:fill-red-400 hover:stroke-red-400 ease-in-out duration-300"
                  }
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            )}

            <p>{recipe.likeCount}</p>
          </div>
          <p>{dayjs(recipe.createdAt.toString()).format("DD/MM/YYYY HH:mm")}</p>
        </div>
        <RecipeTags tags={recipe.tags} classes="justify-center" />
      </div>
      <div className="flex flex-col gap-10 px-5 lg:flex-row">
        <div className="w-full lg:w-1/3">
          <h2 className="text-2xl mb-2">Ingredients: </h2>
          <Tiptap content={recipe.ingredients} editable={false} />
        </div>
        <div className="w-full lg:w-2/3">
          <h2 className="text-2xl mb-2">Method: </h2>
          <Tiptap content={recipe.method} editable={false} />
        </div>
      </div>

      <div className="flex justify-between px-5">
        <div className="flex items-center gap-2">
          <div className="h-12 w-12 relative">
            <Image
              src={recipeCreator.image}
              layout="fill"
              className="rounded-full"
            />
          </div>
          <h3 className="text-lg hover:cursor-pointer hover:text-purple-300 ease-in-out duration-300">
            {recipeCreator.firstName} {recipeCreator.lastName}
          </h3>
        </div>
        {/* If current logged in user is the creator of the recipe */}
        {userSession?.user?.id === recipeCreator.id && (
          <div className="flex items-center gap-2">
            <NextLink href={`/recipe/edit/${recipe.id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-cyan-500 hover:stroke-cyan-400 ease-in-out duration-300 hover:cursor-pointer"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </NextLink>
            <button
              onClick={() => deleteRecipe({ id: recipe.id })}
              className="hover:cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-red-500 hover:stroke-red-400 ease-in-out duration-300"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContextInner(),
    transformer: superjson,
  });

  const id = context.params?.id as string;

  await ssg.fetchQuery("recipe.getByID", { id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = await prisma.recipe.findMany({
    select: { id: true },
  });

  return {
    paths: recipes.map((recipe) => ({
      params: {
        id: recipe.id,
      },
    })),
    fallback: "blocking",
  };
};

export default RecipePage;
