## Bước 1 - Cấu hình environment

Tạo file .env trong thư mục gốc dự án. Sau đó copy nội dung từ .env.example vào file .env và thay đổi các giá trị theo nhu cầu của bạn.

Thêm vào 1 biến môi trường mới trong file .env:

```
VITE_API_URL=http://localhost:9000/api
```

Tạo file src/config/env.ts và thêm đoạn code sau:

```ts
export const ENV = {
    API_URL: import.meta.env.VITE_API_URL
}
```

## Bước 2 - Tạo một trang mới (Route mới)

### 2.1 - Tạo một component mới

Tạo một folder mới trong thư mục `src/app` với tên folder là tên route mà bạn muốn tạo. Ví dụ, nếu bạn muốn tạo route `/categories`, thì tạo folder `src/app/categories`.

### 2.2 - Tạo một file `page.tsx` trong folder vừa tạo và thêm đoạn code sau:

```tsx
import { BaseLayout } from "@/components/layouts/base-layout";
export default function CategoriesPage() {
    return (
        <BaseLayout 
        title="Categories" 
        description="Manage your categories and their properties"
        >
            <h1>Categories Page</h1>
        </BaseLayout>
    )
}
```
### 2.3 - Đăng ký route mới trong file `src/config/routes.tsx`:

```tsx
import CategoriesPage from '@/app/categories/page'

export const routes: RouteConfig[] = [
    // ... các route khác

    //Thêm route mới
    {
        path: "/categories",
        element: <CategoriesPage />
    },
];
```

### 2.4 - Đăng ký hiển thị lên sidebar

Mở file `src/components/app-sidebar.tsx`, thêm route mới vào danh sách các route hiển thị trên sidebar:

```tsx
//thêm module khác từ đây
 navGroups: [
    //... các navGroups khác
        {
          title: "Categories",
          url: "/categories",
          icon: Users,
        }
 ]
```