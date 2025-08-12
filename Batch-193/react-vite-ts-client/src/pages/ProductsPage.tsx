import ProductsGrid from "@/components/ProductsGrid";
import { getProductByCategorySlug, type ProductResponse } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
const ProductsPage = () => {
  const params = useParams();

  console.log('<<=== 🚀 params ===>>',params);
  const slug = params.slug || '';

  const queryCategorySlug = useQuery<ProductResponse>({
    queryKey: ['category', slug],
    queryFn: () => getProductByCategorySlug(slug),
    enabled: !!slug, // Only run the query if slug is defined
  });

  console.log('<<=== 🚀 queryCategorySlug ===>>',queryCategorySlug.data);
  return (
    <main className="container mx-auto px-4 py-8">
      <h1>Category name</h1>
      <ProductsGrid products={queryCategorySlug.data?.products || []} />
    </main>
  )
}

export default ProductsPage