# FrontEnd and APIs

Chúng ta sẽ tạo 2 project FrontEnd độc lập

- react-ecommerce: dành cho khách hàng dùng
- react-admin: dành cho chủ cửa hàng dùng


## 💛 react-admin

### 🔸 Cấu trúc dự án


```html
react-ecommerce/
├─ node_modules/
├─ public/
├─ src/
│  ├─ components/
│  ├─ constants/
│  ├─ hooks/
│  ├─ library/
│  ├─ pages/
│       ├─ LoginPage
│       ├─ DashboardPage
│       ├─ CategoryPage
│       ├─ ProductPage
│       ├─ OrdersPage
│       ├─ SupplierPage
│       ├─ CustomerPage
│       ├─ EmployeePage
│       ├─ NoPage
│  ├─ App.tsx
│  ├─ App.css
│  ├─ index.css
│  ├─ main.tsx
├─ .env
├─ index.html
├─ .gitignore
├─ package.json
├─ README.md
├─ tsconfig.json
├─ vite.config.ts
```

### 🔸 Công nghệ sử dụng

- React Vite
- Ant Design
- React Query
- Zustand

### 🔸 Yêu cầu các trang

**📄 LoginPage**

- Form login
- Login thành công, chuyển sang trang khách hàng DashboardPage


**📄 DashboardPage** 

- Layout: cột trái là danh sách menu
- Bên phải là thông tin: Hiển thị một số thống kê nhỏ 


**📄 CategoryPage** 

- Quản lý danh mục sản phẩm: thêm mới, sửa, xóa

**📄 ProductPage** 

- Quản lý sản phẩm: thêm mới, sửa, xóa


**📄 CustomerPage**

- Quản lý khách hàng: thêm mới, sửa, xóa


**📄 SupplierPage**

- Quản lý nhà cung cấp: thêm mới, sửa, xóa


**📄 EmployeePage**

- Quản lý nhân viên: thêm mới, sửa, xóa


**📄 OrderPage**

- Quản lý đơn hàng: thêm mới, sửa, xóa
- Cho phép cập nhật thay đổi trạng thái đơn
- Cho phép bổ sung hoặc bỏ sản phẩm trong đơn
