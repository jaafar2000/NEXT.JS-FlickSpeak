"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import formatDistanceToNow  from "date-fns/formatDistanceToNow" 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';

const Post = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  return (
    <div className="post max-w-[350px] mb-4 rounded-md bg-[#212121]">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start p-3 items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post?.creator?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col ">
            <h3 className="font-satoshi font-semibold text-white">
              {post.creator.username}
            </h3>
            <p className="font-inter flex flex-col text-sm text-gray-500">
                <span>{post.creator.email}</span>
              <span>{formatDistanceToNow(new Date(post.createdAt)  , {addSuffix : true})  }</span>
            </p>
          </div>
        </div>
      </div>
        <div className="bg-red-400 relative object-contain w-full h-[400px] " >
          <Image src={post?.image} fill alt="show iamge" className="" />
        </div>
      <p className="my-2 font-satoshi text-sm px-3 text-white">{post.review}</p>
      <p className="my-2 font-satoshi text-sm px-3 text-white">
        rating: <span className="text-yellow-300" > {post.rating }</span> /5 
        
        </p>

      <p
        className="font-inter px-3 pb-2 text-sm text-[#aaaaaa] cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className=" flex  items-center justify-between p-2 ">
          <p
            className="font-inter text-sm text-green-400 cursor-pointer pl-3"
            onClick={handleEdit}
          >
            Edit <EditIcon className="text-sm" />
          </p>
          <p
            className="font-inter text-sm text-red-400 cursor-pointer"
            onClick={handleDelete}
          >
            Delete <DeleteIcon className="text-sm"  />
          </p>
        </div>
      )}
    </div>
  );
};

export default Post;
