
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo || !userInfo.onboard) {
    redirect("/onboarding");
  }
  redirect(`/profile/${userInfo.id}`);

};

export default page;
