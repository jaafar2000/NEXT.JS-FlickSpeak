import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    review: {
      type: String,
      required: [true, "review is required."],
    },
    image: {
      type: String,
      required: [true, "review is required."],
    },
    tag: {
      type: String,
      required: [true, "review is required."],
    },
    rating: {
      type: Number,
      required: [true, "rating is required."],
    },
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);

export default Post;
