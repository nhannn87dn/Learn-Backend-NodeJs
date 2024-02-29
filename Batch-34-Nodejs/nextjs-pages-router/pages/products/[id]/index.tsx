import { useRouter } from 'next/router'
import DefaultLayout from "@/components/layouts/DefaultLayout"
import { IProduct } from '@/types/FakeAPI'
import Head from 'next/head'

export default function ProductsDetails({product}: {product: IProduct}) {

  const router = useRouter()

  return <DefaultLayout>
    ProductsDetails Page- ID Product: {router.query.id}
    <Head>
      <title>{product.title}</title>
      <meta name="description" content={product.description} />
    </Head>
    <h2>{product.title}</h2>
    <div>
      <strong>{product.price}</strong>
    </div>
  </DefaultLayout>
}


export async function getStaticProps({ params }: {params: any}) {
  // params contains the post `id`.
  // If the route is like /products/1, then params.id is 1
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${params.id}`)
  const product = await res.json();


  console.log(product);
  //Bắt lỗi 404
  if (!product) {
    return {
      notFound: true,
    }
  }
  // Pass post data to the page via props
  return { props: { 
      product
   },
   // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // Sau 10s, thì nội dung trang này sẽ được làm mới lại
  }
}


// This function gets called at build time
//==> SInh ra danh sách các đường dẫn
//products/7
//products/8
//products/9
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://api.escuelajs.co/api/v1/products')
  const products: IProduct[] = await res.json();

  //Chỉ lấy 5 sp đầu để test cách nó sinh ra site tĩnh
  const shortProduct = products.slice(0,5);


  // Get the paths we want to pre-render based on posts
  const paths = shortProduct.map((product) => ({
    params: { id: product.id.toString() },
  }))
 
  // We'll pre-render only these paths at build time.
  // { fallback: false } báo lỗi 404 khi xuất hiện 1 trang nằm ngoài danh sách các trang đã build.
  // {fallback: "blocking" } thì các trang chưa được build, --> tự động build khi chạy
  
  return { 
    paths, 
    fallback: "blocking" 
  }
}