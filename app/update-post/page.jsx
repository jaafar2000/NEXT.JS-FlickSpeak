"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";

const EditPost = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const postId = searchParams.get("id")
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ review: "", tag: "", image:"", rating:"" });
  
  useEffect(()=>{
    const getPostDetails = async ()=>{
      const res  = await fetch(`/api/post/${postId}`)
      const data = await res.json()
      setPost({
        review: data.review,
        tag :data.tag,
        rating:data.rating
      })
    }
    if(postId) getPostDetails()
  }, [postId])

  const updatePost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if(!postId ) return alert('post ID not Found')
    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          review: post.review,
          tag: post.tag,
          rating:post.rating,

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
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePost}
    />  )
}

export default EditPost