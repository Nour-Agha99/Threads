import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchPost } from "@/lib/actions/post.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);

  if (!userInfo || !userInfo.onboard) {
    redirect("/onboarding");
  }
  const post = await fetchPost(params.id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={post._id}
          id={post._id}
          currentUserId={user?.id}
          parentId={post?.parentId}
          author={post.author}
          content={post.text}
          createdAt={post.createAt}
          comments={post.children}
        />
      </div>
      <div className="mt-7">
        <Comment
          threadId={post.id}
          currentUserImage={userInfo?.image}
          currentUserId={JSON.stringify(userInfo?._id)}
        />
        <div className="mt-10">
          {post.children.map((comment: any) => (
            <ThreadCard
              key={comment._id}
              id={comment._id}
              currentUserId={comment?.id}
              parentId={comment?.parentId}
              author={comment.author}
              content={comment.text}
              createdAt={comment.createAt}
              comments={comment.children}
              isComment={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
