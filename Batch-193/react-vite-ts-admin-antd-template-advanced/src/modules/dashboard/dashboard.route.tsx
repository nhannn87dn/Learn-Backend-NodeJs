import { HomeOutlined } from "@ant-design/icons";
import type { RouteItem } from "../../routes";
import DashboardPage from "./DashboardPage";

export const routesDashboard: RouteItem[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    key: 'dashboard',
    icon: <HomeOutlined />,
    element: <DashboardPage />,
    isShowMenu: true, // Hiển thị menu cho route này
    isPrivate: true, // Chỉ cho phép người dùng đã đăng nhập truy cập
    roles: ['admin', 'user'],
    permissions: ['dashboard.view'],
  },
]