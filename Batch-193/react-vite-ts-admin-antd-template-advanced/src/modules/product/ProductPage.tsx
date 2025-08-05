import { Button, Popconfirm, Space, Image, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams, useNavigate } from 'react-router';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import type { PaginationProps } from 'antd';
import { useAppMessage } from '../../stores/useAppMessage';
import type { CategoryType, ProductType } from './product.type';
import { fetchCategories, fetchCreate, fetchData, fetchDelete, updateData } from './product.service';
import ProductAdd from './components/ProductAdd';
import ProductEdit from './components/ProductEdit';
import ProductTable from './components/ProductTable';

/**
 * Component Product
 */
const ProductPage = () => {
  const [params] = useSearchParams();
  const page = params.get('page');
  const limit = params.get('limit');
  const int_page = page ? parseInt(page) : 1;
  const int_limit = limit ? parseInt(limit) : 10;

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [editFormVisible, setEditFormVisible] = React.useState(false);
  const [createFormVisible, setCreateFormVisible] = React.useState(false);
  const [selectedRecord, setSelectedRecord] = React.useState<ProductType | null>(null);
  const [updateForm] = Form.useForm();
  const [createForm] = Form.useForm();
  const {sendMessage} = useAppMessage();

  const msgSuccess = (msg: string) => {
    sendMessage({
      msg,
      type:'success',
    })
  };

  const msgError = (msg: string) => {
   sendMessage({
      msg,
      type: 'error',
    })
  };

 //=========================== PHÂN TRANG =================================//
  const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
    console.log('Page: ', pageNumber);
    navigate(`/product?page=${pageNumber}&limit=${pageSize}`);
  };

  
  // Sử dụng useQuery để fetch data từ API
  const queryCategory = useQuery<CategoryType[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
  
  //=========================== FETCH DELETE =================================//
  // Mutations Để xóa danh mục
  const deleteMutation = useMutation({
    mutationFn: fetchDelete,
    onSuccess: () => {
      console.log('Xóa Product thành công !');
      msgSuccess('Xóa Product thành công !');
      // Sau khi thêm mới thành công thì update lại danh sách sản phẩm dựa vào queryKey
      queryClient.invalidateQueries({ queryKey: ['products', page] });
    },
    onError: (err)=> {
      console.log('Xóa có lỗi !', err);
      msgError('Xóa Product không thành công !');
    }
  });


  //=========================== FETCH UPDATE =================================//

    const updateMutation = useMutation({
      mutationFn: updateData,
      onSuccess: () => {
        msgSuccess('Cập nhật thành công !');
        // Sau khi thêm mới thành công thì update lại danh sách danh mucj dựa vào queryKey
        queryClient.invalidateQueries({ queryKey: ['products', page] });
        
        setEditFormVisible(false);
      },
      onError: (err)=> {
        console.log('Cập nhật có lỗi !', err);
        msgError('Cập nhật không thành công !');
        setEditFormVisible(false);
      }
    });

  const onUpdateFinish = (values: ProductType) => {
    console.log('onUpdateFinish',values);
    updateMutation.mutate(values);
  };

  const onUpdateFinishFailed = (errors) => {
    console.log('🐣', errors);
  };


  //=========================== FETCH THÊM MỚI =================================//
  const addMutation = useMutation({
    mutationFn: fetchCreate,
    onSuccess: (data) => {
      console.log('addMutation onSuccess',data);
      
      setCreateFormVisible(false);
      msgSuccess('Thêm mới thành công !');
      // Sau khi thêm mới thành công thì update lại danh sách sản phẩm dựa vào queryKey
      queryClient.invalidateQueries({ queryKey: ['products', page] });
      //reset form
      createForm.resetFields();
    },
    onError: (err)=> {
      console.log('Thêm mới có lỗi !', err);
      msgError('Thêm mới có lỗi !')
    }
  })
  const onAddFinish = (values: ProductType) => {
    console.log('onAddFinish',values);
    addMutation.mutate(values);
    
  };
  const onAddFinishFailed = (errors) => {
    console.log('🐣', errors);
  };


  //=========================== FETCH LẤY DANH SÁCH =================================//
  // Sử dụng useQuery để fetch data từ API
  const { data, isLoading, isError, error } = useQuery<ProductType[], Error>({
    queryKey: ['products', page],
    queryFn: () => fetchData(int_page, int_limit)
  });

  console.log(data);
  

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const columns: ColumnsType<ProductType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      render: (_,record) => <Image src={record.images[0]} alt="Avatar" width={50} />,
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
      render: (text) => <span>$ {text}</span>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (_,record) => <span>{record.category.name}</span>,
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="dashed"
            icon={<EditOutlined />}
            onClick={() => {
              console.log('EDIT', record);
              setSelectedRecord(record);
              updateForm.setFieldsValue({...record, categoryId: record.category.id});
              setEditFormVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => {
              // DELETE
              console.log('DELETE', record);
              deleteMutation.mutate(record.id);
            }}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onCancel={() => {}}
            okText="Đồng ý"
            okType="danger"
            cancelText="Đóng"
          >
            <Button danger type="dashed" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];


  return (
    <div>
      <ProductTable
        data={data}
        loading={isLoading}
        columns={columns}
        page={int_page}
        onPageChange={onChange}
        onAddClick={() => setCreateFormVisible(true)}
      />
      <ProductEdit
        visible={editFormVisible}
        onOk={() => updateForm.submit()}
        onCancel={() => setEditFormVisible(false)}
        form={updateForm}
        onFinish={onUpdateFinish}
        onFinishFailed={onUpdateFinishFailed}
        queryCategory={queryCategory}
      />
      <ProductAdd
        visible={createFormVisible}
        onOk={() => createForm.submit()}
        onCancel={() => {
          setCreateFormVisible(false);
          createForm.resetFields();
        }}
        form={createForm}
        onFinish={onAddFinish}
        onFinishFailed={onAddFinishFailed}
        queryCategory={queryCategory}
      />
    </div>
  );
};

export default ProductPage;