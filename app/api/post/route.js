import { connectToDB } from "@/utils/database";
import Post from "@/models/post";

export const GET = async (request) => {
  try {
    await connectToDB();

    const posts = await Post.find({})
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
