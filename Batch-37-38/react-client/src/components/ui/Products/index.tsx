import {
    useQuery
  } from '@tanstack/react-query'
import axios from 'axios';
import globalConfigs from '../../../constants/config'
import numeral from 'numeral';
import { Link } from 'react-router-dom';
type TProps = {
    title: string;
    id: string;
    limit?: number
}
const Products = ({title='', id='', limit= 4}: TProps) => {
    const getProducts = async ()=>{
        const response = await axios.get(globalConfigs.urlAPI + `/v1/products/client/getall?cat_id=${id}&page=1&limit=${limit}`)
        console.log(getProducts,response);
        return response.data
    }
    const {data: products, isError, isLoading, error} = useQuery({ 
        queryKey: ['homeproduct',id], 
        queryFn: getProducts 
    });

  return (
    <div className="">
        <div className="cart_title flex justify-between">
            <h2 className="text-3xl">{title}</h2>
            <div className="mores">
                <Link to={`/categories/${id}`}>Xem tất cả</Link>
            </div>
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
    </div>
  )
}

export default Products