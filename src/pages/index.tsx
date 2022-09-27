import type { NextPage } from "next/types";
import { IRecipe } from "../server/common/schemas";
import { trpc } from "../utils/trpc";

import { RecipeCard } from "../components/RecipeCard";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: recipes, isLoading } = trpc.useQuery(["recipe.getAll"]);

  const { data: userSession } = useSession();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!recipes) {
    return <h1>No recipes found!</h1>;
  }

  const { data: likedRecipes } = trpc.useQuery([
    "recipe.getUserLikes",
    { userId: userSession?.user?.id },
  ]);

  if (!userSession || !userSession.user || !likedRecipes) {
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

export default Home;
