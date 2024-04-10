import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'ProductDetailPage',
    description: 'ProductDetailPage description'
  }
// Server Component
export default function ProductDetailPage({ params }: { params: { id: string } }) {
    console.log('params', params);
    return <h1>Hello, ProductDetailPage</h1>
}