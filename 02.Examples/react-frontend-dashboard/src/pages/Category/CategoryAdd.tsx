import React from 'react';
import { Button, Form, Input, Space, Card, message } from 'antd';
import { useNavigate } from "react-router-dom";
import { 
  useMutation,  
  useQueryClient,
} from '@tanstack/react-query'




const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface ICategory {
  name: string;
  image: string;
}


const CategoryAdd = () => {
  
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const msgSuccess = () => {
      messageApi.open({
        type: 'success',
        content: 'Thêm mới danh mục thành công',
      });
    };
  
    const msgError = () => {
      messageApi.open({
        type: 'error',
        content: 'This is an error message',
      });
    };

    const queryClient = useQueryClient();

    //hàm call API update sản phẩm
    const fetchData = (payload: ICategory) =>
      fetch('https://api.escuelajs.co/api/v1/categories/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).then((response) => response.json());

    // Mutations
    const addMutation = useMutation({
      mutationFn: fetchData,
      onSuccess: () => {
        console.log('Thêm mới thành công !');
        msgSuccess();
        // Sau khi thêm mới thành công thì update lại danh sách sản phẩm dựa vào queryKey
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        //reset form
        form.resetFields();
      },
      onError: (err)=> {
        console.log('Thêm mới có lỗi !', err);
        msgError()
      }
    })


  const onFinish = (values: ICategory) => {
    console.log(values);

    addMutation.mutate(values);

  };

  const onReset = () => {
    form.resetFields();
  };

  return (

      <Card title="Add new a category" extra={<Button type='primary' onClick={()=> {
            navigate('/category');
           }}>Danh sách</Button>} >
            {contextHolder}
        <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 500 }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input placeholder='Ex: Mobile' />
        </Form.Item>
        <Form.Item name="image" extra="Ex: https://loremflickr.com/200/200/fashion?lock=1234" label="Image Link" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      
        <Form.Item {...tailLayout}>
          <Space>

          <Button type="primary" htmlType="submit" loading={addMutation.isLoading}>
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          </Space>
        
        </Form.Item>
      </Form>
    </Card>
   
  );
};

export default CategoryAdd;