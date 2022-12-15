import { useState } from "react";
import { Session } from "next-auth";
import type { GetServerSideProps, NextPage } from "next";

import { prisma } from "../../server/db/client";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { RecipeWithLikes } from "../../server/common/schemas";
import { RecipeCard } from "../../components/RecipeCard";

interface PageProps {
  userSession: Session | null;
  userRecipes: RecipeWithLikes[] | null;
}

const UserAccount: NextPage<PageProps> = ({ userSession, userRecipes }) => {
  const [showUserRecipes, setShowUserRecipes] = useState(true);
  if (!userSession) {
    return <p>loading....</p>;
  }

  return (
    <div className="flex flex-row">
      <div className="flex flex-col pl-5 mt-10">
        <ul>
          <li
            className={`ease-in-out duration-300 hover:text-purple-300 hover:cursor-pointer ${
              userRecipes && "text-purple-500"
            }`}
            onClick={() => setShowUserRecipes(true)}
          >
            My Recipes
          </li>
          <li
            className={`ease-in-out duration-300 hover:text-purple-300 hover:cursor-pointer ${
              !userRecipes && "text-purple-500"
            }`}
            onClick={() => setShowUserRecipes(false)}
          >
            Account Details
          </li>
        </ul>
      </div>
      {showUserRecipes && (
        <div className="flex flex-col items-center gap-10 px-10 mt-10 lg:items-stretch lg:flex-row">
          {userRecipes?.map((recipe) => {
            return <RecipeCard recipe={recipe} key={recipe.id} />;
          })}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userSession = await getServerAuthSession(context);

  if (!userSession) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let userRecipes = await prisma.recipe.findMany({
    where: { userId: userSession.user.id },
  });

  userRecipes = JSON.parse(JSON.stringify(userRecipes));

  return {
    props: { userSession, userRecipes },
  };
};

export default UserAccount;
