import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore((state) => state);


  const onFinish = async(values: any) => {
    console.log("Received values of form: ", values);
    //GỌI API để login
    login(values.username, values.password, ()=>{
      console.log('Đăng nhập thành công, chuyển trang dashboard');
      navigate('/dashboard');
    });
  };
  return (
    <main style={{ backgroundColor: "#f0f2f5", height: "100vh" }}>
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <div className="login-form" style={{ padding: 24, background: "#fff", borderRadius: 8 }}>
          <Form
            name="login"
            initialValues={{ 
              remember: true, 
              username: 'admin@example.com',
              password: 'Admin@123'
             }}
            style={{ maxWidth: 360 }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="">Forgot password</a>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button disabled={isLoading} block type="primary" htmlType="submit">
                {isLoading ? 'Signing in...' : 'Log in'}
              </Button>
             
            </Form.Item>
          </Form>
        </div>
      </Flex>
    </main>
  );
};

export default LoginPage;
