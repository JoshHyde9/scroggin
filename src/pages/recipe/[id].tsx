import { Recipe, User } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import dayjs from "dayjs";

import { Tiptap } from "../../components/TipTap";
import { RecipeTags } from "../../components/RecipeTags";

interface PageProps {
  recipe: Recipe;
  recipeCreator: User;
}

const RecipePage: NextPage<PageProps> = ({
  recipe,
  recipeCreator,
}: PageProps) => {
  if (!recipe && !recipeCreator) {
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
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string | undefined;

  if (!id) {
    return {
      props: {},
    };
  }

  let recipe = await prisma?.recipe.findFirst({ where: { id } });

  const recipeCreator = await prisma?.user.findFirst({
    where: { id: recipe?.userId },
    select: { firstName: true, lastName: true, image: true },
  });

  recipe = JSON.parse(JSON.stringify(recipe));

  return {
    props: { recipe, recipeCreator },
  };
};

export default RecipePage;
