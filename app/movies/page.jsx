"use client";
import React, { useEffect, useState } from "react";
import { fetchMovies } from "@/utils/fetch";
import Image from "next/image";
import Link from "next/link";
import CustomPagintaion from "@/components/CustomPagintaion";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import Loader from "@/components/Loader";
import ShortcutOutlinedIcon from "@mui/icons-material/ShortcutOutlined";
const page = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("movie");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const baseURL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    setIsLoading(true);
    const fetch = async () => {
      const allMovies = await fetchMovies(
        page || 1,
        type || "movie",
        search || ""
      );
      setAllMovies(allMovies);
      setIsLoading(false);
    };
    fetch();
  }, [page, type, search]);

  const handleOnClick = () => {
    if (type === "movie") {
      setType("tv");
    } else {
      setType("movie");
    }
  };

  return (
    <div className="container">
      <div className="sub__nav flex justify-between px-9 mb-4">
        <button className="flex gap-4" onClick={handleOnClick}>
          <span
            className={` ease-out duration-150 ${
              type === "movie"
                ? "text-[#db0000]	 border-b-2 border-[#db0000]	 "
                : "text-white border-b-2 border-transparent "
            }  `}
          >
            Movies
          </span>
          <span
            className={` ease-out duration-150 ${
              type === "tv"
                ? "text-[#db0000]	 border-b-2 border-[#db0000]	 "
                : "text-white border-b-2 border-transparent "
            }  `}
          >
            Tv Shows
          </span>
        </button>
        <div className="search__block">
          <SearchSharpIcon />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-0 border- px-3  py-1 bg-transparent"
            placeholder="type here..."
          />
        </div>
      </div>
      {isLoading ? (
        <div className="h-[75vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="gap-3 group/item   cursor-pointer  mt-3 flex items-center justify-center flex-wrap ">
          {allMovies?.results?.map((movie, index) => (
            <div className="main__block-image " key={`${index}uni`}>
              <Link href={`create-post/${type}/${movie?.id}`}>
                {
                  <div className="block-image group relative">
                    <div className="absolute  bg-[#db000073] opacity-0 transition   ease-in-out  text-xl font-bold flex items-center justify-center z-[2000] w-full h-full group-hover:opacity-100 ">
                      review <ShortcutOutlinedIcon />
                    </div>
                    <Image
                      width={150}
                      height={200}
                      src={`${baseURL}${movie?.poster_path}`}
                      alt="movie"
                    />
                    <div className="block-info p-1 flex flex-col justify-end absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-gradient-to-b from-transparent via-transparen to-black ">
                      <p className="text-sm"> {movie.title || movie?.name}</p>
                      <p className="text-sm">{movie?.release_date}</p>
                      <p className="text-sm">
                        <span className="text-yellow-400">
                          {movie?.vote_average}
                        </span>{" "}
                        / 10
                      </p>
                    </div>
                  </div>
                }
              </Link>
            </div>
          ))}
        </div>
      )}
      <div className="mx-auto my-4   w-fit mt-4">
        <CustomPagintaion setPage={setPage} />
      </div>
    </div>
  );
};

export default page;
