import React, { useEffect, useState } from 'react';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import { routes, type RouteItem } from '../routes';
import { Layout, Menu, Button, theme, message } from 'antd';

import { useNavigate, Outlet } from "react-router";

const { Header, Sider, Content, Footer } = Layout;





import type { MenuProps } from 'antd';
import { useAppMessage } from '../stores/useAppMessage';
import { useAuthStore } from '../stores/useAuthStore';
type MenuItem = Required<MenuProps>['items'][number];

// Chuyển đổi mảng routes sang định dạng items của Antd Menu với phân quyền
function mapRoutesToMenuItems(routes: RouteItem[], userRoles: string[]): MenuItem[] {
  return routes
    .filter(route => {
      // Kiểm tra có hiển thị menu không
      if (!route.isShowMenu) return false;
      
      // Nếu không có roles yêu cầu, hiển thị cho tất cả
      if (!route.roles || route.roles.length === 0) return true;
      
      // Nếu user có role admin, hiển thị tất cả
      if (userRoles.includes('admin')) return true;
      
      // Kiểm tra user có role phù hợp không
      return route.roles.some(role => userRoles.includes(role));
    })
    .map(route => {
      const item: MenuItem = {
        label: route.label,
        key: route.key,
        icon: route.icon ?? null,
        children: route.children ? mapRoutesToMenuItems(route.children, userRoles) : undefined,
      };
      return item;
    });
}



const DefaultLayout: React.FC = () => {
   const navigate = useNavigate();
  const {user,isAuthenticated,logout}= useAuthStore();

  useEffect(()=>{
    if(!isAuthenticated){
      navigate('/login')
    }
  },[isAuthenticated,navigate])

  const [messageApi, contextHolder] = message.useMessage();
  const {msg, type, clearMessage} = useAppMessage();

  useEffect(()=>{
    if (msg) {
      messageApi.info({
        content: msg,
        type: type,
        duration: 3,
        onClose: ()=> clearMessage(),
      });
    }
  }, [msg,type, messageApi, clearMessage]);
  
  // Lấy roles của user hiện tại
  const userRoles = user?.roles || [];
  const items = mapRoutesToMenuItems(routes, userRoles);


  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      {contextHolder}
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
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          onClick={({ key }) => {
            navigate('/' + key.split('-').join('/'));
            console.log(key);
          }}
        />
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
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
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
            
              <div className="user-info" style={{display: 'flex', alignItems: 'center', gap: '10px',marginRight: '16px'}}>
                      <strong> {
                      user?.fullName
                    } </strong>
                    <Button type='primary' size='small' onClick={logout}>Logout</Button>
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
    </>
  );
};

export default DefaultLayout;