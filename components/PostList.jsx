import React from 'react'
import Masonry from "react-masonry-css";
import Post from './Post';
const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const PostList = ({ data, handleTagClick }) => {
  console.log(data)
  return (
    <div className="mt-16 prompt_layout">
      <Masonry
        className="flex gap-5 animate-slide-fwd"
        breakpointCols={breakpointColumnsObj}
      >
        { 
          data ? (
            data.map((post) => (
              <Post key={post._id} post={post} handleTagClick={handleTagClick} />
            ))
          ):(
            <div>
              <h3>no post to show </h3>
            </div>
          )
        }
      </Masonry>
    </div>  )
}

export default PostList