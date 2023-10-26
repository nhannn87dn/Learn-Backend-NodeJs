import React from 'react';
import { Space, Table, Button, Modal, Form, Input, message, Select, Pagination, InputNumber } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '../../library/axiosClient';
import { useNavigate, useSearchParams } from 'react-router-dom';
import config from '../../constants/config';
import type { PaginationProps } from 'antd';
const { TextArea } = Input;

interface DataType {
  _id?: string;
  name: string;
  price: number;
  stock: number;
  discount?: number;
  description?: string;
  categoryId?: string;
  category?: { _id: string; name: string };
  supplier?: string;
  thumbnail?: string;
  slug?: string;
}

interface ICategory {
  _id?: string;
  name: string;
  description: string;
}

const Products = () => {
  const [messageApi, contextHolder] = message.useMessage();
  //Toggle Modal Edit
  const [isModalEditOpen, setIsModalEditOpen] = React.useState(false);
  //Toggle Modal Create
  const [isModalCreateOpen, setIsModalCreateOpen] = React.useState(false);

  const navigate = useNavigate();
  //=========================== PHÂN TRANG =================================//
  const [params] = useSearchParams();
  const page = params.get('page');
  const limit = params.get('limit');
  const int_page = page ? parseInt(page) : 1;
  const int_limit = limit ? parseInt(limit) : 10;

  const onChangePagination: PaginationProps['onChange'] = (pageNumber) => {
    console.log('Page: ', pageNumber);
    navigate(`/products?page=${pageNumber}`);
  };

  //Lay danh sach danhmuc
  const fetchProducts = async (page = 1, limit = 10) => {
    return axiosClient.get(config.urlAPI + `/v1/products?page=${page}&limit=${limit}`);
  };

  // Access the client
  const queryClient = useQueryClient();

  //Lấy danh sách về
  const queryProduct = useQuery({
    queryKey: ['products', int_page, int_limit],
    queryFn: () => fetchProducts(int_page, int_limit),
  });

  console.log('<<=== 🚀 queryProduct.data ===>>', queryProduct.data?.data.data.products);

  //======= Sự kiện XÓA =====//
  const fetchDelete = async (objectID: string) => {
    return axiosClient.delete(config.urlAPI + '/v1/products/' + objectID);
  };
  // Mutations => Thêm mới, xóa, edit
  const mutationDelete = useMutation({
    mutationFn: fetchDelete,
    onSuccess: () => {
      console.log('Delete success !');
      messageApi.open({
        type: 'success',
        content: 'Delete success !',
      });
      // Làm tươi lại danh sách danh mục dựa trên key đã định nghĩa
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      //khi gọi API bị lỗi
    },
  });

  //======= Sự kiện EDit =====//
  const fetchUpdate = async (formData: DataType) => {
    const { _id, ...payload } = formData;
    return axiosClient.patch(config.urlAPI + '/v1/products/' + _id, payload);
  };
  // Mutations => Thêm mới, xóa, edit
  const mutationUpdate = useMutation({
    mutationFn: fetchUpdate,
    onSuccess: () => {
      console.log('Update success !');
      messageApi.open({
        type: 'success',
        content: 'Update success !',
      });
      // Làm tươi lại danh sách danh mục dựa trên key đã định nghĩa
      queryClient.invalidateQueries({ queryKey: ['products'] });
      //Ẩn modal
      setIsModalEditOpen(false);
    },
    onError: () => {
      //khi gọi API bị lỗi
    },
  });

  const [updateForm] = Form.useForm();
  //Khi nhấn nut OK trên Modal
  const handleEditOk = () => {
    // setIsModalEditOpen(false);
    console.log('edit submit');
    //Cho submit form trong Modal
    updateForm.submit();
  };
  //Khi nhấn nut Cancel trên modal
  const handleEditCancel = () => {
    setIsModalEditOpen(false);
    console.log('edit cancel');
  };

  //hàm lấy thông tin từ form Edit
  const onFinishEdit = async (values: any) => {
    console.log('Success:', values); //=> chính là thông tin ở form edit
    //Gọi API để update product
    mutationUpdate.mutate(values);
  };

  const onFinishEditFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  //======= Sự kiện Create =====//
  const fetchCreate = async (formData: DataType) => {
    return axiosClient.post(config.urlAPI + '/v1/products', formData);
  };
  // Mutations => Thêm mới, xóa, edit
  const mutationCreate = useMutation({
    mutationFn: fetchCreate,
    onSuccess: () => {
      console.log('Create success !');
      messageApi.open({
        type: 'success',
        content: 'Create success !',
      });
      // Làm tươi lại danh sách danh mục dựa trên key đã định nghĩa
      queryClient.invalidateQueries({ queryKey: ['products'] });
      //Ẩn modal
      setIsModalCreateOpen(false);
      createForm.resetFields(); //làm trống các input
    },
    onError: () => {
      //khi gọi API bị lỗi
    },
  });

  const [createForm] = Form.useForm();
  //Khi nhấn nut OK trên Modal
  const handleCreateOk = () => {
    // setIsModalCreateOpen(false);
    console.log('Create submit');
    //Cho submit form trong Modal
    createForm.submit();
  };
  //Khi nhấn nut Cancel trên modal
  const handleCreateCancel = () => {
    setIsModalCreateOpen(false);
    console.log('Create cancel');
  };

  //hàm lấy thông tin từ form Create
  const onFinishCreate = async (values: any) => {
    console.log('Success:', values); //=> chính là thông tin ở form edit
    //Gọi API để update product
    mutationCreate.mutate(values);
  };

  const onFinishCreateFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  //============== get Categories ================/
  //Lay danh sach danhmuc
  const fetchCategories = async () => {
    /**
     * Nếu thêm limit thì nó mặc định chỉ lấy về 5 records
     */
    return axiosClient.get(config.urlAPI + `/v1/categories?limit=50`);
  };
  //Lấy danh sách về
  const queryCategory = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    onSuccess: (data) => {
      console.log('queryCategory', data);
    },
  });

  //============== get Suppliers ================/
  //Lay danh sach danhmuc
  const fetchSuppliers = async () => {
    /**
     * Nếu thêm limit thì nó mặc định chỉ lấy về 10 records
     */
    return axiosClient.get(config.urlAPI + `/v2/suppliers?limit=50`);
  };
  //Lấy danh sách về
  const querySupplier = useQuery({
    queryKey: ['suppliers'],
    queryFn: fetchSuppliers,
    onSuccess: (data) => {
      console.log('querySupplier', data);
    },
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Category',
      dataIndex: 'product',
      key: 'product',
      render: (_, record) => <span>{record?.category?.name}</span>,
    },
    {
      title: 'Supplier',
      dataIndex: 'supplier',
      key: 'supplier',
      render: (_, record) => <span>{record?.supplier?.name}</span>,
    },
    {
      title: 'Pice',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <strong>${text}</strong>,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              console.log('Edit this item');
              setIsModalEditOpen(true); //show modal edit lên
              updateForm.setFieldsValue({ ...record, supplier: record?.supplier?._id });
            }}
          >
            Edit
          </Button>

          <Button
            danger
            onClick={() => {
              console.log('Delete this item', record);
              mutationDelete.mutate(record._id as string);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        onClick={() => {
          console.log('Open Model Create Product');
          //show modal them moi
          setIsModalCreateOpen(true);
        }}
      >
        Create a new Product
      </Button>

      <Table pagination={false} columns={columns} key={'_id'} dataSource={queryProduct.data?.data.data.products} />
      <div
        style={{
          marginTop: '20px',
        }}
      >
        <Pagination
          defaultCurrent={int_page}
          total={queryProduct.data?.data.data.totalRecords}
          defaultPageSize={int_limit}
          onChange={onChangePagination}
          showTotal={(total) => `Total ${total} items`}
        />
      </div>
      {/* begin Edit Modal */}
      <Modal width={960} title="Edit Product" okText='Update Product' open={isModalEditOpen} onOk={handleEditOk} onCancel={handleEditCancel}>
        <Form
          form={updateForm}
          name="edit-form"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinishEdit}
          onFinishFailed={onFinishEditFailed}
          autoComplete="off"
        >
          <Form.Item<DataType>
            hasFeedback
            label="Name"
            name="name"
            rules={[
              { required: true, message: 'Please input product Name!' },
              { min: 4, message: 'Tối thiểu 4 kí tự' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<DataType>
            hasFeedback
            label="Slug"
            name="slug"
            rules={[
              { required: true, message: 'Please input product Slug!' },
              { min: 4, message: 'Tối thiểu 4 kí tự' },
            ]}
            extra="Ví dụ: dien-thoai-iphone-14-pro-32gb"
          >
            <Input />
          </Form.Item>

          <Form.Item<DataType>
            hasFeedback
            label="Price"
            name="price"
            rules={[
              { required: true, message: 'Please input product Price!' },
              {
                type: 'number',
                min: 0,
                message: 'Tối thiểu phải là 0',
              },
            ]}
          >
            <InputNumber min={0} addonAfter="$" defaultValue={0} />
          </Form.Item>
          <Form.Item<DataType>
            hasFeedback
            label="Stock"
            name="stock"
            rules={[
              { required: true, message: 'Please input product Price!' },
              {
                type: 'number',
                min: 0,
                message: 'Tối thiểu phải là 0',
              },
            ]}
          >
            <InputNumber min={0} defaultValue={0} />
          </Form.Item>
          {/* Xem Rules https://ant.design/components/form#rule */}
          <Form.Item<DataType>
            hasFeedback
            label="Discount"
            name="discount"
            rules={[
              {
                type: 'number',
                min: 0,
                max: 90,
                message: 'Chỉ cho phép từ 0 - 90 %',
              },
            ]}
            extra="Chỉ cho phép từ 0 - 90 %"
          >
            <InputNumber min={0} max={90} defaultValue={0} />
          </Form.Item>
          <Form.Item<DataType> label="Category" name="categoryId" rules={[{ required: true, message: 'Please input product Category!' }]} hasFeedback>
            <Select
              options={
                queryCategory.data &&
                queryCategory.data?.data.data.categories.map((c: any) => {
                  return {
                    value: c._id,
                    label: c.name,
                  };
                })
              }
            />
          </Form.Item>

          <Form.Item<DataType> hasFeedback label="Supplier" name="supplier" rules={[{ required: true, message: 'Please input product Supplier!' }]}>
            <Select
              options={
                querySupplier.data &&
                querySupplier.data?.data.data.suppliers.map((c: any) => {
                  return {
                    value: c._id,
                    label: c.name,
                  };
                })
              }
            />
          </Form.Item>

          <Form.Item<DataType> hasFeedback label="Description" name="description" rules={[{ max: 500, message: 'Tối đa 500 kí tự' }]}>
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item<DataType> hasFeedback label="Thumbnail" name="thumbnail" rules={[{ required: true, message: 'Please input product Thumbnail!' }]}>
            <Input />
          </Form.Item>

          <Form.Item hidden label="Id" name="_id">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {/* End Edit Modal */}

      {/* begin Create Modal */}
      <Modal width={960} title="Create Product" 
      open={isModalCreateOpen} 
      onOk={handleCreateOk} 
      onCancel={handleCreateCancel}
      okText='Create Product'
      >
        <Form
          form={createForm}
          name="create-form"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinishCreate}
          onFinishFailed={onFinishCreateFailed}
          autoComplete="off"
        >
          <Form.Item<DataType>
            hasFeedback
            label="Name"
            name="name"
            rules={[
              { required: true, message: 'Please input product Name!' },
              { min: 4, message: 'Tối thiểu 4 kí tự' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<DataType>
            hasFeedback
            label="Slug"
            name="slug"
            rules={[
              { required: true, message: 'Please input product Slug!' },
              { min: 4, message: 'Tối thiểu 4 kí tự' },
            ]}
            extra="Ví dụ: dien-thoai-iphone-14-pro-32gb"
          >
            <Input />
          </Form.Item>

          <Form.Item<DataType>
            hasFeedback
            label="Price"
            name="price"
            rules={[
              { required: true, message: 'Please input product Price!' },
              {
                type: 'number',
                min: 0,
                message: 'Tối thiểu phải là 0',
              },
            ]}
          >
            <InputNumber min={0} addonAfter="$" defaultValue={0} />
          </Form.Item>
          <Form.Item<DataType>
            hasFeedback
            label="Stock"
            name="stock"
            rules={[
              { required: true, message: 'Please input product Price!' },
              {
                type: 'number',
                min: 0,
                message: 'Tối thiểu phải là 0',
              },
            ]}
          >
            <InputNumber min={0} defaultValue={0} />
          </Form.Item>
          {/* Xem Rules https://ant.design/components/form#rule */}
          <Form.Item<DataType>
            hasFeedback
            label="Discount"
            name="discount"
            rules={[
              {
                type: 'number',
                min: 0,
                max: 90,
                message: 'Chỉ cho phép từ 0 - 90 %',
              },
            ]}
            extra="Chỉ cho phép từ 0 - 90 %"
          >
            <InputNumber min={0} max={90} defaultValue={0} />
          </Form.Item>
          <Form.Item<DataType> label="Category" name="categoryId" rules={[{ required: true, message: 'Please input product Category!' }]} hasFeedback>
            <Select
              options={
                queryCategory.data &&
                queryCategory.data?.data.data.categories.map((c: any) => {
                  return {
                    value: c._id,
                    label: c.name,
                  };
                })
              }
            />
          </Form.Item>

          <Form.Item<DataType> hasFeedback label="Supplier" name="supplier" rules={[{ required: true, message: 'Please input product Supplier!' }]}>
            <Select
              options={
                querySupplier.data &&
                querySupplier.data?.data.data.suppliers.map((c: any) => {
                  return {
                    value: c._id,
                    label: c.name,
                  };
                })
              }
            />
          </Form.Item>

          <Form.Item<DataType> hasFeedback label="Description" name="description" rules={[{ max: 500, message: 'Tối đa 500 kí tự' }]}>
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item<DataType> hasFeedback label="Thumbnail" name="thumbnail" rules={[{ required: true, message: 'Please input product Thumbnail!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {/* End Create Modal */}
    </>
  );
};

export default Products;
