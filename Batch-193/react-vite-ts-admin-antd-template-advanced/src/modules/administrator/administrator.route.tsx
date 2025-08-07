import { GroupOutlined, UserOutlined } from "@ant-design/icons";
import type { RouteItem } from "../../routes";

export const routesAdministrator: RouteItem[] = [
  {
    path: '/administrators',
    label: 'Administrators',
    key: 'administrators',
    icon: <UserOutlined />,
    isShowMenu: true,
    isPrivate: true,
    roles: ['admin', 'user'],
    permissions: ['roles.view', 'users.view'],
    children: [
      {
        path: '/administrators/users',
        label: 'Users',
        icon: <UserOutlined />,
        key: 'administrators-users',
        element: null,
        isShowMenu: true,
        isPrivate: true,
        roles: ['admin', 'user'],
        permissions: ['users.view'],
      },
      {
        path: '/administrators/roles',
        label: 'Roles',
        icon: <GroupOutlined />,
        key: 'administrators-roles',
        element: null,
        isShowMenu: true,
        isPrivate: true,
        roles: ['dev', 'user'],
        permissions: ['roles.view'],
      },
    ],
  },
]