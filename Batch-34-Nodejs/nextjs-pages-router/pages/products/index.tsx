import DefaultLayout from "@/components/layouts/DefaultLayout"
import { IProduct } from "@/types/FakeAPI";
import Link from "next/link"

export default function Products({products}: {products: IProduct[]}) {
  return <DefaultLayout>

    <h1 className="text-2xl font-bold">Products Page</h1>

    <ul>
    {
        products.map((item)=>{
          return (
            <li key={item.id}>
              
              <Link href={`/products/${item.id}`} >ID: {item.id} - {item.title} - {item.price}</Link>
              </li>
          )
        })
      }
    </ul>

  </DefaultLayout>
}


// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get products
  const res = await fetch('https://api.escuelajs.co/api/v1/products')
  const products = await res.json()
 
  // By returning { products: { products } }, the Products component
  // will receive `products` as a prop at build time
  return {
    props: {
      products,
    },
  }
}