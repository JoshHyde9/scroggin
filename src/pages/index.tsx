import type { GetStaticProps, NextPage } from "next/types";

import { prisma } from "../server/db/client";
import { ILike, IRecipe } from "../server/common/schemas";

import { RecipeCard } from "../components/RecipeCard";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

interface PageProps {
  recipes: IRecipe[] | null;
}

const Home: NextPage<PageProps> = ({ recipes }: PageProps) => {
  if (!recipes) {
    return <div>No recipes found!</div>;
  }

  const { data: userSession } = useSession();

  const likedRecipesQuery = trpc.useQuery([
    "recipe.getUserLikes",
    { userId: userSession?.user?.id },
  ]);

  const { data: likedRecipes } = likedRecipesQuery;

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
      {recipes.map((recipe: IRecipe) => {
        return likedRecipes.map((likedRecipe: ILike) => {
          return (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              hasUserLiked={
                userSession.user?.id === likedRecipe.userId &&
                likedRecipe.recipeId === recipe.id
                  ? true
                  : false
              }
            />
          );
        });
      })}
    </div>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  let recipes = await prisma.recipe.findMany();

  recipes = JSON.parse(JSON.stringify(recipes));

  return {
    props: { recipes },
  };
};

export default Home;
