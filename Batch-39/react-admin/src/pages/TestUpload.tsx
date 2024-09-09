import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const TestUpload: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (formData: FormData) => {
    setUploading(true);
        try {
        const response = await fetch('http://localhost:8080/api/v1/upload/single-handle', {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            message.success('Tạo sản phẩm thành công.');
        } else {
        message.error('Đã có lỗi xảy ra.');
      }
    } catch (error) {
      message.error('Tạo sản phẩm thất bại.');
    } finally {
      setUploading(false);
    }
  };

  const onFinish = (values: any) => {
    if (fileList.length === 0) {
      message.error('Vui lòng chọn file trước khi tải lên.');
      return;
    }

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('price', values.price);
    fileList.forEach((file) => {
      formData.append('file', file as FileType);
    });

    // Gọi hàm handleUpload để gửi form lên server
    handleUpload(formData);
  };

  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([file]);  // Chỉ chọn một file, nếu cần nhiều file thì sử dụng `setFileList([...fileList, file])`
      return false;  // Tắt upload tự động
    },
    fileList,
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        label="Tên sản phẩm"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
      >
        <Input placeholder="Nhập tên sản phẩm" />
      </Form.Item>

      <Form.Item
        label="Giá"
        name="price"
        rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
      >
        <InputNumber
          min={0}
          style={{ width: '100%' }}
          placeholder="Nhập giá sản phẩm"
        />
      </Form.Item>

      <Form.Item label="Ảnh sản phẩm">
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Chọn file</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Đang tải lên' : 'Tạo sản phẩm'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TestUpload;
