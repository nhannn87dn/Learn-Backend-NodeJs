import type { ReactNode } from 'react';
import { routesDashboard } from '../modules/dashboard/dashboard.route';
import { routesAuth } from '../modules/auth/auth.route';
import { routesAdministrator } from '../modules/administrator/administrator.route';
import { routesProducts } from '../modules/products/product.route';

export type RouteItem = {
  path?: string;
  label: string;
  layout?: () => React.JSX.Element | React.ReactNode;
  key: string;
  icon?: ReactNode;
  element?: React.ReactNode | null;
  children?: RouteItem[];
  isShowMenu: boolean; // Thêm thuộc tính này để xác định có hiển thị menu hay không
  isPrivate: boolean; // Thêm thuộc tính này để xác định có phải là route riêng tư hay không
  roles?: string[];
  permissions?: string[];
};

export const generatePath = (key: string) => {
  return key.split('-').join('/');
}

export const routes: RouteItem[] = [
  ...routesDashboard, //đăng ký route dashboard
  ...routesAuth,
  ...routesProducts,
  ...routesAdministrator,
  
];
