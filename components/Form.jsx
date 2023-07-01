import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
const Form = ({ type, post, setPost, submetting, handleSubmit }) => {
  const params  = useParams()

  return (
    <section className="w-full max-w-full lg:w-[800px] mt-3 p-3 flex-start lg:flex md:flex-col sm:flex-col">
      <h1 className="head_text text-left">
        <span className=" text-5xl bg-gradient-to-r from-[#db0000]	font-extrabold md:text-3xl to-white bg-clip-text text-transparent  ">
          {type} {params.type === "tv" ? "TV Show" : "Movie"}</span>
      </h1>
      <p className="text-left lg:max-w-[60%] md:w-full sm:w-full mt-2 tracking-wide text-gray-300 ">
        {type} and share amazing posts about your favorite movies with the
        world, and let your imagination run wild with a cutting-edge technology
        that revolutionizes your movie-watching experience
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label className="flex flex-col">
          <span className=" text-xl text-[#db0000] mb-2">Your Review</span>

          <textarea
            value={post.review}
            onChange={(e) => setPost({ ...post, review: e.target.value })}
            placeholder="Write your review here"
            required
            className="bg-transparent border-2 rounded-sm outline-none border-gray-300 p-2 "
          />
        </label>

        <label className="flex flex-col">
          <span className=" text-xl  text-[#db0000] mb-2">
            Rate this movie <span className="font-normal"></span>
          </span>
          <input
            value={post.rating}
            onChange={(e) => setPost({ ...post, rating: e.target.value })}
            type="text"
            placeholder="rate out of 5"
            required
            className="bg-transparent border-2 rounded-sm outline-none border-gray-300 p-2"
          />
        </label>

        <label className="flex flex-col">
          <span className=" text-xl  text-[#db0000] mb-2">
            <span className="font-normal">tag </span>
          </span>
          <input
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          type='text'
          placeholder='#Tag'
          required
          className="bg-transparent border-2 rounded-sm outline-none border-gray-300 p-2"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submetting}
            className="px-5 py-1.5 text-sm bg-red-500 ml-2 rounded-full text-white"
          >
            {submetting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
