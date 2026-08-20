import type { ApiResponse } from "@/types/response";
import SectionBlock from "./SectionBlock";
import { ENV } from "@/config/env";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { TCategoryWithProducts } from "@/types/category";
import { Link } from "react-router";
import ProductCard from "./ProductCard";

const fetchHomeProducts = async ({
  categoryId,
  limit = 5,
}: {
  categoryId: string;
  limit?: number;
}): Promise<ApiResponse<TCategoryWithProducts>> => {
  const response = await axios.get(
    `${ENV.API_URL}/v1/categories/public/${categoryId}/home-products?limit=${limit}`,
  );
  return response.data;
};

const HomeProducts = ({
  categoryId,
  limit = 5,
}: {
  categoryId: string;
  limit?: number;
}) => {
  /** React Query get HomeProducts */
  const queryHomeProducts = useQuery({
    queryKey: ["HomeProducts", categoryId, limit],
    queryFn: () => fetchHomeProducts({ categoryId, limit }),
  });

  const products = queryHomeProducts.data?.data.products ?? [];

  return (
    <SectionBlock
      title={queryHomeProducts.data?.data.category.category_name ?? "No Name"}
      className="mt-10"
      extra={
        <Link
          to={`/category/${queryHomeProducts.data?.data.category.slug}`}
          className="text-blue-500 hover:underline"
        >
          View All
        </Link>
      }
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </SectionBlock>
  );
};

export default HomeProducts;
