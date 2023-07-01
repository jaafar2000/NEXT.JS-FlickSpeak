import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const post = await Post.findById(params.id).populate("creator")
        if (!post) return new Response("post Not Found", { status: 404 });

        return new Response(JSON.stringify(post), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { review , rating, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPost = await Post.findById(params.id);

        if (!existingPost) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPost.review = review;
        existingPost.tag = tag;
        existingPost.rating = rating;

        await existingPost.save();

        return new Response("Successfully updated the post", { status: 200 });
    } catch (error) {
        return new Response("Error Updating post", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Post.findByIdAndRemove(params.id);

        return new Response("post deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting post", { status: 500 });
    }
};