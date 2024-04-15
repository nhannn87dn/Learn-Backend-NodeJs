//categories/:id
import React from 'react'
/**
 * Đối với Nextjs pages router
 * mặc định nó là client rendering
 */

type TCategory = {
  id: number;
  name: string;
}

const CategoryDetails = ({category}: {category: TCategory}) => {
   console.log(category);
  return (

    <div>
      <h1>{category?.name}</h1>
    </div>
  )
}

export default CategoryDetails

// Fetch API cho Route Dynamic

//hàm này để tạo ra đường dẫn tĩnh cho all các các URL Dynamic
// categories/1
//categories/2
//Bạn ko thể dùng getStaticPaths với getServerSideProps
export const getStaticPaths = (async () => {

  const res = await fetch('https://api.escuelajs.co/api/v1/categories')
  const categories = await res.json();

  const paths = categories.map((category: any) => ({
    params: { 
      id: category.id.toString() //convert ID to string
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
  const url = `https://api.escuelajs.co/api/v1/categories/${params.id}`;
  const res = await fetch(url)
  const category = await res.json()

  //Check xem có tồn tại sp có id đó không
  if (!category) {
    return {
      notFound: true, 
      //trả về như thế này nếu ko tìm thấy
      //Bạn cần cấu hình thêm fallback: false trong getStaticPaths
    }
  }
  
  console.log('category', url, category);
 
  return {
    props: {
      category, //đưa categories vào props
    },
    revalidate: 10, // In seconds
  }
}