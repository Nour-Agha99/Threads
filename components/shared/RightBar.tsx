import React from "react";
import UserCard from "../cards/UserCard";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const RightBar = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);

  if (!userInfo || !userInfo.onboard) {
    redirect("/onboarding");
  }

  const data = await fetchUsers({
    userId: userInfo.id,
    pageSize: 25,
    searchString: "",
  });
  return (
    <section className="custom-scrollbar rightsidebar">
      <div>
        <h4 className="head-text1 mb-10">Suggested Communities</h4>
        <div className="flex flex-col gap-9">
          {!data?.users.length ? (
            <p className="no-result">No Users</p>
          ) : (
            data?.users.map((person) => (
              <UserCard
                id={person.id}
                name={person.name}
                username={person.username}
                imageUrl={person.image}
                personType="User"
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default RightBar;
