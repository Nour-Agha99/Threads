import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo || !userInfo.onboard) {
    redirect("/onboarding");
  }

  const activity = await getActivity(userInfo._id);

  console.log(activity);

  return (
    <section className="text-light-1">
      <h1 className="head-text mb-10">Activity</h1>
      <section className="mt-10 flex flex-col gap-5">
        {activity?.length ? (
          activity?.map((replay) => (
            <Link key={replay.id} href={`thread/${replay.parentId}`}>
              <article className="activity-card">
                <Image
                  src={replay.author.image}
                  alt={"profile picture"}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <p className="!text-small-regular text-light-1">
                  <span className="mr-1 text-primary-500">
                    {replay.author.name}
                  </span>
                  replied to your Thread
                </p>
              </article>
            </Link>
          ))
        ) : (
          <p className="!text-base-regular text-light-3">No Activity Yet</p>
        )}
      </section>
    </section>
  );
};

export default page;
