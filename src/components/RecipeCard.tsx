import dayjs from "dayjs";
import Image from "next/image";
import { IRecipe } from "../server/common/schemas";

interface RecipeCardProps {
  recipe: IRecipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe: { name, tags, likeCount, createdAt, displayImage },
}: RecipeCardProps) => {
  return (
    <div className="h-52 md:h-64 lg:h-80">
      <div className="relative h-full">
        <Image
          src={displayImage}
          layout="fill"
          className="h-full w-full rounded-3xl"
          alt="Photo of recipe"
        />
      </div>
      <div className="px-2 mt-2">
        <h1 className="text-lg">{name}</h1>
        <div className="flex gap-2 mt-2">
          {tags.map((tag: string) => {
            return (
              <p
                key={tag}
                className="px-4 py-0.5 bg-purple-500/50 border border-purple-700 text-sm rounded-full"
              >
                {tag}
              </p>
            );
          })}
        </div>
        <div className="flex justify-between gap-2 mt-2">
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
            <p>{likeCount}</p>
          </div>
          <p>{dayjs(createdAt.toString()).format("DD/MM/YYYY HH:mm")}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
