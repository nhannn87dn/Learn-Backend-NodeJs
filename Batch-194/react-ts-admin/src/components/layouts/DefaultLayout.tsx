import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, message, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router';
import { menuItems } from '../../commons/menuItems';
import { useAuthStore } from '../../stores/useAuthStore';
import { useAppMessage } from '../../stores/useAppMessage';

const { Header, Sider, Content } = Layout;

const DefaultLayout: React.FC = () => {
  const navigate = useNavigate();

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

  //authentication store
  const { user, logout, isAuthenticated } = useAuthStore((state) => state);

  useEffect(() => {
    if (!user || isAuthenticated == false) {
      //nếu chưa đăng nhập thì chuyển về trang login
      navigate('/login');
    }
  }, [user, navigate, isAuthenticated]);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
       {contextHolder}
      <Sider trigger={null} collapsible collapsed={collapsed}>
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
          <div className="header-user-info" style={{ float: 'right', marginRight: 16 }}>
            <span>{user?.fullName}</span>
            <Button type="link" onClick={() => logout()}>Logout</Button>     
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
            {/* Nơi hiển thị nội dung của các trang con */}
            <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;