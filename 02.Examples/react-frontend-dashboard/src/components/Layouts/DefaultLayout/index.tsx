import React, { useState } from 'react';
import {
  HomeOutlined,
  SettingOutlined,
  DatabaseOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  BarsOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';

import { Outlet } from 'react-router-dom'
import useAuth from "../../../hooks/useAuth"
import { useNavigate } from "react-router-dom";
import UserInfo from '../../UserInfo';

const { Header, Sider, Content, Footer } = Layout;


const items = [
  { label: 'Dashboard', key: '', icon: <HomeOutlined /> }, // remember to pass the key prop
  {
    label: 'Categories Management',
    key: 'category',
    icon: <BarsOutlined />
   
  },
  {
    label: 'Products Management',
    key: 'product',
    icon: <DatabaseOutlined />
   
  },
  {
    label: 'Customer Management',
    key: 'customers',
    icon: <UserOutlined />
   
  },
  {
    label: 'Orders Management',
    icon: <FileTextOutlined />,
    key: 'sales',
    children: [
      {
        label: 'Đơn hàng',
        key: 'sales-orders',
      },
      {
        label: 'Thống kê theo trạng thái',
        key: 'sales-orders-status',
      },
      {
        label: 'Thống kê theo thanh toán',
        key: 'sales-orders-payment-status ',
      },
    ],
  },
  {
    label: 'Employees Management',
    key: 'employees',
    icon: <UserOutlined />
   
  },
  { label: 'Settings', key: 'settings', icon: <SettingOutlined />,
    children: [
      { label: 'Hệ thống', key: 'management-system'},
      { label: 'Thanh toán', key: 'management-payments' },
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
    <>
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
        <div className="sidebar_logo">{collapsed ? 'A' : 'Admin'}</div>
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
           <UserInfo />
        
              
           
         
          
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
    </>
  );
};

export default DefaultLayout;DefaultLayout