import { Session } from "next-auth";
import type { GetServerSideProps, NextPage } from "next";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

interface PageProps {
  userSession: Session | null;
}

const UserAccount: NextPage<PageProps> = ({ userSession }) => {
  if (!userSession) {
    return <p>loading....</p>;
  }
  return <p>{JSON.stringify(userSession.user)}</p>;
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

  return {
    props: { userSession },
  };
};

export default UserAccount;
