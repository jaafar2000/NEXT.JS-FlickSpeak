"use client";
import Post from "./Post";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full container px-9 ">
      <h1 className="head_text text-left">
        <span className="bg-gradient-to-r from-red-600 text-5xl to-red-200 bg-clip-text text-transparent">
          {name} Profile
        </span>
      </h1>
      <p className="desc mt-2 text-xl text-gray-300 text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        <Masonry
          className="flex gap-5 animate-slide-fwd"
          breakpointCols={breakpointColumnsObj}
        >
          {data.map((post) => (
            <Post
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </Masonry>
      </div>
    </section>
  );
};

export default Profile;
