import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router';

const { Header, Sider, Content } = Layout;

const DefaultLayout: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
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
          items={[
            {
              key: 'dashboard',
              icon: <UserOutlined />,
              label: 'Dashboard',
            },
            {
              key: 'categories',
              icon: <VideoCameraOutlined />,
              label: 'Categories',
            },
            {
              key: 'staffs',
              icon: <UploadOutlined />,
              label: 'Staffs',
            },
          ]}
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