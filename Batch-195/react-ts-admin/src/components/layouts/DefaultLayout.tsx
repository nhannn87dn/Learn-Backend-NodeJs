import React, { useEffect, useState } from 'react';

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router';
import UserInfo from '../blocks/UserInfo';
import { useAuthStore } from '../../stores/useAuthStore';
import { menuItems } from '../../commons/menuItems';

const { Header, Content, Footer, Sider } = Layout;


const DefaultLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  //protected privte route
  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');

    }
  }, [user, isAuthenticated, navigate]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={({ key }) => {
            console.log(key);
            // chuyển hướng trang dựa trên key được chọn
            navigate(`/${key.toLowerCase().replace('-', '/')}`);
          }}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <UserInfo />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} />
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