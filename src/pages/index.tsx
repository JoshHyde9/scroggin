import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <>
      <header className="flex justify-center mt-5">
        <h1 className="text-4xl semi-bold">Hello World!</h1>
      </header>

      {session && (
        <>
          <pre>
            <code>{JSON.stringify(session.user, null, 2)}</code>
          </pre>
          <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
        </>
      )}
    </>
  );
};

export default Home;
