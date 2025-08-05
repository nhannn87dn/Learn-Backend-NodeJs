import { Modal, Form, Input, InputNumber, Select } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { CategoryType, ProductType } from '../product.type';
import React from 'react';

type ProductEditProps = {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  form: FormInstance;
  onFinish: (values: ProductType) => void;
  onFinishFailed: (errors: unknown) => void;
  queryCategory: { data?: CategoryType[] };
};

const ProductEdit: React.FC<ProductEditProps> = ({
  visible,
  onOk,
  onCancel,
  form,
  onFinish,
  onFinishFailed,
  queryCategory,
}) => {
  return (
    <Modal
      title="Edit Product"
      width="80%"
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form
        form={form}
        name="update-form"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Chưa nhập title' }]} hasFeedback>
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Chưa nhập price' }]}
          hasFeedback
        >
          <InputNumber addonAfter="$" min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item hasFeedback label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          hasFeedback
          label="Category"
          name="categoryId"
          rules={[{ required: true, type: 'number', message: 'Chưa nhập Category' }]}
        >
          <Select
            options={
              queryCategory.data &&
              queryCategory.data.map((c) => ({ value: c.id, label: c.name }))
            }
          />
        </Form.Item>
        <Form.Item hidden label="Id" name="id" hasFeedback>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductEdit;
