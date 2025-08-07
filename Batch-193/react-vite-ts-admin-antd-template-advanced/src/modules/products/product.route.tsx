import {  DatabaseOutlined } from "@ant-design/icons";
import type { RouteItem } from "../../routes";
import ProductsPage from "./ProductsPage";



export const routesProducts: RouteItem[] = [
  {
    path: '/products',
    label: 'ProductS',
    key: 'products',
    icon: <DatabaseOutlined />,
    element: <ProductsPage />,
    isShowMenu: true,
    isPrivate: true,
    roles: ['admin', 'user', 'staff'],
    permissions: ['product.view'],
  },
]