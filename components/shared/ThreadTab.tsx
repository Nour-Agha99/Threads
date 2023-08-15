import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";
import ThreadCard from "../cards/ThreadCard";

interface Params {
  currentUserId: string;
  accountId: string;
  accountType: string;
}
const ThreadTab = async ({ currentUserId, accountId, accountType }: Params) => {
  let data = await fetchUserPosts(accountId);

  if (!data) redirect("/");
  return (
    <section className="mt-9 flex flex-col gap-10">
      {data.threads.map((post: any) => (
        <ThreadCard
          key={post._id}
          id={post._id}
          currentUserId={currentUserId}
          parentId={post?.parentId}
          author={
            accountType === "User"
              ? { name: data.name, image: data.image, id: data.id }
              : {
                  name: post.author.name,
                  image: post.author.image,
                  id: post.author.id,
                }
          }
          content={post.text}
          createdAt={post.createAt}
          comments={post.children}
        />
      ))}
    </section>
  );
};

export default ThreadTab;
