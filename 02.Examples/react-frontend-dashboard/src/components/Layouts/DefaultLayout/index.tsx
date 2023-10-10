import React, { useState } from 'react';
import {
  HomeOutlined,
  SettingOutlined,
  DatabaseOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';

import { Outlet } from 'react-router-dom'
import useAuth from "../../../hooks/useAuth"
import { useNavigate } from "react-router-dom";
import UserInfo from '../../UserInfo';

const { Header, Sider, Content, Footer } = Layout;


const items = [
  { label: 'Trang chủ', key: '', icon: <HomeOutlined /> }, // remember to pass the key prop
  { label: 'Cấu hình', key: 'settings', icon: <SettingOutlined />,
  children: [
    { label: 'Hệ thống', key: 'management-employees'},
    { label: 'Thanh toán', key: 'management-products' },
  ],
}, // which is required
  {
    label: 'Quản lý Danh mục SP',
    key: 'category',
    icon: <DatabaseOutlined />
   
  },
  {
    label: 'Quản lý sản phẩm',
    key: 'product',
    icon: <DatabaseOutlined />
   
  },
  {
    label: 'Quản lý khách hàng',
    key: 'customers',
    icon: <DatabaseOutlined />
   
  },
  {
    label: 'Quản lý Đơn hàng',
    icon: <DatabaseOutlined />,
    key: 'sales',
    children: [
      {
        label: 'Đơn hàng',
        key: 'sales-orders',
      },
      {
        label: 'Thông kê theo trạng thái',
        key: 'sales-orders-status',
      },
      {
        label: 'Thông kê theo thanh toán',
        key: 'sales-orders-payment-status ',
      },
    ],
  },
];

const DefaultLayout: React.FC = () => {

  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();
  

  React.useEffect(()=>{
    if(!isAuthenticated){
      navigate('/login')
    }
  },[isAuthenticated,navigate]);


  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} 
      
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
      >
        <div className="sidebar_logo overflow-hidden px-1">{collapsed ? 'A' : 'Admin'}</div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={({ key }) => {
          navigate('/' + key.split('-').join('/'));
          console.log(key);
        }} />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? '80px' : '200px' }}>
        <Header style={{ 
          padding: 0, 
          background: colorBgContainer,
           position: 'sticky',
          top: 0,
          zIndex: 1
           }}

           className='drop-shadow-sm'
           >
          <div className="flex justify-between">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <div className="header_right pe-[24px]">
                <UserInfo />
            </div>
          </div>
              
           
         
          
        </Header>
        <Content
          style={{
            margin: '16px',
            padding: 16,
            minHeight: 280,
            background: colorBgContainer,
            overflow: 'initial'
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;DefaultLayout