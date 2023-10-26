# NextJs and Backend APIs

Trong bài học tiếp theo này chúng ta tìm hiểu:

- Các khái niệm Rendering trong NextJs
- Data Fetching - Cách lấy dữ liệu từ API
- Optimization - Tối ưu Performance

## 💛Rendering

Mặc định nextjs sẽ **pre-render** có nghĩa là Nextjs sẽ tạo ra file HTML tĩnh cho mỗi trang.

Điều này giúp tăng performance và SEO

Vậy Pe-render là gì ?

### 🔹 Pre-rendering

NextJs có 2 hình thức pre-rendering:

- Static Generation: HTML được generated ra tại lần bạn đánh lệnh build, và được tái sử dụng cho các request sau.
- Server-side Rendering: HTML được generated cho mỗi lần request.

Vậy khi nào thì dùng cái nào ?

- **Static Generation** được đề xuất dùng trong hầu hết các trường hợp nhằm tăng hiệu suất. Nếu bạn đang lo ngại vậy nếu như cần cập nhật dữ liệu mới thì sao. NextJs cho phép bạn cấu hình tự động generated lại sau 1 khoảng thời gian ấn định để làm tươi nội dung.

- **Server-side Rendering**: phù hợp cho các trường hợp cần thông tin động, cập nhật liên tục để đáp ứng nhu cầu người dùng.

---
### 🔹 **Server-side Rendering (SSR)**

Trong kiến trúc SSR, khi một yêu cầu từ trình duyệt được gửi đến máy chủ, Next.js sẽ chạy mã JavaScript phía máy chủ để tạo ra nội dung HTML của trang. Sau đó, trang HTML này sẽ được gửi đến trình duyệt của người dùng để hiển thị.

==> Xảy ra tại Server
### 🔹 **Client-side Rendering (CSR)**

Trong kiến trúc CSR, khi người dùng truy cập vào một trang, trình duyệt sẽ tải mã JavaScript của ứng dụng và chạy nó. Mã JavaScript này sẽ tạo ra nội dung HTML và gắn kết các sự kiện và tương tác người dùng. Các yêu cầu dữ liệu sau đó được gửi từ trình duyệt đến máy chủ thông qua API để lấy dữ liệu cần thiết, và sau đó nội dung trang được cập nhật dựa trên dữ liệu trả về.

==> Xảy ra tại trình duyệt

### 🔹 **Static Site Generation (SSG)**

Static Site Generation (SSG) là một phương pháp cho phép tạo ra các trang web tĩnh (static websites) bằng cách xây dựng và render toàn bộ nội dung trong quá trình build trước khi triển khai.

```bash
next build
```

Khi người dùng truy cập vào một trang web được tạo bằng phương pháp SSG, trình duyệt chỉ cần tải các tệp tĩnh đã được tạo trước và hiển thị chúng ngay lập tức mà không cần chờ đợi yêu cầu máy chủ. Do đó, thời gian tải trang ban đầu thường rất nhanh và trải nghiệm người dùng tốt.



### 🔹 **Incremental Static Regeneration (ISR)**

Incremental Static Regeneration (ISR) là một phương pháp mở rộng của Static Site Generation (SSG).

Cho phép bạn tạo và update các trang tĩnh trong lần build trước, sau một thời gian do bạn cấu hình mà không cần build app lại từ đâu.


Cụ thể như thế nào chúng ta tìm hiểu trong phần tiếp sau đây

---

## 💛 Data Fetching

### getServerSideProps - Server-side Rendering (SSR)

 Với cách dùng `getServerSideProps` thì API sẽ được fetch lại cho mỗi request đến trang chủ.


Fetch data cho trang chủ:

- https://api.escuelajs.co/api/v1/products/?categoryId=1&offset=0&limit=4
- https://api.escuelajs.co/api/v1/products/?categoryId=2&offset=0&limit=4


```tsx

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const resClothes = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=1&offset=0&limit=4`);
  const clothes = await res.json();

  const resElectronics = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=1&offset=0&limit=4`);
  const electronics = await res.json();
 
  /**
   * Truyền giá trị lấy được lên qua props của component
   */
  return { props: { 
        clothes,
        electronics 
      }
    }
}

/**
 * Bạn nhận được kết quả nó như sau
 */
export default function Page({ clothes,  electronics}) {
  // Render data...
}
 
```


### getStaticProps - Static Site Generation (SSG)

Với cách dùng `getStaticProps` thì Nextjs sẽ pre-render và gen thành file HTML tĩnh khi bạn đánh lệnh `next build`

Fetch data cho trang Products: https://fakeapi.platzi.com/en/rest/products


```tsx
export default function Page({ products }) {
  // Render products...
}
 
// This function gets called at build time
//Context parameter: https://nextjs.org/docs/pages/api-reference/functions/get-static-props#context-parameter
export async function getStaticProps() {
  // Call an external API endpoint to get posproductsts
  const res = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=10')
  const products = await res.json();

  
 
  // By returning { props: { postproductss } }, the User component
  // will receive `products` as a prop at build time
  return {
    props: {
      products,
    },
  }
}
```


### getStaticProps - Incremental Static Regeneration (ISR)

- Cách này thường dùng cho các site dynamic routes.
- Tất cả các đường dẫn fetch được sẽ gen thành html page khi build.
- Nếu có set `revalidate` thì sau thời gian ấn định, NextJS sẽ tự render và tạo page khi có URL mới phát sinh.


```tsx
function Page({ product }) {
  return (
    <ul>
      {products.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
 
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
//Context parameter: https://nextjs.org/docs/pages/api-reference/functions/get-static-props#context-parameter
export async function getStaticProps({params}) {
  const {id} = params.id;
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
  const product = await res.json();

  if (!data) {
    return {
      notFound: true,
    }
  }
 
  return {
    props: {
      product,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}
 
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const res = await fetch('https://api.escuelajs.co/api/v1/products')
  const products = await res.json()
 
  // Get the paths we want to pre-render based on products
  const paths = products.map((product) => ({
    params: { id: product.id },
  }))
 
  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}
 
export default Page
```


### Client-side Fetching

- Dùng khi trang của bạn không cần SEO, vì nó render ở trình duyệt.
- Dùng useEffect và fetch API như trong React

```tsx
import { useState, useEffect } from 'react'
 
function Profile() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('/api/profile-data')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
 
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  )
}
```

- Có thể dùng các thư viện khác như React Query, SWR để fetch, cache và mutation Data

```tsx
import useSWR from 'swr'
 
const fetcher = (...args) => fetch(...args).then((res) => res.json())
 
function Profile() {
  const { data, error } = useSWR('/api/profile-data', fetcher)
 
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
 
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  )
}
```


## 💛 Optimization - Tối ưu Performance

### Tối ưu load Ảnh - Images

Chi tiết: https://nextjs.org/docs/pages/building-your-application/optimizing/images

```tsx
import Image from 'next/image'
 
export default function Page() {
  return (
    <>
     <Image
      src="./local-images.png"
      alt="local-images"
      width={500}
      height={500}
    <Image
      src="https://s3.amazonaws.com/my-bucket/profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
    </>
  )
}
```

Với các hình ảnh từ bên ngoài bạn cần phải cấu hình thêm ở file `next.config.js`:

```ts
module.exports = {
  images: {
    domains: ['s3.amazonaws.com'],
  },
}
```

Xem thêm: https://nextjs.org/docs/app/api-reference/components/image#remotepatterns


### Tối ưu load Font

Chi tiết xem: https://nextjs.org/docs/app/building-your-application/optimizing/fonts

### Tối ưu SEO với meta Tag

Chi tiết xem: https://nextjs.org/docs/pages/api-reference/components/head

Các Tips chủ đề về SEO: https://nextjs.org/learn/seo/introduction-to-seo

### Tối ưu load Component - Lazy Loading

Xem chi tiết: https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading