import { Image, Table, Button, Popconfirm, Form, Input, message, Space, Modal, InputNumber, Select, Upload } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams  } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import type { FormInstance } from 'antd/es/form';

interface Product {
  id: number;
  title: string;
  price: number;
  category: {
    id: number
  }
}



type FiltersType = {
  categoryId? : number
}

const fetchData = (page: number, filters: FiltersType)=>{
  // const page = 1;
  const offset = (page - 1) * 10;
  let url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=10`;
  
  if(filters.categoryId && filters.categoryId > 0){
    url += `&categoryId=${filters.categoryId}`;
  }
  
  return fetch(url).then(res => res.json())
}


const Product = () => {
  
  const [selectedRecord, setSelectedRecord] = React.useState<Product | null>(null);
  // const [refresh, setRefresh] = React.useState(0);
  const [editFormVisible, setEditFormVisible] = React.useState(false);

  const [params] = useSearchParams();

   const page =  params.get('page');
   const int_page = page ? parseInt(page) : 1;

   const cid =  params.get('categoryId');
   const int_cid = cid ? parseInt(cid) : 0;

   console.log('<<=== 🚀 page ===>>',page);
   // Sử dụng useQuery để fetch data từ API
   const { data, isLoading, isError, error } = useQuery<Product[], Error>({ 
      queryKey: ['products', {page,cid}], 
      queryFn: () =>  fetchData(int_page, {categoryId: int_cid})
  })

  if(isLoading) return (
    <>
    <Skeleton count={10} />
    </>
  )

  if(isError){
    return (<div>Error: {error.message}</div>)
  }


  
const columns: ColumnsType<Product> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
 
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button
              type='dashed'
              icon={<EditOutlined />}
              onClick={() => {
                console.log('EDIT', record);
                setSelectedRecord(record);
                console.log('Selected Record', record);
                updateForm.setFieldsValue(record); //đưa giá trị vào cho các input form update
                setEditFormVisible(true);
              }}
            />
        <Popconfirm
              title='Are you sure to delete?'
              onConfirm={() => {
                // DELETE
                console.log('DELETE', record);
              }}
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onCancel={() => {}}
              okText='Đồng ý'
              okType='danger'
              cancelText='Đóng'
            >
              <Button danger type='dashed' icon={<DeleteOutlined />} />
            </Popconfirm>
      </Space>
    ),
  },
];


  const onFinish = (values) => {
    console.log('🐣', values);
  };
  const onFinishFailed = (errors) => {
    console.log('🐣', errors);
  };

  const onUpdateFinish = (values) => {
    console.log('🐣', values);
  };

  const onUpdateFinishFailed = (errors) => {
    console.log('🐣', errors);
  };

  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  return (
   <div>
    <h1 className="py-5">Product Page</h1>
    {/* ==============TABLET================= */}
    <Table columns={columns} dataSource={data} />
    {/* ==============MODAL================= */}
    <Modal
        centered
        open={editFormVisible}
        title='Cập nhật thông tin'
        onOk={() => {
          updateForm.submit();
        }}
        onCancel={() => {
          setEditFormVisible(false);
        }}
        okText='Lưu thông tin'
        okType='primary'
        cancelText='Đóng'
      >
        <Form form={updateForm} name='update-form' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onUpdateFinish} onFinishFailed={onUpdateFinishFailed} autoComplete='on'>
          <Form.Item label='Danh mục sản phẩm' name='categoryId' rules={[{ required: true, message: 'Chưa nhập Tên sản phẩm' }]} hasFeedback>
            <Select
            />
          </Form.Item>

          <Form.Item label='Tên sản phẩm' name='title' rules={[{ required: true, message: 'Chưa nhập Tên sản phẩm' }]} hasFeedback>
            <Input value={selectedRecord?.title} />
          </Form.Item>

          <Form.Item label='Giá bán' name='price' rules={[{ required: true, message: 'Chưa nhập Giá bán' }]} hasFeedback>
            <InputNumber style={{ minWidth: 300 }} />
          </Form.Item>

          <Form.Item label='Giảm giá' name='discount'>
            <InputNumber />
          </Form.Item>
          <Form.Item label='Tồn kho' name='stock'>
            <InputNumber />
          </Form.Item>
          <Form.Item label='Nhà cung cấp' name='supplierId' rules={[{ required: true, message: 'Chưa nhập Tên sản phẩm' }]} hasFeedback>
            <Select/>
          </Form.Item>
        </Form>

      </Modal>
   </div>
  );
};

export default Product;
