import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("mongo db is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true
    console.log("mongoDB connected")
  } catch (error) {
    console.log(error)
  }
};


