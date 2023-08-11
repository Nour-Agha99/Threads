"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.models";
import { connectToDB } from "../mongoose";
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