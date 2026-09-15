
const BlogDetail = async ({
  params,
}: {
  params: Promise<{ id: number }>
}) => {
     const { id } = await params

     //TODO: gọi API để lấy thông tin blog có id = 1
  return (
    <div>BlogDetail {id}</div>
  )
}

export default BlogDetail