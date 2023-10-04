import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Customer Orders',
  description: 'Customer desc'
}


export default function Page() {
    return <h1>Customer Orders Page</h1>
  }