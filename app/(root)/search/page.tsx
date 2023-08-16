import UserCard from "@/components/cards/UserCard";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const page = async ({ query }: { query: { pageNumber: string } }) => {
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
    <section className="text-light-1">
      <h1 className="head-text mb-10">Search</h1>

      <div className="mt-14 flex flex-col gap-9">
        {!data?.users.length ? (
          <p className="no-result">No Users</p>
        ) : (
          data?.users.map((person) =>(
            <UserCard 
            id = {person.id}
            name = {person.name}
            username = {person.username}
            imageUrl = {person.image}
            personType = 'User'
            />
          ))
        )}
      </div>
    </section>
  );
};

export default page;
