import BlogList from "@/components/blocks/BlogList"
import { Suspense } from 'react'
import { getPosts } from "@/services/blog.service";

/* tên componeent đặt gì cũng được 
nhưng nên đặt theo chức năng của component
 đó để dễ quản lý */
const Blog = () => {
  // Fetch posts data từ server rồi đẩy xuống client
  const posts = getPosts();
  return (
    <main className="container mx-auto my-5">
        <h1>Blog Page</h1>
        <h2>Posts List - Client component</h2>
        <Suspense fallback={<div>Loading...</div>}>
        <BlogList posts={posts} />
      </Suspense>
       
    </main>
  )
}

export default Blog