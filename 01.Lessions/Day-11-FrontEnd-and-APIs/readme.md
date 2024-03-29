# FrontEnd and APIs

## 💛 react-ecommerce

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
│       ├─ HomePage
│       ├─ ProductPage
│       ├─ ProductDetailPage
│       ├─ CartPage
│       ├─ CheckOutPage
│       ├─ CheckOutDonePage
│       ├─ LoginPage
│       ├─ RegisterPage
│       ├─ CustomerPage
│       ├─ CustomerOrderPage
│       ├─ CustomerProfilePage
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
- Tailwind, [shadcn/ui](https://ui.shadcn.com/), [DaisyUI](https://daisyui.com/) hoặc tự code Css
- React Query, Axios
- Zustand


Xem thêm: https://shuffle.dev/components/tailwind


### 🔸 **Yêu cầu các trang**

**📄 HomePage** 

- Danh sách danh mục sản phẩm

- Hiển thị danh sách sản phẩm của 2 danh mục, mỗi danh mục 10 sản phẩm. Sử dụng swiperjs để slide


**📄 CategoryPage** 

- Cột bên trái: hiển thị bộ lọc sản phẩm, lọc theo phân khúc giá, sắp xếp giá tăng dần, giảm dần...
- Cột bên phải: Hiển thị danh sách sản phẩm của danh mục khi click vào link ở HomePage, và chỉ lấy số lượng phân trang 10sp / 1 trang
- Hiển thị phân trang bên dưới danh sách sản phẩm


**📄 ProductPage** 

- Hiển thị chi tiết sản phẩm
- Có nút Thêm vào giỏ hàng


**📄 CartPage** 

- Hiển thị danh sách sản phẩm đã chọn thêm vào giỏ hàng
- Có thể thay đổi số lượng, tổng tiền được tính lại
- Button Checkout, để chuyển trang Checkout


**📄 CheckoutPage** 

- Tùy vào luồng xử lý: yêu cầu đăng nhập, hay cho phép mua hàng không cần đăng nhập
- Page này hiển thị thông tin sả phẩm đã mua
- Hiển thị form điền thông tin vận chuyển đơn
- Hiển thị thông tin phương thức thanh toán
- Button Đặt Hàng

**📄 CheckOutDonePage** 

- Thông báo trạng thái khi đặt hàng thành công

**📄 LoginPage**

- Form login
- Login thành công, chuyển sang trang khách hàng CustomerPage


**📄 CustomerPage**

- Cột bên trái là Danh sách Menu
- Cột bên phải thông tin chung
- Yêu cầu phải đăng nhập mới vào được trang này

**📄 CustomerOrderPage**

- Hiển thị danh sách đơn hàng
- Yêu cầu phải đăng nhập mới vào được trang này

**📄 CustomerProfilePage**

- Hiển thị thông tin khách hàng
- Cho phép thay đổi thông tin
- Yêu cầu phải đăng nhập mới vào được trang này


## 💛 Xây dựng HomePage

Hiển thị sản phẩm theo từng danh mục ra trang chủ

## 💛 Xây dựng CategoryPage

Hiển thị sản phẩm của danh mục đang xem

## 💛 Xây dựng ProductPage

Hiển thị thông tin chi tiết sản phẩm