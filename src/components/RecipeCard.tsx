import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import NextLink from "next/link";
import { IRecipe } from "../server/common/schemas";
import { trpc } from "../utils/trpc";
import { RecipeTags } from "./RecipeTags";

interface RecipeCardProps {
  recipe: IRecipe;
  hasUserLiked?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe: { id, name, tags, likeCount, createdAt, displayImage },
  hasUserLiked,
}: RecipeCardProps) => {
  const utils = trpc.useContext();

  const { data: userSession } = useSession();

  const { mutate: likeRecipe } = trpc.useMutation(["recipe.like"], {
    onSuccess: (data) => {
      const recipe: IRecipe = JSON.parse(JSON.stringify(data));
      utils.invalidateQueries(["recipe.getByID", { id: recipe.id }]);
    },
    onError(error) {
      console.log(error);
    },
  });

  const defaultClasses =
    "hover:fill-red-400 hover:stroke-red-400 ease-in-out duration-300";

  return (
    <div className="h-52 md:h-64 lg:h-80">
      <NextLink href={`/recipe/${id}`}>
        <div className="relative h-full">
          <Image
            src={displayImage}
            layout="fill"
            className="h-full w-full rounded-3xl hover:cursor-pointer"
            alt="Photo of recipe"
          />
        </div>
      </NextLink>
      <div className="px-2 mt-2">
        <h1 className="text-lg">{name}</h1>
        <RecipeTags tags={tags} />
        <div className="flex justify-between gap-2 mt-2">
          <div className="flex gap-2">
            {!userSession ? (
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
              <button onClick={() => likeRecipe({ id })}>
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
                    hasUserLiked
                      ? `stroke-red-500 fill-red-500 ${defaultClasses}`
                      : `${defaultClasses}`
                  }
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            )}

            <p>{likeCount}</p>
          </div>
          <p>{dayjs(createdAt.toString()).format("DD/MM/YYYY HH:mm")}</p>
        </div>
      </div>
    </div>
  );
};
