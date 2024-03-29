import { useParams, useNavigate } from "react-router-dom"
import axios from "axios";
import globalConfigs from '../../constants/config'
import { useQuery } from "@tanstack/react-query";
import numeral from "numeral";
import { useCartStore } from "../../hooks/useCartStore";
const ProductPage = () => {
  const {addItem} = useCartStore();

  const params = useParams();
  const navigate = useNavigate();
  const slug = params.slug || '';
  console.log(slug);

  const getProduct = async ()=>{
    const response = await axios.get(globalConfigs.urlAPI + `/v1/products/slug/${slug}`)
    return response.data
  }
  const {data: product, isSuccess, isError, isLoading, error} = useQuery({ 
    //Bổ sung các searchParams vào để tạo key không trùng lặp
    queryKey: ['product-details',slug], 
    queryFn: getProduct 
  });

  if(isError){
    console.log(error.message);
    navigate('/404')
  }

  return (
    <div>
      {
        isLoading ? (<span>Loading....</span>) : (
          <div className="product_details flex">
              <div className="gallery">
                  <img src={product.data.thumbnail} alt={product.data.productName} />
              </div>
              <div className="product_info">
                  <h1 className="text-2xl">{product.data.productName}</h1>
                  <div className="price">
                  <strong>{numeral(product.data.price).format('0,0$')}</strong>
                  </div>
                  <div className="">
                    {product.data.description}
                  </div>
                  <div className="actions my-5">
                      <button onClick={()=>{
                        addItem({
                          product: product.data._id,
                          name: product.data.productName,
                          price: product.data.price,
                          quantity: 1,
                          thumb: product.data.thumbnail
                        })
                      }}  className="bg-indigo-700 hover:bg-indigo-900 text-white py-3 px-5 rounded">Add To Cart</button>
                  </div>
              </div>
          </div>
        )
      }
      <h1></h1>
    </div>
  )
}

export default ProductPage