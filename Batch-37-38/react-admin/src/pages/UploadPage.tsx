import  { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../library/axiosClient";
import { RcFile } from 'antd/lib/upload';
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
// import axios from 'axios';
// import globalConfig from "../constants/config"

interface FormData {
  username: string;
  email: string;
}

interface PayloadData  extends FormData{
  file: RcFile | null;
}

const UploadPage = () => {
  const [createForm] = Form.useForm();
  const [file, setFile] = useState<RcFile | null>(null);
  const queryClient = useQueryClient();

//   const fetchCreate  = async (formData) => {
//     const response = await axios.post(globalConfig.urlAPI + '/v1/upload/single', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   }

  const fetchCreate = async (formData: PayloadData) => {
    return axiosClient.post(`/v1/upload/single`, formData,{
        headers: {
            //Lưu ý: đổi kiểu content type khi có upload và không upload
            'Content-Type': formData.file ? 'multipart/form-data' : 'application/json',
        },
    });
  };

  // Mutation để gửi dữ liệu lên API
  const {mutate, isLoading} = useMutation(
    {
    mutationFn: fetchCreate,
    onSuccess: (data: any) => {
        // Xử lý khi thành công
        message.success('Form submitted successfully!',data);
        // Invalidate hoặc refetch các query liên quan nếu cần
        queryClient.invalidateQueries({
            queryKey: ["products"],
        });
      },
      onError: (error: any) => {
        // Xử lý khi thất bại
        message.error('Failed to submit form!',error);
    }
    }
    
  );

  // Xử lý upload file
  const handleUpload = (options: RcCustomRequestOptions<any>) => {
    const { file } = options;
    setFile(file as RcFile);
  };

  // Xử lý submit form
  const onFinishCreate = (values: FormData) => {
    
    const formData: PayloadData = {
      ...values,
      file: file
    };
    console.log('<<=== 🚀 onFinishCreate ===>>',formData);
    // Gọi mutation để gửi dữ liệu
    mutate(formData);
  };

  return (
    <Form form={createForm} layout="vertical" onFinish={onFinishCreate}>
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Upload File">
        <Upload customRequest={handleUpload} showUploadList={true}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UploadPage;