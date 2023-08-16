
import AccountProfile from "@/components/forms";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { NextPage } from "next";
import { redirect } from "next/navigation";
const page: NextPage = async () => {


  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);

  if (!userInfo || !userInfo.onboard) {
    redirect("/onboarding");
  }

  const userData = {
    id: user?.id,
    object_id: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio,
    image: userInfo?.image || user?.imageUrl,
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col px-10 py-20">
      <h1 className="head-text">Setting</h1>
      <p className="mt-3 !text-base-regular text-light-2">
        complete your profile now on threads
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} />
      </section>
    </main>
  );
};
export default page;
