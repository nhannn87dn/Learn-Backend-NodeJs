//products/:id
import React from 'react'
/**
 * Đối với Nextjs pages router
 * mặc định nó là client rendering
 */

type TProduct = {
  id: number;
  title: string;
  price: number,
}

const ProductDetails = ({product}: {product: TProduct}) => {
   console.log(product);
  return (

    <div>
      <h1>{product?.title}</h1>
    </div>
  )
}

export default ProductDetails

// Fetch API cho Route Dynamic

//hàm này để tạo ra đường dẫn tĩnh cho all các các URL Dynamic
// products/1
//products/2
export const getStaticPaths = (async () => {

  const res = await fetch('https://api.escuelajs.co/api/v1/products')
  const products = await res.json();

  const paths = products.map((product: any) => ({
    params: { 
      id: product.id.toString() //convert ID to string
    },
  }))

  return {
    paths,
    fallback: false, // true or "blocking"
  }
})
 

export async function getStaticProps({params}: {params: {id: string}}) {
  /**
   * Cứ muốn lấy cái gì từ API đem vào trong Component
   * thì fetch API rồi lấy kết quả đưa vào props
   */
  const url = `https://api.escuelajs.co/api/v1/products/${params.id}`;
  const res = await fetch(url)
  const product = await res.json()

  //Check xem có tồn tại sp có id đó không
  if (!product) {
    return {
      notFound: true, 
      //trả về như thế này nếu ko tìm thấy
      //Bạn cần cấu hình thêm fallback: false trong getStaticPaths
    }
  }
  
  console.log('product', url, product);
 
  return {
    props: {
      product, //đưa products vào props
    },
    revalidate: 10, // In seconds
  }
}