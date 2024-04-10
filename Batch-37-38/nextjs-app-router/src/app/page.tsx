
import { Metadata } from 'next'
import Image from 'next/image'
export const metadata: Metadata = {
  title: 'Home',
  description: 'Home description'
}

export default function Home() {
  
  return (
    <div>
      <h1>Home Page</h1>
        <p>Chèn ảnh cách thông thường</p>
        <img src='thumbnail.jpg' alt='thumb' />
        <p>Chèn ảnh với Image</p>
        <ul>
          <li>Tối ưu hình ảnh</li>
        </ul>
        <Image 
        width={150} //để định hình kích thước render
        height={150} 
        src={'/thumbnail.jpg'} 
        alt='thumb'
        quality={75} // nén hình lại cho nhẹ
        priority={true} //true ==> thêm lazy load, cải thiện điểm Largest Contentful Paint
        />
        <p>Chèn hình từ bên ngoài vào</p>
        <Image
          width={150} //để định hình kích thước render
          height={150}
          alt='thumb 2'
         src={'https://ecshopvietnam.com/ecshopfashion/cdn/article_thumb/202103/galaxy-a82-5g-chuan-bi-ra-mat-voi-chip-flagship-va-man-hinh-truot-doc-dao-samfans-gom-lua-di-la-vua-thumb-1615347528.jpg'} 
         />
    </div>
  );
}
