"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import User from "../models/user.models";
import Thread from "../models/post.models";
interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}
export const createThread = async ({
  text,
  author,
  communityId,
  path,
}: Params): Promise<void> => {
  try {
    connectToDB();

    const createThread = await Thread.create({
      text,
      author,
      community: null,
    });

    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread._id },
    });
    revalidatePath(path);
  } catch (err) {
    console.log("Failed to create thread");
  }
};

export const fetchPosts = async (currentPage = 1, limit = 20) => {
  try {
    connectToDB();
    const skipPosts = (currentPage - 1) * limit;
    const postsQuery = await Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({
        createAt: "desc",
      })
      .skip(skipPosts)
      .limit(limit)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

    const totalPostCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const posts = postsQuery;

    const isNext = totalPostCount > skipPosts + posts.length;

    return { posts, isNext };
  } catch (err) {
    console.log("Failed to fetch posts");
  }
};

export const fetchPost = async (id: string) => {
  try {
    connectToDB();

    const post = await Thread.findOne({
      _id: id,
    })
      .populate({ path: "author", model: User, select: "_id id name image" })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id parentId image name",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id parentId image name",
            },
          },
        ],
      });

    return post;
  } catch (err) {
    console.log("Failed to fetch post");
  }
};

export const addCommentToThread = async (
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) => {
  try {
    connectToDB();

    const originalThread = await Thread.findById(threadId);
    if (!originalThread) {
      throw new Error("Thread not found");
    }

    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    const savedCommentThread = await commentThread.save();

    originalThread.children.push(savedCommentThread._id);

    await originalThread.save();

    revalidatePath(path);

  } catch (err) {
    console.log("Failed to fetch post");
  }
};
