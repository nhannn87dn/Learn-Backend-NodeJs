/**
 * Server component
 */
import { Metadata } from 'next'
import Link from 'next/link';

/**
 * Title cho các trang tĩnh
 */
export const metadata: Metadata = {
  title: 'Products Page',
}

interface IProduct {
  id?: number;
  title: string;
  price: number
}

/**
 * Mặc định fetch sẽ được nextjs cache kết quả
 * @returns Mă
 */
const fetchProducts = async ()=>{
  const res =  await fetch(`https://api.escuelajs.co/api/v1/products`,
  { next: { revalidate: 30 } }); //Sau 30 giây thì API này được fetch lại,
  return res.json();
}


export default async function Page() {
  const products: IProduct[] = await fetchProducts();
  return (
    <>
      <h1>Product Page</h1>

      <ul>
        {
          products.map((product)=>{
            return <li key={product.id}>
              <Link href={`products/${product.id}`}>#{product.id} {product.title} - {product.price}</Link>
            </li>
          })
        }
      </ul>

    </>
  )
}

