import React, { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";

const NavLink = ({ to, children }: { to: string; children: any }) => {
  const router = useRouter();

  return (
    <a
      href={to}
      className={`px-4 transition ease-in-out duration-300 relative ${
        router.asPath === to
          ? "text-purple-500"
          : "stroke  hover:text-purple-300"
      }`}
    >
      {children}
    </a>
  );
};

const MobileNav = ({
  open,
  setOpen,
  session,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  session: Session | null;
}) => {
  const router = useRouter();

  return (
    <div
      className={`absolute top-0 left-0 h-screen w-screen bg-slate-200 transform ${
        open ? "-translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out filter drop-shadow-md `}
    >
      <div className="flex flex-col mt-9 ml-4">
        <NextLink href="/">
          <a
            className={`text-xl font-normal my-4 ${
              router.asPath === "/" ? "text-purple-500" : ""
            }`}
            onClick={() => setOpen(!open)}
          >
            Home
          </a>
        </NextLink>
        {!session && (
          <>
            <NextLink href="/login">
              <a
                className={`text-xl font-normal my-4 ${
                  router.asPath === "/login" ? "text-purple-500" : ""
                }`}
                onClick={() => setOpen(!open)}
              >
                Login
              </a>
            </NextLink>
            <NextLink href="/register">
              <a
                className={`text-xl font-normal my-4 ${
                  router.asPath === "/register" ? "text-purple-500" : ""
                }`}
                onClick={() => setOpen(!open)}
              >
                Register
              </a>
            </NextLink>
          </>
        )}
        {session && (
          <>
            <button
              className="text-xl font-normal my-4 text-left"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </button>
            <NextLink href="/account">
              <img
                className="object-cover w-12 h-12 rounded-full"
                src={session.user?.image}
                alt="my account picture"
              />
            </NextLink>
          </>
        )}
      </div>
    </div>
  );
};

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  return (
    <nav className="flex px-4 py-4 h-20 w-screen items-center">
      <MobileNav open={open} setOpen={setOpen} session={session} />
      <div className="w-full flex justify-end items-center md:pr-10">
        <div
          className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {/* hamburger button */}
          <span
            className={`h-1 w-full bg-slate-300 rounded-lg transform transition duration-300 ease-in-out ${
              open ? "rotate-45 translate-y-3.5" : ""
            }`}
          />
          <span
            className={`h-1 w-full bg-slate-300 rounded-lg transition-all duration-300 ease-in-out ${
              open ? "w-0" : "w-full"
            }`}
          />
          <span
            className={`h-1 w-full bg-slate-300 rounded-lg transform transition duration-300 ease-in-out ${
              open ? "-rotate-45 -translate-y-3.5" : ""
            }`}
          />
        </div>

        <div className="hidden mt-10 items-center md:flex">
          <NavLink to="/">Home</NavLink>
          {!session && (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
          {session && (
            <>
              <button onClick={() => signOut()}>Logout</button>
              <NavLink to="/account">
                <img
                  className="object-cover w-12 h-12 rounded-full"
                  src={session.user?.image}
                  alt="my account picture"
                />
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
