import ThreadPost from "@/components/forms/ThreadPost";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
console.log(userInfo);

  if (!userInfo || !userInfo.onboarded) {
    redirect("/onboarding");
  }
  return (
    <>
      <div className="head-text">create Post</div>
      <ThreadPost userId={userInfo._id} />
    </>
  );
};

export default page;
