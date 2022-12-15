import type { GetStaticProps, NextPage } from "next/types";
import { useSession } from "next-auth/react";

import { prisma } from "../server/db/client";
import { trpc } from "../utils/trpc";

import type { RecipeWithLikes } from "../server/common/schemas";

import { RecipeCard } from "../components/RecipeCard";

interface PageProps {
  recipes: RecipeWithLikes[] | null;
}

const Home: NextPage<PageProps> = ({ recipes }: PageProps) => {
  const { data: userSession, status } = useSession();

  const likedRecipesQuery = trpc.useQuery([
    "recipe.getUserLikes",
    { userId: userSession?.user?.id },
  ]);

  const { data: likedRecipes } = likedRecipesQuery;

  if (!recipes) {
    return <div>No recipes found!</div>;
  }

  if (
    status === "unauthenticated" ||
    !userSession ||
    !likedRecipes ||
    likedRecipes.length <= 0
  ) {
    return (
      <div className="flex flex-col items-center gap-10 px-10 mt-10 lg:items-stretch lg:flex-row">
        {recipes.map((recipe: RecipeWithLikes) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-10 px-10 mt-10 lg:items-stretch lg:flex-row">
      {likedRecipes.map((recipe) => {
        return (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            hasUserLiked={recipe.likes.some(
              (like) => like.userId === userSession.user.id
            )}
          />
        );
      })}
    </div>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  let recipes = await prisma.recipe.findMany({
    include: {
      _count: { select: { likes: true } },
    },
  });

  recipes = JSON.parse(JSON.stringify(recipes));

  return {
    props: { recipes },
  };
};

export default Home;
