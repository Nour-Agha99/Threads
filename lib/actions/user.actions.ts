"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.models";
import { connectToDB } from "../mongoose";
import Thread from "../models/post.models";
interface Params {
  userId: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  path: string;
}
export const updateUser = async ({
  userId,
  username,
  name,
  image,
  bio,
  path,
}: Params): Promise<void> => {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name, image, bio, onboarded: true },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (err) {
    console.log("Failed to create/update user");
  }
};

export const fetchUser = async (
  userId:string
) => {
  try {
    connectToDB();

    return await User.findOne({ id: userId });

  } catch (err) {
    console.log("Failed to create/update user");
  }
}

export const fetchUserPosts = async (
  userId:string
) => {
  try {
    connectToDB();

     const result = await User.findOne({ id: userId }).populate({
      path:'threads',
      model: Thread,
      populate:{
        path:'children',
        model:Thread,
        populate:{
          path:'author',
          model:User,
          select:'name image id'
        }
      }
    });
    return result;

  } catch (err) {
    console.log("Failed to fetch user");
  }
} 