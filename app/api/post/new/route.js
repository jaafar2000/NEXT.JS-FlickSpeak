import { connectToDB } from "@/utils/database";
import Post from "@/models/post";

export const POST = async (req) => {
  const { userId, review, tag, image, rating } = await req.json();
  try {
    await connectToDB();
    const newPost = new Post({
      creator: userId,
      review,
      image,
      rating,
      tag,
    });
    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (err) {
    return new Response("Failed to create prompt", { status: 500 });
  }
};
