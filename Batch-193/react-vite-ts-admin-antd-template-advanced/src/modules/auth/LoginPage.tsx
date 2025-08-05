
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate } from 'react-router';

type FieldType = {
  email: string;
  password: string;
  remember: string;
};



const LoginPage = () => {
  const {login} = useAuthStore();
  const navigate = useNavigate()
  const onFinish: FormProps<FieldType>['onFinish'] = async(values) => {
  console.log('Success:', values);
  //gọi api login ở đây
   login(values.email, values.password, ()=>{
    //
    navigate('/dashboard')
   })
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

  return (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ email: 'admin@gmail.com', password: 'CatFly@200miles', remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Email"
      name="email"
      help='admin@gmail.com'
      rules={[{ required: true, message: 'Please input your Email!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      help='CatFly@200miles'
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
}

export default LoginPage;