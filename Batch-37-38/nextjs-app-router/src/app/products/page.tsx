import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Products',
  description: 'Products description'
}


export default function ProductPage() {
    return <h1>Hello, Product page</h1>
}