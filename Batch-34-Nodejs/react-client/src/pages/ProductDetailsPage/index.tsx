import React from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import config from '../../constants/config';
import {
  useQuery,  } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import {Helmet} from "react-helmet";

interface IProduct {
  data: {
    name: string;
    price: number;
    description: string
  };
  message: string;
  statusCode: number
}

const ProductDetailsPage = () => {
  let params = useParams();
    console.log(params);
  //const id = params.id;
  const slug = params.slug;
    //Hàm fetch products
  const getProduct =  (slug: string): Promise<IProduct> => {
    return axios.get(config.urlAPI+'/v1/products/slug/'+slug);
  }

   // Queries

  const {data: product, isLoading, isError, error} = useQuery<IProduct, Error>({ 
    queryKey: ['product_details', slug],
    queryFn: ()=> getProduct(slug as string),
    onSuccess: (data)=>{
      //Thành công thì trả lại data
      console.log(data?.data.data);
    },
    onError: (error)=>{
      console.log(error);
    },

  })

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{product?.data?.data.name}</title>
    </Helmet>
      <h1 className='text-3xl font-bold'>{product?.data?.data.name}</h1>
      <img src={product?.data?.data.thumbnail} alt={product?.data?.data.name} />
      <div>
      <strong>${product?.data?.data.price}</strong>
      </div>
      <button onClick={()=>{
        console.log('Thêm giỏ hàng ID',slug);
      }} type='button' className='bg-indigo-500 text-white py-2 px-5 rounded'>Add to Cart</button>
    </div>
  )
}

export default ProductDetailsPage