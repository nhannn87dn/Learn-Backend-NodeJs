import React, { useEffect, useState } from "react";
import {
  HomeOutlined,
  SettingOutlined,
  DatabaseOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  BarsOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const { Header, Sider, Content, Footer } = Layout;

const items = [
  { 
    label: "Dashboard", 
    key: "", 
    icon: <HomeOutlined /> 
  }, 
  
];

const LayoutAdmin = () => {
  const navigate = useNavigate();



  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout hasSider style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="sidebar_logo">{collapsed ? "A" : "Admin"}</div>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            onClick={({ key }) => {
              navigate("/" + key.split("-").join("/"));
              console.log(key);
            }}
          />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? "80px" : "200px" }}>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
            className="drop-shadow-sm"
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            {/* User Info */}
          </Header>
          <Content
            style={{
              margin: "16px",
              padding: 16,
              minHeight: 280,
              background: colorBgContainer,
              overflow: "initial",
            }}
          >
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutAdmin;
