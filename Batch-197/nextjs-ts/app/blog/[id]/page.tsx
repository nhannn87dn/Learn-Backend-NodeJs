import PostDetail from "@/components/ui/PostDetail";
import { Metadata } from "next";
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
  userId: number;
  description?: string;

}

type Props ={
  params: Promise<{ id: string }>
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
   const { id } = await params;

  const response = await fetch(`https://dummyjson.com/posts/${id}`)
  const data: Post = await response.json();
 
  return {
    title: data.title,
    description: data?.description || 'Chi tiết bài viết',
  }
}

const BlogDetailContent = async ({
  params,
}: Props) => {
  const { id } = await params;

  const response = await fetch(`https://dummyjson.com/posts/${id}`)
  const data: Post = await response.json();

  return (
    <PostDetail post={data} />
  )
}

const BlogDetail = ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogDetailContent params={params} />
    </Suspense>
  )
}

export default BlogDetail