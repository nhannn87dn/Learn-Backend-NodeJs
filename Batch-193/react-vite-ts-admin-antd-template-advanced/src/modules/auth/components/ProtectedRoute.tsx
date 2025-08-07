import React from 'react';
import { useAuthStore } from '../../../stores/useAuthStore';
import type { RouteItem } from '../../../routes';
import { AccessDenyPage } from '../AccessDenyPage';
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
  children: React.ReactNode;
  route: RouteItem;
  fallback?: React.ReactNode;
}

/**
 * Component bảo vệ route dựa trên roles
 * @param children - Component con
 * @param route - Thông tin route cần bảo vệ
 * @param fallback - Component hiển thị khi không có quyền
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  route,
  fallback = <AccessDenyPage />
}) => {
  const { user, isAuthenticated } = useAuthStore();

  // Kiểm tra quyền truy cập route
  const hasAccess = () => {
    // Nếu route không yêu cầu đăng nhập
    if (!route.isPrivate) return true;
    
    // Nếu chưa đăng nhập, chuyển hướng về login
    if (!isAuthenticated || !user) {
      return <Navigate to="/login" replace />;
    }
    
    // Nếu không có roles yêu cầu, cho phép tất cả user đã đăng nhập
    if (!route.roles || route.roles.length === 0) return true;
    
    // Nếu user có role admin, cho phép tất cả
    if (user.roles.includes('admin')) return true;
    
    // Kiểm tra user có role phù hợp không
    return route.roles.some(role => user.roles.includes(role));
  };

  if (!hasAccess()) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 