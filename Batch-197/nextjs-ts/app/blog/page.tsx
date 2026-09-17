import PostCard from "@/components/ui/PostCard";

export default async function Page() {
  const response = await fetch(`https://dummyjson.com/posts?limit=10&skip=0`)
  const data = await response.json();

  console.log('<<=== 🚀 data ===>>',data);
  return (
    <main className="my-5">
        <div className="container mx-auto">
            <h1>Blog List</h1>
          <div className="post-list flex flex-col gap-y-5">
            {
            data.posts.map((post)=>{
              return <PostCard key={post.id} post={post} />
            })
          }
          </div>
        </div>

    </main>
  )
}