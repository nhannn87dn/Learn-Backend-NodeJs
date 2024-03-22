import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, type FormProps, Input } from "antd";
import useAuth from "../hooks/useAuth";

type FieldType = {
  email: string;
  password: string;
  remember?: string;
};

const LoginPage = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    const response = await login(values.email, values.password);
    console.log(response);
    if (response.isAuthenticated) {
      navigate("/");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{
        maxWidth: 500,
        margin: "0 auto",
      }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          disabled={isLoading}
          loading={isLoading}
          type="primary"
          htmlType="submit"
        >
          {isLoading ? "Submitting" : "Login"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
