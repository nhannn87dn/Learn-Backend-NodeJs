import {  UserOutlined } from "@ant-design/icons";
import type { RouteItem } from "../../routes";
import LoginPage from "./LoginPage";
import EmptyLayout from "../../layouts/EmptyLayout";


export const routesAuth: RouteItem[] = [
  {
    path: '/login',
    label: 'Login',
    key: 'login',
    layout: () => <EmptyLayout />,
    isShowMenu: false,
    icon: <UserOutlined />,
    element: <LoginPage />,
    isPrivate: false, // Không yêu cầu đăng nhập để truy cập trang đăng nhập
  },
]