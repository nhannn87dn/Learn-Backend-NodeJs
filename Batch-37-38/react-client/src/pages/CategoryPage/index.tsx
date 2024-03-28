import React from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom"
import axios from "axios";
import globalConfigs from '../../constants/config'
import { useQuery } from "@tanstack/react-query";
import numeral from "numeral";
const CategoryPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id || '';

  const [search] = useSearchParams();
  const page = search.get("page");
  const limit = search.get("limit");
  const int_page = page ? parseInt(page) : 1;
  const int_limit = limit ? parseInt(limit) : 2; //2 item / trang

  React.useEffect(()=>{
    if(id == ''){
      navigate('/')
    }
  },[id])

  const getCategory = async ()=>{
      const response = await axios.get(globalConfigs.urlAPI + `/v1/categories/${id}`)
      console.log(getCategory,response);
      return response.data.data;
  }
  const queryCategory = useQuery({ 
      queryKey: ['category',id], 
      queryFn: getCategory 
  });

  if(queryCategory.isError){
    console.log('isError',queryCategory.error.message);
    navigate('/404')
  }

const getProducts = async ()=>{
  const response = await axios.get(globalConfigs.urlAPI + `/v1/products/client/getall?cat_id=${id}&page=${int_page}&limit=${int_limit}`)
  console.log(getProducts,response);
  return response.data
}
const {data: products, isSuccess, isError, isLoading, error} = useQuery({ 
  //Bổ sung các searchParams vào để tạo key không trùng lặp
  queryKey: ['categories',id,int_page,int_limit], 
  queryFn: getProducts 
});

//Phân trang
type TPagination = {
  url: string;
  label: number
}
  let pagination: TPagination[] = [];
  if(isSuccess){

    for (let index = 1; index <= products.data.totalPages; index++) {
      pagination = [...pagination,{
        url: `/categories/${id}?page=${index}`,
        label:index
      }]
    }
  }

  console.log(pagination);

  return (
    <div>
      <h1 className="text-3xl">{queryCategory.data?.categoryName}</h1>
      <p>
      {queryCategory.data?.description}
      </p>

      <div className="filters my-5 flex gap-x-5">
          <Link to={''}>Giá tăng dần</Link>
          <Link to={''}>Giá giảm dần</Link>
      </div>

      {
            isLoading ? (<span>Loading ....</span>) : (
        <ul className='flex gap-x-[20px]'>          {
                products.data.products.length > 0 && products.data.products.map((product)=>{
                    return <li className='max-w-[220px]' key={product._id}>
                        <Link to={`/products/${product.slug}`}>
                        <div className="photos">
                            <img className='w-full' src={product.thumbnail} alt={product.productName} />
                        </div>
                        <h3>{product.productName}</h3>
                        <div className="price">
                            <strong>{numeral(product.price).format('0,0$')}</strong>
                        </div>
                        </Link>
                    </li>
                })
            }
        </ul>
        )
        }
        <div className="my-5 flex gap-x-3">
          {
            pagination.length > 0 && pagination.map((p)=>{
              return <Link key={p.label} to={p.url} className="border border-slate-500 px-3 py-2 rounded text-slate-900">{p.label}</Link>

            })
          }
        </div>
    </div>
  )
}

export default CategoryPage