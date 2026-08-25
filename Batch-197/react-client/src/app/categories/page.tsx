import ProductCard from "@/components/blocks/ProductCard";
import { ENV } from "@/config/env";
import type { TCategoryBySlugWithProducts } from "@/types/category";
import type { ApiResponse } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useSearchParams } from "react-router";



const getProductsByCategorySlug = async ({
  slug,
  limit = 5,
  page = 1,
  sortBy = "createdAt",
  sortType= "desc",
}: {
  slug: string;
  limit?: number;
  page?: number;
  sortBy?: string;
  sortType?: "asc" | "desc";
}): Promise<ApiResponse<TCategoryBySlugWithProducts>> => {
  const response = await axios.get(
    `${ENV.API_URL}/v1/categories/public/${slug}/products?limit=${limit}&page=${page}&sortBy=${sortBy}&sortType=${sortType}`,
  );
  return response.data;
};


const CategoryPage = () => {
    const { slug} = useParams<{slug: string}>();
    const [params] = useSearchParams();
    
    const limit = Number(params.get("limit") ?? 20);
    const page = Number(params.get("page") ?? 1);
    const sortBy = params.get("sortBy") ?? "createdAt";
    const sortType = (params.get("sortType") as "asc" | "desc") ?? "desc";

    //TODO: Get 20 products by category slug from API and display them here
    /** React Query get queryProductsByCategorySlug */
    const queryProductsByCategorySlug = useQuery({
      queryKey: ["ProductsByCategorySlug", slug, limit, page, sortBy, sortType],
      queryFn: () => getProductsByCategorySlug({ slug: String(slug), limit, page, sortBy, sortType }),
    });
    
    const products = queryProductsByCategorySlug.data?.data.products.records ?? [];

  if(queryProductsByCategorySlug.isLoading){
    return <div>Loading...</div>
  }

  if(queryProductsByCategorySlug.isError){
    return <div>Error: {queryProductsByCategorySlug.error instanceof Error ? queryProductsByCategorySlug.error.message : "Unknown error"}</div>
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default CategoryPage