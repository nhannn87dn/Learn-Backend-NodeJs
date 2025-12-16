'use client'

import { use } from "react";

//Client Component
interface BlogListProps {
  posts: Promise<{id: string; title: string;}[]>;
}

const BlogList = ({ posts }: BlogListProps) => {

    const allPosts = use(posts)

  return (
    <div>
        <ul>
        {allPosts.map((post) => (
          <li key={post.id}>
            <h3>#ID: {post.id} - {post.title}</h3>
          </li>
        ))}
        </ul>
    </div>
  )
}

export default BlogList