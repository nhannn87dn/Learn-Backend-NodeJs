import React from 'react';
import { useAuthStore } from '../../../stores/useAuthStore';

interface ActionHasRolesProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  fallback?: React.ReactNode;
  mode?: 'all' | 'any'; // 'all': tất cả roles phải có, 'any': chỉ cần 1 role
}

/**
 * Component phân quyền dựa trên roles của user
 * @param children - Nội dung hiển thị khi có quyền
 * @param requiredRoles - Danh sách roles cần thiết
 * @param fallback - Nội dung hiển thị khi không có quyền
 * @param mode - Chế độ kiểm tra: 'all' (tất cả roles) hoặc 'any' (chỉ cần 1 role)
 */
const ActionHasRoles: React.FC<ActionHasRolesProps> = ({
  children,
  requiredRoles = [],
  fallback = null,
  mode = 'any'
}) => {
  const { user, isAuthenticated } = useAuthStore();

  // Kiểm tra xem user có đăng nhập không
  if (!isAuthenticated || !user) {
    return <>{fallback}</>;
  }

  // Kiểm tra roles
  const hasRequiredRoles = () => {
    if (requiredRoles.length === 0) {
      return true; // Không yêu cầu roles cụ thể
    }

    // Nếu user có role admin, cho phép tất cả
    if (user.roles.includes('admin')) return true;

    if (mode === 'all') {
      // Tất cả roles phải có
      return requiredRoles.every(role => user.roles.includes(role));
    } else {
      // Chỉ cần 1 role
      return requiredRoles.some(role => user.roles.includes(role));
    }
  };


  // Kiểm tra quyền
  const hasAccess = hasRequiredRoles();

  return <>{hasAccess ? children : fallback}</>;
};


export default ActionHasRoles;
