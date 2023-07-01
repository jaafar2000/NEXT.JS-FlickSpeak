"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchDetails } from "@/utils/fetch";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";

const page = () => {
  const params = useParams();
  const [show, setShow] = useState();
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const baseURL = "https://image.tmdb.org/t/p/original";

  const [post, setPost] = useState({
    tag: "",
    review: "",
    image: "",
    rating: "",
  });
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchData() {
      const res = await fetchDetails(params.type, params.id);
      setShow(res);
    }
    fetchData();
  }, [params.id, params.type]);

  const createPost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify({
          review: post.review,
          userId: session?.user.id,
          image: `${baseURL}${show?.poster_path}`,
          rating: post.rating,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="container lg:flex   ">
      <div className="lg:w-[50%]  p-4 rounded-sm m-2 lg:h-[486px] relative lg:order-2 flex  md:w-full sm:w-full">
        <div className="relative w-[400px] h-[370px] lg:h-[486px] lg:w-[650px] flex  items-center justify-center ">
          <Image
            src={`${baseURL}${show?.poster_path}`}
            fill
            className="object-contain"
            alt="poster "
          />
        </div>
        <div className=" flex flex-col justify-evenly desc p-2 w-full lg:max-w-full ">
          <p className=" text-2xl text-bold  ">{show?.title || show?.name}</p>
          <p className=" text-xl">
            <span className="text-red-500">Original Language: </span>
            {show?.original_language}
          </p>
          <p className=" text-gray-300 ">
            {" "}
            <span className="text-red-500">Overview: </span>{" "}
            {show?.overview?.substring(0, 300)}
          </p>
          <p className=" text-gray-300 ">
            {" "}
            <span className="text-red-500">Release Date: </span>
            {show?.release_date}
          </p>
          <p className=" text-gray-300 ">
            <span className="text-red-500">Duration: </span> {show?.runtime}
          </p>
          <p className=" text-gray-300 ">
            <span className="text-red-500">Status: </span>
            {show?.status}
          </p>
          <p className=" text-gray-300 ">
            <span className="text-red-500">Rating: </span>{" "}
            <span className="text-yellow-300">{show?.vote_average}</span>
          </p>
        </div>
      </div>
      <div>
        <Form
          type={"Review"}
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={createPost}
        />
      </div>
    </div>
  );
};

export default page;
