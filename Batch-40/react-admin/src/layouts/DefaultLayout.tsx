import React, { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Breadcrumb, Flex, Layout, Menu, theme, Dropdown } from 'antd';
import { Outlet, useNavigate } from 'react-router';
import '@ant-design/v5-patch-for-react-19';
import { useAuthStore } from '../stores/useAuthStore';
import UserInfo from '../components/UserInfo';
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dashboard', '', <PieChartOutlined />),
  getItem('Categories', 'categories', <DesktopOutlined />),
  getItem('Brands', 'brands', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Products', 'products', <DesktopOutlined />),
  getItem('Customers', 'customers', <TeamOutlined />, [
    getItem('Team 1', '6'), 
    getItem('Team 2', '8')]
  ),
  getItem('Staffs', 'staffs', <FileOutlined />),
  getItem('Orders', 'orders', <FileOutlined />),
];

const DefaultLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const {user, tokens} = useAuthStore();
  const navigate = useNavigate();
  //kiểm trang tra trạng thái login
  useEffect(()=>{
    if(!user && !tokens){
      navigate('/login')
    }
  },[navigate, user, tokens])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu 
        theme="dark" 
        defaultSelectedKeys={['1']} 
        mode="inline" 
        items={items} 
        onClick={({key})=>{
          console.log('<<=== 🚀 key ===>>',key);
          navigate(`/${key}`)
        }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} >
          <Flex style={{padding: '0 20px'}} gap={10} align='center' className='py-5' justify='end'>
            <UserInfo />
            </Flex>
          </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
           <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;