import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { env } from "../constants/getEnvs";
import axios from "axios";
import { IProduct } from "../types/products";
import { useShoppingCartStore } from "../stores/useShoppingCartStore";

export default function ProductDetailsPage() {
  const {addCartItem} = useShoppingCartStore();
  const params = useParams();
  const slug = params.slug;
  console.log('<<=== 🚀 slug ===>>',slug);


  const fetchProductBySlug = async () => {
    const response = await axios.get(`${env.API_URL}/v1/products/public/getProductBySlug/${slug}`);
    return response.data.data;
  }
  const queryProductBySlug = useQuery<IProduct>({
    queryKey: ['product-by-slug', slug],
    queryFn: fetchProductBySlug
  });

  if (queryProductBySlug.isLoading) return <div>Loading...</div>;
  if (queryProductBySlug.isError) return <div>Error: {queryProductBySlug.error.message}</div>;
  if(!queryProductBySlug.data) return null;

  return (
    <div className="container mx-auto my-3">
      <div className="product_info_wrapper flex gap-x-[20px] bg-white">
          <div className="gallery w-[400px]">
            {/* Add your gallery images here */}
            <img className="w-full h-auto" src={queryProductBySlug.data.thumbnail} alt={queryProductBySlug.data.product_name} />
          </div>
          <div className="product-details flex-auto">
            {/* Add your product details here */}
            <h1 className="text-2xl font-bold">{queryProductBySlug.data.product_name}</h1>
            <div className="price">
              <strong>{queryProductBySlug.data.price}</strong>
            </div>
            <div className="actions">
              <button onClick={()=>{
                console.log('Add to cart');
                addCartItem({
                    _id: queryProductBySlug.data._id,
                    product_name: queryProductBySlug.data.product_name,
                    price: queryProductBySlug.data.price,
                    discount: queryProductBySlug.data.discount,
                    quantity: 1, // mặc định số lượng thêm là 1
                    thumb: queryProductBySlug.data.thumbnail, // ảnh minh họa
                })
              }}>Add To Cart</button>
            </div>
          </div>
      </div>
    </div>
  )
}
