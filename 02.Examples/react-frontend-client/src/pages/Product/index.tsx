import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import { useCartStore } from '../../hooks/useCartStore';
import ProductSkeleton from '../../components/ProductSkeleton';
import {IProduct} from '../../constants/types'
import ProductFilter from '../../components/ProductFilter';



type FiltersType = {
  categoryId?: number;
  price_min?: number;
  price_max?: number;
};


const Product = () => {
  const [params] = useSearchParams();

  const {addItem} = useCartStore();

  const page = params.get('page');
  const int_page = page ? parseInt(page) : 1;

  const cid = params.get('categoryId');
  const int_cid = cid ? parseInt(cid) : 0;

  const pmin = params.get('price_min');
  const int_price_min = pmin ? parseInt(pmin) : 0;

  const pmax = params.get('price_max');
  const int_price_max = pmax ? parseInt(pmax) : 0;

  console.log('<<=== 🚀 page ===>>', page, params);

  let newParams = {};

  if(cid){
    newParams = {...newParams,categoryId: int_cid}
  }

   if(page){
    newParams = {...newParams,page: int_page}
  }

  const [currentPage, setCurrentPage] = React.useState(int_page);

  // Sử dụng useQuery để fetch data từ API
  const fetchProducts = async (page: number, filters: FiltersType) => {
    // const page = 1;
    const offset = (page - 1) * 12;
    let url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=12`;
  
    if (filters.categoryId && filters.categoryId > 0) {
      url += `&categoryId=${filters.categoryId}`;
    }
    if (filters.price_min && filters.price_min > 0) {
      url += `&price_min=${filters.price_min}`;
    }
    if (filters.price_max && filters.price_max > 0) {
      url += `&price_max=${filters.price_max}`;
    }
  
    return fetch(url).then((res) => res.json());
  };
  
  const productQuery = useQuery<IProduct[], Error>({
    queryKey: ['products', { int_page, int_cid, int_price_min, int_price_max }],
    queryFn: () => fetchProducts(int_page, { categoryId: int_cid, price_min: int_price_min, price_max: int_price_max}),
  });

  //const totalPages = Math.ceil(data.length / recordsPerPage);
  const totalPages = 12; //Tổng số trang

  

  return (
    <>
      <h1 className="py-5 text-3xl font-bold text-center">Products List</h1>
      <div className='grid grid-cols-12'>
          <div className='col-span-12 md:col-span-2'>
              <ProductFilter queryString={newParams} currentPage={int_page} setCurrentPage={setCurrentPage} currentCategoryId={int_cid} />
          </div>
          <div className='col-span-12 md:col-span-10'>
                {productQuery.isLoading ? (
              <ProductSkeleton count={12} />
            ) : (
                
            <section className="w-fit mx-auto grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4  gap-8 mt-10 mb-10">
              {productQuery.data &&
                productQuery.data.map((product: IProduct) => (
                  <div key={`productQuery${product.id}`} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
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
            </section>
            )}

            {productQuery.data && productQuery.data.length > 0 ? (
              <div className='text-center mt-10'>
                <Pagination queryString={newParams} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
              </div>
            ) : null}

            <p className="my-3">
              Tham khảo phân trang: https://hygraph.com/blog/react-pagination hoặc https://www.educative.io/answers/how-to-implement-pagination-in-reactjs
            </p>
         </div>
      </div>
      
    </>
  );
};

export default Product;
