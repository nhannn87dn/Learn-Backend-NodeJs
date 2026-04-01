import Image from "next/image";
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: number }>
}): Promise<Metadata> {
  const { id } = await params;
 
  // fetch post information
  const res = await fetch(`https://learn-backend-nodejs.onrender.com/api/v1/products/${id}`)
  const data = await res.json()
  const product = data.data;
  return {
    title: product.product_name,
    description: product.description,
  }
}

export const revalidate = 60
 
export async function generateStaticParams() {
  const res = await fetch(`https://learn-backend-nodejs.onrender.com/api/v1/products`)
  const products = await res.json()
  return products.data.data.map((product: { id: number }) => ({
    id: String(product.id),
  }))
}

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ id: number }>
}) => {
    const { id } = await params;
    //Gọi API lấy chi tiết sản phẩm theo id
    //const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
    const res = await fetch(`https://learn-backend-nodejs.onrender.com/api/v1/products/${id}`,
    { 
      cache: 'force-cache', //cache kết quả từ api
      next: { revalidate: 60 } //revalidate sau 1 phút, làm tươi lại kết quả sau 1 phút
    });
    const product = await res.json();
    console.log('<<=== 🚀 product detail ===>>', product);
  return (
    <main className="container mx-auto p-4">
      <h1 className="font-bold text-3xl">{product.data.product_name}</h1>
      <Image width={400} height={400} src={product.data.thumbnail} alt={product.data.product_name} className="w-full h-64 object-cover mb-4" />
      <p className="text-2xl font-bold">${product.data.price}</p>
    </main>
  )
}

export default ProductDetailPage