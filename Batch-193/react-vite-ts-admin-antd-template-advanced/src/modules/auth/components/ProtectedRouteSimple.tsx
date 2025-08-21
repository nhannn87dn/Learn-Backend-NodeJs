import React from 'react';
import { useAuthStore } from '../../../stores/useAuthStore';
import { AccessDenyPage } from '../AccessDenyPage';
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles: string[];
  fallback?: React.ReactNode;
}

/**
 * Component bảo vệ route dựa trên roles
 * @param children - Component con
 * @param route - Thông tin route cần bảo vệ
 * @param fallback - Component hiển thị khi không có quyền
 */
const ProtectedRouteSimple: React.FC<ProtectedRouteProps> = ({
  children,
  roles = ['admin'],
  fallback = <AccessDenyPage />
}) => {
  const { user, isAuthenticated } = useAuthStore();

  // Kiểm tra quyền truy cập route
  const hasAccess = () => {
   
    // Nếu chưa đăng nhập, chuyển hướng về login
    if (!isAuthenticated || !user) {
      return <Navigate to="/login" replace />;
    }
    
    // Nếu không có roles yêu cầu, cho phép tất cả user đã đăng nhập
    if (!roles || roles.length === 0) return true;
    
    // Nếu user có role admin, cho phép tất cả
    if (user.roles.includes('admin')) return true;
    
    // Kiểm tra user có role phù hợp không
    return roles.some(role => user.roles.includes(role));
  };

  if (!hasAccess()) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default ProtectedRouteSimple; 