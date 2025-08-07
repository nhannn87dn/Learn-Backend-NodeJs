# ActionHasRoles - Component Phân Quyền

Component này giúp phân quyền CRUD và menu dựa trên roles của user từ store.

## Cách sử dụng

### 1. Import các component

```tsx
import ActionHasRoles, { CanCreate, CanRead, CanUpdate, CanDelete, CanAccessRoute } from './ActionHasRoles';
import { useHasRole } from '../hooks/useHasRole';
import ProtectedRoute from './ProtectedRoute';
```

### 2. Sử dụng component cơ bản

```tsx
// Kiểm tra role cụ thể
<ActionHasRoles requiredRoles={['admin']}>
  <button>Chỉ admin mới thấy</button>
</ActionHasRoles>

// Kiểm tra nhiều roles (chỉ cần 1 role)
<ActionHasRoles requiredRoles={['admin', 'user_manager']} mode="any">
  <button>Admin hoặc user_manager có thể thấy</button>
</ActionHasRoles>

// Kiểm tra tất cả roles
<ActionHasRoles requiredRoles={['admin', 'user_manager']} mode="all">
  <button>Phải có cả admin và user_manager</button>
</ActionHasRoles>
```

### 3. Sử dụng component CRUD helper

```tsx
// Create permission
<CanCreate resource="users">
  <button>Tạo user mới</button>
</CanCreate>

// Read permission
<CanRead resource="products">
  <div>Danh sách sản phẩm</div>
</CanRead>

// Update permission
<CanUpdate resource="orders">
  <button>Sửa đơn hàng</button>
</CanUpdate>

// Delete permission
<CanDelete resource="users">
  <button>Xóa user</button>
</CanDelete>
```

### 4. Sử dụng component kiểm tra quyền route

```tsx
// Kiểm tra quyền truy cập route
<CanAccessRoute route={routeItem}>
  <div>Nội dung route</div>
</CanAccessRoute>

// Bảo vệ route với redirect
<ProtectedRoute route={routeItem}>
  <div>Nội dung được bảo vệ</div>
</ProtectedRoute>
```

### 5. Sử dụng hook programmatically

```tsx
const MyComponent = () => {
  const { hasRole, canAccessRoute, canAccessRouteByPath } = useHasRole();

  const handleCreateUser = () => {
    if (hasRole(['admin', 'user_manager'])) {
      // Logic tạo user
    }
  };

  const handleAccessRoute = () => {
    if (canAccessRoute(routeItem)) {
      // Logic truy cập route
    }
  };

  return (
    <div>
      {hasRole(['admin']) && (
        <button onClick={handleCreateUser}>Tạo User</button>
      )}
      
      {canAccessRoute(routeItem) && (
        <button onClick={handleAccessRoute}>Truy cập Route</button>
      )}
    </div>
  );
};
```

### 6. Fallback content

```tsx
<CanCreate resource="users" fallback={<div>Bạn không có quyền tạo user</div>}>
  <button>Tạo user mới</button>
</CanCreate>
```

## Phân Quyền Menu

### Logic phân quyền menu trong DashboardLayout

Menu items sẽ được hiển thị dựa trên:

1. **Admin role**: Hiển thị tất cả menu items
2. **User roles**: Chỉ hiển thị menu items có roles phù hợp
3. **Không có roles**: Hiển thị cho tất cả user đã đăng nhập

### Cấu hình route với roles

```tsx
// Route cho admin và user
{
  path: '/dashboard',
  label: 'Dashboard',
  key: 'dashboard',
  roles: ['admin', 'user'],
  isShowMenu: true,
  isPrivate: true,
}

// Route chỉ cho admin
{
  path: '/administrators',
  label: 'Administrators',
  key: 'administrators',
  roles: ['admin'],
  isShowMenu: true,
  isPrivate: true,
}

// Route cho tất cả user đã đăng nhập
{
  path: '/profile',
  label: 'Profile',
  key: 'profile',
  roles: [], // Không yêu cầu role cụ thể
  isShowMenu: true,
  isPrivate: true,
}
```

## Quyền mặc định theo Resource

### Users
- **Create**: admin, user_manager
- **Read**: admin, user_manager, user
- **Update**: admin, user_manager
- **Delete**: admin

### Products
- **Create**: admin, product_manager
- **Read**: admin, product_manager, user
- **Update**: admin, product_manager
- **Delete**: admin, product_manager

### Orders
- **Create**: admin, order_manager
- **Read**: admin, order_manager, user
- **Update**: admin, order_manager
- **Delete**: admin, order_manager

### Default (khác)
- **Create**: admin
- **Read**: admin, user
- **Update**: admin
- **Delete**: admin

## Props

### ActionHasRoles
- `children`: Nội dung hiển thị khi có quyền
- `requiredRoles`: Danh sách roles cần thiết
- `fallback`: Nội dung hiển thị khi không có quyền
- `mode`: Chế độ kiểm tra ('all' | 'any')

### CanCreate, CanRead, CanUpdate, CanDelete
- `children`: Nội dung hiển thị khi có quyền
- `resource`: Tên resource để kiểm tra quyền
- `fallback`: Nội dung hiển thị khi không có quyền
- `mode`: Chế độ kiểm tra ('all' | 'any')

### CanAccessRoute
- `children`: Nội dung hiển thị khi có quyền
- `route`: Thông tin route cần kiểm tra
- `fallback`: Nội dung hiển thị khi không có quyền

### ProtectedRoute
- `children`: Component con
- `route`: Thông tin route cần bảo vệ
- `fallback`: Component hiển thị khi không có quyền (mặc định redirect về login)

## Hook useHasRole

Hook này trả về các function để kiểm tra quyền programmatically:

- `hasRole(roles, mode)`: Kiểm tra có role cụ thể không
- `canAccessRoute(route)`: Kiểm tra quyền truy cập route
- `canAccessRouteByPath(path, allRoutes)`: Kiểm tra quyền truy cập route theo path
- `isAuthenticated`: Trạng thái đăng nhập
- `user`: Thông tin user hiện tại

## Demo Components

### MenuPermissionDemo
Component demo để test phân quyền menu, hiển thị:
- Thông tin user hiện tại
- Danh sách menu items và quyền truy cập
- Tổng kết số lượng menu có quyền/không có quyền

### Cách sử dụng demo
```tsx
import MenuPermissionDemo from './MenuPermissionDemo';

// Trong component
<MenuPermissionDemo />
``` 