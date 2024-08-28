import axios from "axios";
import { SETTINGS } from "../constants/settings";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

const CategoryPage = () => {
  const params = useParams();

  const slug = params.slug ? params.slug : null;
  //Nếu slug null thì sao ?

  const fetchProductsBySlug = async () => {
    const res = await axios.get(`${SETTINGS.URL_API}/v1/products/slug/${slug}`);
    return res.data.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", slug],
    queryFn: fetchProductsBySlug,
  });

  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Category Name</h1>
      {/* Danh sách sản phẩm thuộc danh mục đang chọn */}
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <div className="product_wrapper flex gap-3 flex-wrap">
          {data &&
            data.length > 0 &&
            data.map((p) => {
              return (
                <div className="border border-slate-300 w-[285px]" key={p._id}>
                  <Link to={`/products/${p.slug}`}>
                    <div className="thumb">
                      <img
                        className="w-full h-auto"
                        src={p.thumbnail}
                        alt={p.product_name}
                      />
                    </div>
                    <h3>{p.product_name}</h3>
                    <div className="price">
                      <strong className="text-red-700">{p.price}</strong>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default CategoryPage;
