import Link from "next/link";

import type { Metadata } from 'next'
 


export const metadata: Metadata = {
  title: 'Products',
  description: 'Products desc'
}



async function getData() {
  const res = await fetch("https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products",{ next: {revalidate: 5, tags: ['products-all'] }});
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface ProductType {
  id: string;
  name: string;
  price: string;
  desc: string;
  createdAt: string;
  meterial: string;
  catId: string;
  slug: string;
}

export default async function Page() {
  const data: ProductType[] = await getData();
  return (
    <>
      <h1>Products Page</h1>
      <ul>
        {data.map((item) => {
          return (
            <li key={item.id}>
              <Link href={`/products/${item.slug}/${item.id}`}>
                {item.id} - {item.name} - {item.price}
              </Link>

              |  <Link href={`/products/edit/${item.id}`}>Edit</Link>

            </li>
          );
        })}
      </ul>
    </>
  );
  }