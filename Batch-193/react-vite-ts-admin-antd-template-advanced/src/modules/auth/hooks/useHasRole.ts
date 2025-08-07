import { useAuthStore } from '../../../stores/useAuthStore';
import type { RouteItem } from '../../../routes';

/**
 * Hook để kiểm tra quyền programmatically
 */
export const useHasRole = () => {
  const { user, isAuthenticated } = useAuthStore();

  const hasRole = (requiredRoles: string[], mode: 'all' | 'any' = 'any') => {
    if (!isAuthenticated || !user) {
      return false;
    }

    if (mode === 'all') {
      return requiredRoles.every(role => user.roles.includes(role));
    } else {
      return requiredRoles.some(role => user.roles.includes(role));
    }
  };

  // Kiểm tra quyền truy cập route
  const canAccessRoute = (route: RouteItem) => {
    // Nếu route không yêu cầu đăng nhập
    if (!route.isPrivate) return true;
    
    // Nếu không có roles yêu cầu, cho phép tất cả user đã đăng nhập
    if (!route.roles || route.roles.length === 0) return true;
    
    // Nếu user có role admin, cho phép tất cả
    if (user?.roles.includes('admin')) return true;
    
    // Kiểm tra user có role phù hợp không
    return route.roles.some(role => user?.roles.includes(role));
  };

  // Kiểm tra quyền truy cập route theo path
  const canAccessRouteByPath = (path: string, allRoutes: RouteItem[]) => {
    const findRoute = (routes: RouteItem[], targetPath: string): RouteItem | null => {
      for (const route of routes) {
        if (route.path === targetPath) {
          return route;
        }
        if (route.children) {
          const found = findRoute(route.children, targetPath);
          if (found) return found;
        }
      }
      return null;
    };

    const route = findRoute(allRoutes, path);
    if (!route) return false;
    
    return canAccessRoute(route);
  };

  return {
    hasRole,
    canAccessRoute,
    canAccessRouteByPath,
    isAuthenticated,
    user
  };
}; 