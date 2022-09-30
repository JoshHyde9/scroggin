import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
  PreviewData,
} from "next/types";
import { ParsedUrlQuery } from "querystring";

import { prisma } from "../server/db/client";
import { IRecipe } from "../server/common/schemas";
import { getServerAuthSession } from "../server/common/get-server-auth-session";

import { RecipeCard } from "../components/RecipeCard";

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({
  recipes,
  userSession,
  likedRecipes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!recipes) {
    return <div>No recipes found!</div>;
  }

  if (!userSession || !likedRecipes || likedRecipes.length <= 0) {
    return (
      <div className="grid grid-cols-1 gap-10 px-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes.map((recipe: IRecipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 px-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.map((recipe: IRecipe, i) => {
        if (userSession.user!.id === likedRecipes[i]!.userId) {
          return (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              hasLoggedInUserLiked={true}
            />
          );
        }
      })}
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const userSession = await getServerAuthSession(context);

  let recipes = await prisma.recipe.findMany();

  recipes = JSON.parse(JSON.stringify(recipes));

  if (!userSession?.user) {
    return {
      props: {
        recipes,
      },
    };
  }

  let likedRecipes = await prisma.like.findMany({
    where: { userId: userSession.user.id },
  });

  likedRecipes = JSON.parse(JSON.stringify(likedRecipes));

  if (!likedRecipes) {
    return { props: { recipes, userSession } };
  }

  return {
    props: { recipes, userSession, likedRecipes },
  };
};

export default Home;
