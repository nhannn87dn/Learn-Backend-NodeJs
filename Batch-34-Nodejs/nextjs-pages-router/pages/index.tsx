import DefaultLayout from "@/components/layouts/DefaultLayout"
import Image from "next/image"
import { IProduct } from "@/types/FakeAPI";


export default function Home({clothes, electronics}: {clothes: IProduct[], electronics: IProduct[]}) {
  return (
    <DefaultLayout>
      <h1 className='text-2xl font-bold'>Hello NextJs </h1>
      <p>Sử dụng hình ảnh local</p>

      <Image width={200} height={200} src={'/images/xiaomi-redmi-note-11s-5g.jpg' } alt='Xiaomi note 11' />
      
      <p>Sử dụng hình ảnh từ nguồn bên ngoài nhúng vào</p>

      <Image width={200} height={200} src={'https://ecshopvietnam.com/ecshopmi/cdn/images/202204/thumb_img/xiaomi-11-lite-5g-ne-thumb-G4311-1650508360053.jpg' } alt='Xiaomi note 11' />

      <h2>Dùng biến clothes</h2>
      <ul>
      {
        clothes.map((item)=>{
          return (
            <li key={item.id}>{item.title}</li>
          )
        })
      }
      </ul>
    </DefaultLayout>
  )
}



// This gets called on every request
/**
 * Cứ mỗi lần f5 thì API được gọi lại
 * @returns G
 */
export async function getServerSideProps() {
  // Fetch data from external API
  // Fetch data from external API
  const resClothes = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=1&offset=0&limit=4`);
  const clothes = await resClothes.json();
  
  const resElectronics = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=1&offset=0&limit=4`);
  const electronics = await resElectronics.json();

  //Đưa toàn bộ API vào đây
 
  // Pass data to the page via props
  return { props: { 
        clothes,
        electronics 
    } 
  }
}