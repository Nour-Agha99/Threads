"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.models";
import { connectToDB } from "../mongoose";
import Thread from "../models/post.models";
import mongoose, { FilterQuery, SortOrder } from "mongoose";
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
      { username: username.toLowerCase(), name, image, bio, onboard: true },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (err) {
    console.log("Failed to create/update user");
  }
};

export const fetchUser = async (userId: string) => {
  try {
    connectToDB();

    return await User.findOne({ id: userId });
  } catch (err) {
    console.log("Failed to create/update user");
  }
};

export const fetchUserPosts = async (userId: string) => {
  try {
    connectToDB();

    const result = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: {
        path: "children",
        model: Thread,
        populate: {
          path: "author",
          model: User,
          select: "name image id",
        },
      },
    });
    return result;
  } catch (err) {
    console.log("Failed to fetch user");
  }
};

export const fetchUsers = async ({
  userId,
  pageNumber = 1,
  pageSize = 20,
  searchString = "",
  sortBy = "desc",
}: {
  userId: string;
  pageNumber?: number;
  pageSize?: number;
  searchString?: string;
  sortBy?: SortOrder;
}) => {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const inSensitiveString = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = { id: { $ne: userId } };

    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: inSensitiveString } },
        { name: { $regex: inSensitiveString } },
      ];
    }

    const sortOption = { createAt: sortBy };

    const users = await User.find(query)
      .sort(sortOption)
      .skip(skipAmount)
      .limit(pageSize);

    const totalCU = await User.countDocuments(query);

    const isNext = totalCU > skipAmount + users.length;

    return { users, isNext };
  } catch (err) {
    console.log("Failed to fetch user");
  }
};

export const getActivity = async (userId: string) => {
  try {
    connectToDB();

    const userThreads = await Thread.find({ author: userId });

    const childThreadsId = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children);
    }, []);

    const replies = await Thread.find({
      _id: { $in: childThreadsId },
      author: { $ne: userId },
    }).populate({
      path:'author',
      model:User,
      select:'name image _id'
    });

    return replies
  } catch (error) {
    console.log(error);
  }
};
