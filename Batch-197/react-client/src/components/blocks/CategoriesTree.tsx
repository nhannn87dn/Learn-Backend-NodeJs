import { ENV } from "@/config/env";
import type { TCategory } from "@/types/category";
import type { ApiResponse } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
const fetchCategoriesTree = async (): Promise<ApiResponse<TCategory[]>> => {
  const response = await axios.get(`${ENV.API_URL}/v1/categories/public/categories-tree`);
  return response.data;
}

const CategoriesTree = () => {

   /** React Query get CategoriesTree */
  const queryCategoriesTree = useQuery({
    queryKey: ['categoriesTree'],
    queryFn: fetchCategoriesTree,
  });

  console.log('<<=== 🚀 queryCategoriesTree ===>>',queryCategoriesTree.data);

  return (
    <ul>
      {queryCategoriesTree.data?.data?.map((category) => (
        <li key={category._id}>
          <Link
            to={`/categories/${category.slug}`}
            className="text-blue-500 hover:underline"
          >
            {category.category_name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoriesTree;
