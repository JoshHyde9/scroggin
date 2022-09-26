import { GetServerSideProps, NextPage } from "next/types";

import { prisma } from "../../../server/db/client";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

const EditRecipe: NextPage = () => {
  return (
    <div>
      <h1>Edit your recipe</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userSession = await getServerAuthSession(context);

  // Re-route to home page if the user is not logged in
  if (!userSession) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const id = context.query.id as string | undefined;

  // Re-route to the home page if there is no id provided
  if (!id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let recipe = await prisma.recipe.findFirst({ where: { id } });

  // Don't pass anything into the page if the recipe is undefined
  // TODO: Route to 404 page
  if (!recipe) {
    return {
      props: {},
    };
  }

  const recipeCreator = await prisma.user.findFirst({
    where: { id: recipe.userId },
    select: { id: true, firstName: true, lastName: true, image: true },
  });

  // Re-route to home page if the logged in user is not the owner of the recipe
  if (!recipeCreator) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { userSession, recipe },
  };
};

export default EditRecipe;
