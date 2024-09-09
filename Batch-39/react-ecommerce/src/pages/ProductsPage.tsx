import { useParams } from "react-router-dom";
import { SETTINGS } from "../constants/settings";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../hooks/useCart";

const ProductsPage = () => {
  const { addToCart } = useCart();

  const params = useParams();

  const slug = params.slug ? params.slug : null;
  //Nếu slug null thì sao ?

  const fetchProductBySlug = async () => {
    const res = await axios.get(
      `${SETTINGS.URL_API}/v1/products/details/${slug}`
    );
    return res.data.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["product-details", slug],
    queryFn: fetchProductBySlug,
  });

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          {data && (
            <div className="product_wrapper flex gap-x-5">
              <div className="gallery">
                <img src={data.thumbnail} alt={data.product_name} />
              </div>
              <div className="product_info">
                <h1 className="text-2xl font-bold">{data.product_name}</h1>
                <div className="price">
                  <strong className="text-red-700">{data.price}</strong>
                </div>
                <div className="actions">
                  <button
                    onClick={() => {
                      console.log("Thêm vào giỏ hàng");
                      addToCart({
                        product: data._id,
                        product_name: data.product_name,
                        price: data.price,
                        discount: data.discount,
                        thumbnail: data.thumbnail,
                        quantity: 1, //mặc định là 1
                      });
                    }}
                    type="button"
                  >
                    Mua Ngay
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductsPage;
