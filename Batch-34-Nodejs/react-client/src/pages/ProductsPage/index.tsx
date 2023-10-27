import React from 'react';
import {Helmet} from "react-helmet";

import config from '../../constants/config';
import {
  useQuery,  } from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom';


const ProductsPage = () => {
  // const [product, setProduct] = React.useState(null);

  // React.useEffect(()=>{
  //     const fetchData = async ()=> {
  //         const res = await fetch(config.urlAPI+'/v1/products');
  //         const data = await res.json();
  //         console.log(data.data.products);

  //     }
  //     fetchData();
  // },[]);

  //Hàm fetch products
  const getProducts = async ()=> {
    return axios.get(config.urlAPI+'/v1/products');
  }

   // Queries
   const queryProducts = useQuery({ 
    queryKey: ['products'],
    queryFn: getProducts,
    onSuccess: (data)=>{
      //Thành công thì trả lại data
      console.log(data.data.data.products);
    },
    onError: (error)=>{
      console.log(error);
    },

  })


  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products List Page</title>
    </Helmet>
      <h1 className='text-2xl text-bold'>Products List</h1>
      {queryProducts.isLoading ? (<Skeleton count={10} />) : (
        <section id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
    
        {
          queryProducts.data && queryProducts.data.data.data.products ? queryProducts.data.data.data.products.map((product: any)=>{
            return (
              <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <Link to={`/products/${product.slug}`}>
            <img src={product.thumbnail} alt={product.name} className="h-80 w-72 object-cover rounded-t-xl" />
            <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                <p className="text-lg font-bold text-black truncate block capitalize">{product.name}</p>
                <div className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto my-3">${product.price}</p>
                    
                    <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                            <path
                                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg></div>
                </div>
            </div>
        </Link>
    </div>
            )
          }) : null
        }
    </section>
      )}
      
    </div>
  )
}

export default ProductsPage