import type { NextPage } from "next";
import RecipeCard from "../components/RecipeCard";
import { IRecipe } from "../server/common/schemas";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: recipes, isLoading } = trpc.useQuery(["recipe.getAll"]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!recipes) {
    return <h1>No recipes found!</h1>;
  }

  return (
    <div className="grid grid-cols-1 gap-10 px-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.map((recipe: IRecipe) => {
        return <RecipeCard key={recipe.id} recipe={recipe} />;
      })}
    </div>
  );
};

export default Home;
