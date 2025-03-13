import axios from "axios";
import { Link, useParams } from "react-router";
import { env } from "../constants/getEnvs";
import { ICategory } from "../types/categories";
import { useQuery } from "@tanstack/react-query";
import {Helmet} from "react-helmet";
import { IProductList } from "../types/products";

export default function ProductByCategoryPage() {
  const params = useParams();
  const slug = params.slug;
  console.log('<<=== 🚀 slug ===>>',slug);

  const fetchCategoryBySlug = async () => {
      const response = await axios.get(`${env.API_URL}/v1/categories/public/getCategoryBySlug/${slug}`);
      return response.data.data;
  }
  const queryCategoryBySlug = useQuery<ICategory>({
      queryKey: ['category', slug],
      queryFn: fetchCategoryBySlug
  });

  const fetchProductsByCategoryBySlug = async () => {
    const response = await axios.get(`${env.API_URL}/v1/products/public/getProductsByCategorySlug/${slug}`);
    return response.data.data;
  }
  const queryProductsByCategoryBySlug = useQuery<IProductList>({
    queryKey: ['products-by-category-slug', slug],
    queryFn: fetchProductsByCategoryBySlug
  });

  return (
    <div className="container mx-auto my-3">
      <Helmet>
        <title>{queryCategoryBySlug.data?.category_name}</title>
        <meta name="description" content={queryCategoryBySlug.data?.description} />
        <link rel="canonical" href={`${env.FRONTEND_URL}/categories/${slug}`} />
      </Helmet>
      <h1 className="text-2xl font-bold">{queryCategoryBySlug.data?.category_name}</h1>
      {
        queryProductsByCategoryBySlug.isLoading && <p>Loading...</p>
      }
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {
          queryProductsByCategoryBySlug.data && queryProductsByCategoryBySlug.data.products.length > 0 && queryProductsByCategoryBySlug.data.products.map((p) => {
            return (
              <Link to={`/products/${p.slug}`} className="item border p-4" key={p._id}>
                <div className="thumbnail mb-2">
                  <img src={p.thumbnail} alt={p.product_name} className="w-full h-auto" />
                </div>
                <h3 className="font-bold text-lg mb-2">{p.product_name}</h3>
                <div className="price text-xl font-semibold">
                  <strong>{p.price}</strong>
                </div>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}
