import { getProductDetailsBySlug, getProductPagination } from "@/services/products.service";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>
  }

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const slug = (await params).id
  console.log('<<=== 🚀 slug ===>>',slug);
 
  const productDetail = await getProductDetailsBySlug(slug);

  console.log('<<=== 🚀 productDetail generateMetadata ===>>',productDetail);
  
 if (!productDetail || !productDetail.data) {
    return {
      title: "Product Not Found",
      description: "The requested product does not exist.",
    }
  }
  return {
    title: productDetail.data.product_name,
    description: productDetail.data.product_name,
  }
}

interface IProduct {
  slug: string;
}

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60

export async function generateStaticParams() {
  //Render ra 10 sản phẩm để tạo các trang tĩnh
  const products = await getProductPagination(1, 10);
  return products.data.items.map((product: IProduct) => ({
    id: String(product.slug),
  }))
}

const ProductDetail = async({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  //Mục tiêu là lấy được slug từ URL để gọi API
  console.log('params:', (await params).id);
  const slug = (await params).id;
  console.log('<<=== 🚀  ===>>',);
  //Gọi API lấy chi tiết sản phẩm theo slug
  const productDetail = await getProductDetailsBySlug(slug);
  return (
    <main className="container mx-auto my-5">
        <h1>Product Detail</h1>
        <h2>{productDetail.data.product_name}</h2>
        <div>{productDetail.data.price}</div>
    </main>
  )
}

export default ProductDetail