# NextJs and Backend APIs

Sử dụng NextJS để làm giao diện cho phía người dùng cuối (End Users)

Fake API: https://fakeapi.platzi.com/en/rest/products

Để dễ hình dung về cách tiếp cận NextJS, chúng ta cùng làm một project nhỏ với các trang:


- Trang chủ: Hiển thị 4 sản phẩm danh mục A, 4 sản phẩm danh mục B
- Sản phẩm: Hiển thị sản phẩm trang 1
- Chi tiết sản phẩm: Hiển thị thông tin chi tiết 1 sản phẩm dựa vào ID

---

## 💛 Cài đặt

Để làm quen với NextJS thì chúng ta sẽ đi theo hướng là **Pages Router**

```bash
npx create-next-app@latest
```
Sau đó bạn cấu hình lần lượt như sau:


```bash
What is your project named? next-page-router
Would you like to use TypeScript? No / Yes ==> Yes
Would you like to use ESLint? No / Yes ==> Yes
Would you like to use Tailwind CSS? No / Yes ==> Yes
Would you like to use `src/` directory? No / Yes ==> No
Would you like to use App Router? (recommended) No / Yes ==> No
Would you like to customize the default import alias (@/*)? No / Yes ==> Yes
What import alias would you like configured? @/* ==> @/*
```

## 💛 Cấu trúc NextJS - Pages Router

- Giải thích và so sánh với App Router
- Giải thích về luồng chạy Code
- Tổ chức theo conventions: https://nextjs.org/docs/getting-started/project-structure#pages-routing-conventions

Chi tiết: https://nextjs.org/docs/getting-started/project-structure


## 💛 Tạo các Trang - Pages Router

Trong Next.js theo **Pages Router** các pages sẽ có đuôi `.js`, `.jsx`, `.ts`, `.tsx` và được tổ chức trong thư mục `pages`

Ví dụ: Bạn muốn có các trang

- / là hiển thị nội trang chủ ==> tạo file `pages/index.tsx`
- /blog là hiện thị trang Blog ==> tạo file `pages/blog.tsx`

Và code của một trang như vậy trông như thế này:

```tsx
//pages/index.tsx
export default function Index() {
  return <div>Index</div>
}
//pages/blog.tsx
export default function Blog() {
  return <div>Blog</div>
}
```
**🔶 index routes**

Ngoài ra bạn có một khái niệm gọi là `index routes`, Nextjs sẽ tự động lấy file `index.tsx` làm điểm khởi chạy (root của thư mục)

Ví dụ Blog trên có thể được tổ chức lại như sau:

- /blog là hiện thị trang Blog ==> tạo file `pages/blog/index.tsx`


**🔶 Nested routes**

Làm một khái nhiệm biểu thị các routes lồng vào nhau. Ví dụ:

- Nếu bạn tạo `pages/customer/dashboard.tsx` ==> Nhận được URL: `/customer/dashboard`

- Nếu bạn tạo `pages/dashboard/settings/products/index.tsx` ==> Nhận được URL: `/dashboard/settings/products`


**🔶 Dynamic routes**

Với các trang động chúng ta có cách tổ chức route khác

- products/1 --> chi tiết sản phẩm 1
- products/2 --> chi tiết sản phẩm 2
- products/3 --> chi tiết sản phẩm 3

Thì cú pháp định nghĩa một đường dẫn động: `[segmentName]`. Ví dụ, `[id]` or `[slug]`.


=> `pages/products/[id]/index.tsx`

```tsx
import { useRouter } from 'next/router'
export default function ProductDetails() {
  const router = useRouter()
  return <p>ID Product: {router.query.id}</p>
```

**🔶 Kết Luận**

Quay lại với project của chúng ta. Cách tổ chức route sẽ như sau

```html

├─ pages/
│  ├─ index.tsx
│  ├─ products/
│       ├─ [id]
│       │   ├─index.tsx
│       ├─ index.tsx
```


## 💛 Layouts

Layout là một thành phần chứa các UI dùng chung giữa các trang, thông thường chưa `Header` và `Footer`

Bạn có thể tạo layout: `components/Layout.tsx`

```tsx
import Navbar from './Navbar'
import Footer from './Footer'
 
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

Sau đó bạn dùng như cách đã học bên React

```tsx
import Layout from '../components/Layout'

export default function Home() {
  return (
    <>
      <Layout>
        <h1>Home Page</h1>
      </Layout>
    </>
  )
}
```

Nếu bạn muốn `Layout` đó dùng chung cho `tất cả` các pages. Bạn đưa `Layout` đó vào file `pages/_app.tsx`

```tsx
import Layout from '../components/layout'
 
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
```

Layout phức tạp hơn, lồng vào nhau thì đọc thêm tài liệu: 
https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#per-page-layouts


## 💛 Chuyển hướng giữa các routes

Tương tự như bên React, Next.js cũng có 2 cách chuyển hướng

### Link

```tsx
import Link from 'next/link'
 
function Header() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/products">Produtcs</Link>
      </li>
    </ul>
  )
}
 
export default Header
```

### Navigating

Sử dụng một hook `useRouter` có sẵn

```tsx
import { useRouter } from 'next/router'
 
export default function ReadMore() {
  const router = useRouter()
 
  return (
    <button onClick={() => router.push('/about')}>
      Click here to read more
    </button>
  )
}
```