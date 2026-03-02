import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

export const menuItems = [
  {
    key: "dashboard",
    icon: <UserOutlined />,
    label: "Dashboard",
  },
  {
    key: "categories",
    icon: <VideoCameraOutlined />,
    label: "Categories",
  },
  {
    key: "products",
    icon: <UploadOutlined />,
    label: "Products",
  },
];
