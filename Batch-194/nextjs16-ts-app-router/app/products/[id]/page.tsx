import { getProductDetailsBySlug } from "@/services/products.service";

const ProductDetail = async({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  //Mục tiêu là lấy được slug từ URL để gọi API
  console.log('params:', (await params).id);
  const slug = (await params).id;
  //Gọi API lấy chi tiết sản phẩm theo slug
  const productDetail = await getProductDetailsBySlug(slug);
  console.log('<<=== 🚀  productDetail===>>', productDetail);
  return (
    <main className="container mx-auto my-5">
        <h1>Product Detail</h1>
        <h2>{productDetail.data.product_name}</h2>
        <div>{productDetail.data.price}</div>
    </main>
  )
}

export default ProductDetail