import {IProduct} from '../../constants/types';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import ProductSkeleton from '../../components/ProductSkeleton';
import { useCartStore } from '../../hooks/useCartStore';


const Home = () => {

  const {addItem} = useCartStore();

  //================ Category One =====================//
  const fetchProductsOne = async (categoryId = 1, limit = 4): Promise<IProduct[]> => {
    const url = `https://api.escuelajs.co/api/v1/products?offset=0&limit=${limit}&categoryId=${categoryId}`;
    return fetch(url).then((res) => res.json());
  };
  // Sử dụng useQuery để fetch data từ API
  const queryCategoryOne = useQuery<IProduct[], Error>({
    queryKey: ['products_one', ],
    queryFn: ()=>fetchProductsOne(1,4),
  });

  //================ Category Two =====================//
  const fetchProductsTwo = async (categoryId = 1, limit = 4): Promise<IProduct[]> => {
    const url = `https://api.escuelajs.co/api/v1/products?offset=0&limit=${limit}&categoryId=${categoryId}`;
    return fetch(url).then((res) => res.json());
  };
  // Sử dụng useQuery để fetch data từ API
  const queryCategoryTwo = useQuery<IProduct[], Error>({
    queryKey: ['products_two', ],
    queryFn: ()=>fetchProductsTwo(2,4),
  });


  return (
   <>
   <section className="my-10">
      <div className="carousel flex justify-center items-center bg-slate-200 h-96  rounded">
          <h1>Carousel Full</h1>
      </div>
   </section>
   {/* Begin Category One */}
   <section className="my-10">
      <h2 className="text-3xl text-bold text-center my-5">Category One</h2>
      <div className="section_body">
      {queryCategoryOne.isLoading ? (
        <ProductSkeleton count={4} />
      ) : (
      <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {queryCategoryOne.data &&
          queryCategoryOne.data.map((product: IProduct) => (
            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                <Link to={`/products/${product.id}`}>
                <img src={product.images[0]} alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                </Link>
                <div className="px-4 py-3 w-72">
                  <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                  <Link to={`/products/${product.id}`} className="text-lg font-bold text-black truncate block capitalize">
                  {product.title}
                  </Link>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto my-3">${product.price}</p>
                    <div className="ml-auto cursor-pointer" onClick={()=>{
                      addItem({
                        id: product.id,
                        name: product.title,
                        price: product.price,
                        quantity: 1,
                        thumb: product.images[0]
                      })
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                        <path
                          fill-rule="evenodd"
                          d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                        />
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                      </svg>
                    </div>
                  </div>
                </div>
              
            </div>
          ))}
      </div>
      )}
      </div>
   </section>
    {/* End Category One */}

    {/* Begin Category Two */}
   <section className="my-10">
      <h2 className="text-3xl text-bold text-center my-5">Category Two</h2>
      <div className="section_body">
      {queryCategoryTwo.isLoading ? (
        <ProductSkeleton count={4} />
      ) : (
      <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {queryCategoryTwo.data &&
          queryCategoryTwo.data.map((product: IProduct) => (
            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                <Link to={`/products/${product.id}`}>
                <img src={product.images[0]} alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                </Link>
                <div className="px-4 py-3 w-72">
                  <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                  <Link to={`/products/${product.id}`} className="text-lg font-bold text-black truncate block capitalize">
                  {product.title}
                  </Link>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto my-3">${product.price}</p>
                    <div className="ml-auto cursor-pointer" onClick={()=>{
                      addItem({
                        id: product.id,
                        name: product.title,
                        price: product.price,
                        quantity: 1,
                        thumb: product.images[0]
                      })
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                        <path
                          fill-rule="evenodd"
                          d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                        />
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                      </svg>
                    </div>
                  </div>
                </div>
              
            </div>
          ))}
      </div>
      )}
      </div>
   </section>
    {/* End Category Two */}
   </>
  );
};

export default Home;
