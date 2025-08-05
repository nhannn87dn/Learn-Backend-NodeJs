import {  DatabaseOutlined } from "@ant-design/icons";
import type { RouteItem } from "../../routes";
import ProductPage from "./ProductPage";



export const routesProduct: RouteItem[] = [
  {
    path: '/product_example',
    label: 'Product Example',
    key: 'product_example',
    icon: <DatabaseOutlined />,
    element: <ProductPage />,
    isShowMenu: true,
    isPrivate: true,
    roles: ['admin', 'user'],
    permissions: ['product.view'],
  },
]