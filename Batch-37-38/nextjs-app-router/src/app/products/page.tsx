import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
 
export const metadata: Metadata = {
  title: 'Products',
  description: 'Products description'
}

async function getProducts() {
  /**
   * NextJS nó đã hỗ trợ cache lại
   */
  
  const res = await fetch('https://api.escuelajs.co/api/v1/products', {
    //cache: 'force-cache',
    next: { 
      revalidate: 30, //đơn vị là seconds
      tags: ['products'] //key name cho bộ nhớ cache
     } 
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

/** Server component */
export default async function ProductPage() {
    const products = await getProducts();
    console.log('<<=== 🚀 products ===>>',products);

  return (
    <>
    <h1>Hello, Product List</h1>
    <ul className='flex justify-between flex-wrap gap-y-5'>
      {products.map((product: any)=>{
        return (
          <li className='w-[220px]' key={product.id}>
              <Link href={`/products/${product.id}`}>
                <div className="photo bg-slate-200 w-full h-[120px]">
                {/* {product.images[0]} */}
                  {/* <Image 
                  height={120}
                  width={120}
                  src={product.images[0]} 
                  alt={product.title}
                  /> */}
                </div>
                <h3>{product.title}</h3>
                <div><strong>
                  {product.price}
                  </strong></div>
              </Link>
          </li>
        )
      })}
      
    </ul>
    
    </>
  )
}