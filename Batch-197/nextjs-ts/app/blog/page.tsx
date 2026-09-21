import PostCard from "@/components/ui/PostCard";
import { Suspense } from "react";

type Post = {
  id: number;
  title: string;
  views: number;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number
  }
  userId: number

}

async function PostsList() {
  const response = await fetch(`https://dummyjson.com/posts?limit=10&skip=0`)
  const data: { posts: Post[] } = await response.json();

  return (
    <div className="post-list flex flex-col gap-y-5">
      {data.posts.map((post) => {
        return <PostCard key={post.id} post={post} />
      })}
    </div>
  )
}

export default function Page() {
  return (
    <main className="my-5">
      <div className="container mx-auto">
        <h1>Blog List</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <PostsList />
        </Suspense>
      </div>
    </main>
  )
}