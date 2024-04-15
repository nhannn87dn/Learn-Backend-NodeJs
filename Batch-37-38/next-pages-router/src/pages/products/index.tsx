import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
type TProduct = {
  id: number;
  title: string;
  price: number,
}


const ProductPage = ({products}: {products: TProduct[]}) => {
  return (
    <div>
      <h1>Products List</h1>
      <ul className='flex justify-between flex-wrap gap-y-5'>
      {products.length> 0 && products.map((product: any)=>{
        return (
          <li className='w-[220px]' key={product.id}>
              <Link href={`/products/${product.id}`}>
                <div className="photo bg-slate-200 w-full h-[120px]">
                {/*  */}
                  {/* <Image 
                  height={120}
                  width={120}
                  src={product.images[0]} 
                  alt={product.title}
                  /> */}
                </div>
                <h3>{product.title}</h3>
                <p>{product.images[0]}</p>
                <div><strong>
                  {product.price}
                  </strong></div>
              </Link>
          </li>
        )
      })}
      </ul>
    </div>
  )
}

export default ProductPage


//Fetch API cho Route Tĩnh

/**
 * Khi sử dụng getStaticProps
 * thì kết quả của việc fetch API sẽ được 
 * fetch render thành file HTML tĩnh khi build
 * thì khi chạy trên production nội dung sẽ cố định.
 * Nhưng nếu bạn muốn làm tươi nội dung thì cần cấu hình thêm
 * revalidate như bên dưới
 */

export async function getStaticProps() {
  /**
   * Cứ muốn lấy cái gì từ API đem vào trong Component
   * thì fetch API rồi lấy kết quả đưa vào props
   */
  const res = await fetch('https://api.escuelajs.co/api/v1/products')
  const products = await res.json()
 
 
  return {
    props: {
      products, //đưa products vào props
    },
    revalidate: 10, // In seconds
  }
}