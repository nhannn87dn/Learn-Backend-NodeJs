import ProductGrid from "@/components/ui/ProductGrid";
import { ENV } from "@/config/envConfig";
import { cacheLife, cacheTag } from "next/cache";
import { Suspense } from "react";

const ProductsList = async () => {
  'use cache'
  cacheLife({ expire: 60*3 }) //seconds
  cacheTag('products')

  const response = await fetch(`${ENV.BASE_URL_API}/v1/products`);
  const data = await response.json();

  return <ProductGrid products={data.data.records} />
}

const ProductsListPage = async  () => {
  return (
    <main className='container mx-auto'>
      <h1 className='text-3xl font-bold underline'>Products List Page</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsList />
      </Suspense>
    </main>
  )
}

export default ProductsListPage