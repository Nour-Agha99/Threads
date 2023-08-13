import Thread from "@/components/cards/Thread";
import { fetchPosts } from "@/lib/actions/post.actions";
import { UserButton, currentUser } from "@clerk/nextjs";

const Home = async () => {
  const data = await fetchPosts(1, 20);
  const user = await currentUser();

  return (
    <>
      <h1 className="text-light-1">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {!data || !data.posts.length ? (
          <p>shit</p>
        ) : (
          data.posts.map((post) => (
            <Thread
              key={post._id}
              id={post._id}
              currentUserId={user?.id}
              parentId={post?.parentId}
              author={post.author}
              content={post.text}
              community={post.community}
              createdAt={post.createAt}
              comments={post.children}
            />
          ))
        )}
      </section>
    </>
  );
};

export default Home;
