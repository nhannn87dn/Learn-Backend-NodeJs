import { Metadata } from 'next'

/**
 * Thay vì đi set vào từng hàm fetch thì bạn có thể 
 * cấu hình 1 lần như sau
 */
//export const revalidate = 3600;

//Set meta tĩnh
// export const metadata: Metadata = {
//     title: 'ProductDetailPage',
//     description: 'ProductDetailPage description'
// }

async function getProduct(id: number) {
  /**
   * NextJS nó đã hỗ trợ cache lại
   */
  
const res = await fetch('https://api.escuelajs.co/api/v1/products/'+id, {
  //cache: 'force-cache',
  next: { 
      revalidate: 30, //đơn vị là seconds
      tags: ['products-detail',id.toString()] //key name cho bộ nhớ cache
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


// or Dynamic metadata
//Sinh ra title động theo tên sản phẩm
export async function generateMetadata({ params }: {params: {id: string}}) {
  const product = await getProduct(parseInt(params.id));
  return {
    title: product.title,
  }
}

/**
 * generateStaticParams
 * Nó sẽ tạo ra các URL tĩnh
 * /products/1
 * /products/2
 * ===========
 * Để khi build thì nó sinh ra file HTML tĩnh
 */
export async function generateStaticParams() {
  const products = await fetch('https://api.escuelajs.co/api/v1/products', {
    //cache: 'force-cache',
    next: { 
      revalidate: 30, //đơn vị là seconds
      tags: ['products'] //key name cho bộ nhớ cache
     } 
  })
  .then((res) => res.json())
 
  return products.map((product: any) => ({
    id: product.id.toString(), //tương ứng với folder [id] đã khai báo dynamic route
  }))
}

// Server Component
export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    console.log('params', params);
    const product = await getProduct(parseInt(params.id));
    console.log('<<=== 🚀 product ===>>',product);
    return (
      <>
      <h1>{product.title}</h1>
      <div><strong>{product.price} $</strong></div>
      </>
    )
}