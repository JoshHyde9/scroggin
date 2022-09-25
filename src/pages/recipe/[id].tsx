import { Recipe, User } from "@prisma/client";
import {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
  PreviewData,
} from "next";
import { useRouter } from "next/router";
import { Session } from "next-auth";
import dayjs from "dayjs";
import Image from "next/image";

import { prisma } from "../../server/db/client";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { trpc } from "../../utils/trpc";

import { RecipeTags } from "../../components/RecipeTags";
import { Tiptap } from "../../components/TipTap";
import { ParsedUrlQuery } from "querystring";

const RecipePage: NextPage = ({
  recipe,
  recipeCreator,
  userSession,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const { mutate: deleteRecipe } = trpc.useMutation(["recipe.delete"], {
    onSuccess: () => {
      router.push("/");
    },
  });

  if (!recipe || !recipeCreator) {
    return <div>loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-5xl">
      <h1 className="text-4xl text-center italic">{recipe.name}</h1>
      <div className="relative h-80 w-3/5 block mx-auto my-5">
        <Image
          src={recipe.displayImage}
          layout="fill"
          className="h-full w-full rounded-3xl"
          alt="Photo of recipe"
          priority
        />
      </div>
      <div className="max-w-md mx-auto my-2">
        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
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
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <p>{recipe.likeCount}</p>
          </div>
          <p>{dayjs(recipe.createdAt.toString()).format("DD/MM/YYYY HH:mm")}</p>
        </div>
        <RecipeTags tags={recipe.tags} classes="justify-center" />
      </div>
      <div className="flex flex-row gap-10">
        <div className="w-1/3">
          <h2 className="text-2xl mb-2">Ingredients: </h2>
          <Tiptap content={recipe.ingredients} editable={false} />
        </div>
        <div className="w-2/3">
          <h2 className="text-2xl mb-2">Method: </h2>
          <Tiptap content={recipe.method} editable={false} />
        </div>
      </div>

      <div className="flex justify-between">
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
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const id = context.query.id as string | undefined;

  if (!id) {
    return {
      props: {},
    };
  }

  const userSession = await getServerAuthSession(context);

  let recipe = await prisma.recipe.findFirst({ where: { id } });

  if (!recipe) {
    return {
      props: {},
    };
  }

  const recipeCreator = await prisma.user.findFirst({
    where: { id: recipe.userId },
    select: { id: true, firstName: true, lastName: true, image: true },
  });

  recipe = JSON.parse(JSON.stringify(recipe));

  return {
    props: { recipe, recipeCreator, userSession },
  };
};

export default RecipePage;
