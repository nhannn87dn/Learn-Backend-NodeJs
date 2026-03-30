import ClientComponent from "@/components/ClientComponent"
import { getCategories } from "./blog.service";
import { Suspense } from 'react'

const BlogPage = () => {
  const categories = getCategories();
  return (
    <main className="flex grow p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold underline">Blog Page</h1>
        <Suspense fallback={<div>Loading categories...</div>}>
          <ClientComponent data={categories} />
        </Suspense>
      </div>
    </main>
  )
}

export default BlogPage