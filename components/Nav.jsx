"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import MovieCreationSharpIcon from "@mui/icons-material/MovieCreationSharp";
import { usePathname } from "next/navigation";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
const Nav = () => {
  const { data: sesstion } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className="container flex  justify-between w-full px-9 py-6 ">
      <Link className="flex items-center" href="/">
        <div className="logo text-xl tracking-widest	font-bold text-[#db0000]	flex items-center gap-1 ">
          {" "}
          FlickSpeak <span className="text-white">|</span>{" "}
          <MovieCreationSharpIcon className="text-white" />{" "}
        </div>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden  lg:flex ">
        {sesstion?.user ? (
          <div className=" text-xl  flex items-center gap-5">
            <Link
              href="/"
              className={`${
                pathname === "/"
                  ? "text-[#db0000] border-b-2 border-[#db0000] "
                  : "text-white border-b-2 border-transparent "
              } transition-all`}
            >
              Reviews
            </Link>
            <Link
              href="/movies"
              className={`${
                pathname === "/movies"
                  ? "text-[#db0000] border-b-2 border-[#db0000] "
                  : "text-white border-b-2 border-transparent"
              } transition-all `}
            >
              Movies & TV shows
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={sesstion.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="bg-[#db0000] font-bold p-1 rounded-md"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile navigation  */}
      <div className="sm:hidden   ">
        {sesstion?.user ? (
          <div className="  ">
            <Image
                src={sesstion.user.image}
                width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />
            {toggleDropDown && (
              <div className="dropdown z-[5000] absolute text-2xl py-4 px-3 top-0 transition ease-in-out right-0 bottom-0  bg-[#111]">
                <div onClick={() => setToggleDropDown((prev) => !prev)}>
                  <HighlightOffOutlinedIcon className="text-4xl" />
                </div>
                <Link
                  href="/"
                  onClick={() => setToggleDropDown((prev) => !prev)}
                  className="block my-3"
                >
                  Reviews
                </Link>
                <Link
                  href="/movies"
                  onClick={() => setToggleDropDown((prev) => !prev)}
                  className="block my-3"
                >
                  Movies & TV shows
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    signOut;
                    () => setToggleDropDown((prev) => !prev);
                  }}
                  className="bg-red-600 mt-4 px-2 py-1 rounded-md"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  type="buttom"
                  onClick={() => signIn(provider.id)}
                  className="bg-[#db0000] rounded-md text-bold p-1"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
