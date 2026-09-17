import PostDetail from "@/components/ui/PostDetail";

const BlogDetail = async ({
  params,
}: {
  params: Promise<{ id: number }>
}) => {
     const { id } = await params;

     //TODO: gọi API để lấy thông tin blog có id = 1
    const response = await fetch(`https://dummyjson.com/posts/${id}`)
    const data = await response.json();

    console.log('<<=== 🚀 data ===>>',data);
  return (
    <div>
      <PostDetail post={data} />
    </div>
  )
}

export default BlogDetail