
const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ id: number }>
}) => {
    const { id } = await params;
    //Gọi API lấy chi tiết sản phẩm theo id
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
    const product = await res.json();
    console.log('<<=== 🚀 product detail ===>>', product);
  return (
    <main className="container mx-auto p-4">
      <h1 className="font-bold text-3xl">{product.title}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </main>
  )
}

export default ProductDetailPage