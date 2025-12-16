import ProductPagination from "@/components/blocks/ProductPagination";
import ProductsGrid from "@/components/blocks/ProductsGrid";
import { getProductPagination } from "@/services/products.service";

const ProductsPage = async (
  {
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
) => {
  //lấy phân trang
  const page = (await searchParams).page ? parseInt((await searchParams).page as string) : 1;
   const products = await getProductPagination(page, 10);
   console.log('<<=== 🚀 products ===>>',products);
  return (
    <main className="container mx-auto my-5">
        <h1>Products List</h1>
        <ProductsGrid products={products.data.items} />
        <ProductPagination 
        totalPage={products.data.pagination.totalPage} 
        totalRecords={products.data.pagination.totalRecords}
         />
    </main>
  )
}

export default ProductsPage