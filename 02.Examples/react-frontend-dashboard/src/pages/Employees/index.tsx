import { Table, Button, Popconfirm, Space, Image, Card, message, Spin, Modal, Form, Input, Pagination  } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import type { PaginationProps } from 'antd';


interface EmployeeType {
  id: number;
  email: string;
  password: string;
  role: string;
  name: string;
  avatar: string;
}

//Hàm get Danh mục
const fetchData = async (page: number, limit = 10) => {
  // const page = 1;
  const offset = (page - 1) * 10;
  const url = `https://api.escuelajs.co/api/v1/users?offset=${offset}&limit=${limit}`;

  return fetch(url).then((res) => res.json());
};


const fetchDelete = async (id: number) =>
      fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
        method: 'DELETE',
      }).then((response) => response.json());


const updateData = async (formData: EmployeeType) => {
  const {id, ...payload} = formData;
  return fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json());
}

const fetchCreate = async (formData: EmployeeType) => fetch(`https://api.escuelajs.co/api/v1/users`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
}).then((response) => response.json());
/**
 * Component Employee
 */
const Employees = () => {
  const [params] = useSearchParams();
  const page = params.get('page');
  const limit = params.get('limit');
  const int_page = page ? parseInt(page) : 1;
  const int_limit = limit ? parseInt(limit) : 10;

  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [editFormVisible, setEditFormVisible] = React.useState(false);
  const [createFormVisible, setCreateFormVisible] = React.useState(false);
  const [updateForm] = Form.useForm();
  const [createForm] = Form.useForm();

  const msgSuccess = (msg: string) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };

  const msgError = (msg: string) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };

 //=========================== PHÂN TRANG =================================//
  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    console.log('Page: ', pageNumber);
    navigate(`/employees?page=${pageNumber}`);
  };

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    console.log(current, pageSize);
    navigate(`/employees?page=1&limit=${pageSize}`);
  };
  
  
  //=========================== FETCH DELETE =================================//
  // Mutations Để xóa danh mục
  const deleteMutation = useMutation({
    mutationFn: fetchDelete,
    onSuccess: () => {
      console.log('Xóa Employee thành công !');
      msgSuccess('Xóa Employee thành công !');
      // Sau khi thêm mới thành công thì update lại danh sách sản phẩm dựa vào queryKey
      queryClient.invalidateQueries({ queryKey: ['employees', page] });
    },
    onError: (err)=> {
      console.log('Xóa có lỗi !', err);
      msgError('Xóa Employee không thành công !');
    }
  });


  //=========================== FETCH UPDATE =================================//

    const updateMutation = useMutation({
      mutationFn: updateData,
      onSuccess: () => {
        msgSuccess('Cập nhật thành công !');
        // Sau khi thêm mới thành công thì update lại danh sách danh mucj dựa vào queryKey
        queryClient.invalidateQueries({ queryKey: ['employees', page] });
        
        setEditFormVisible(false);
      },
      onError: (err)=> {
        console.log('Cập nhật có lỗi !', err);
        msgError('Cập nhật không thành công !');
        setEditFormVisible(false);
      }
    });

  const onUpdateFinish = (values: EmployeeType) => {
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
      queryClient.invalidateQueries({ queryKey: ['employees', page] });
      //reset form
      createForm.resetFields();
    },
    onError: (err)=> {
      console.log('Thêm mới có lỗi !', err);
      msgError('Thêm mới có lỗi !')
    }
  })
  const onAddFinish = (values: EmployeeType) => {
    console.log('onAddFinish',values);
    addMutation.mutate(values);
    
  };
  const onAddFinishFailed = (errors) => {
    console.log('🐣', errors);
  };


  //=========================== FETCH LẤY DANH SÁCH =================================//
  // Sử dụng useQuery để fetch data từ API
  const { data, isLoading, isError, error } = useQuery<EmployeeType[], Error>({
    queryKey: ['employees', page],
    queryFn: () => fetchData(int_page, int_limit)
  });

  console.log(data);
  

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const columns: ColumnsType<EmployeeType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text) => <Image src={text} alt="Avatar" width={50} />,
    },

    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
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
              updateForm.setFieldsValue(record);
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
      <ul>
        <li>Sử dụng React Query để fetch và thêm mới, sửa, xóa</li>
        <li>Các tính năng thêm mới, sửa, xóa chung một trang</li>
      </ul>
    <Card
      title="Employees List"
      extra={
        <Button
          type="primary"
          onClick={() => {
            
            console.log('Thêm mới');
            setCreateFormVisible(true);

          }}
        >
          Thêm mới
        </Button>
      }
    >
       {contextHolder}
      {/* ==============TABLET================= */}
     {isLoading ? (
     <Spin tip="Loading">
        <div className="content" />
      </Spin>
      ): (
        <>
        <Table rowKey='id' columns={columns} dataSource={data} pagination={false} />
        <div style={{textAlign: 'right', marginTop: 30}}>
          <Pagination
            defaultCurrent={int_page}
            total={200}
            showSizeChanger
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
          />
        </div>
        
        </>
      )}
      
    </Card>
    {/* ====================== EDIT MODAL ================================ */}
     <Modal 
     title="Edit Employee" 
     open={editFormVisible} 
     onOk={()=>{
        console.log('update submit');
        updateForm.submit();
     }} 
     onCancel={()=>{
        setEditFormVisible(false);
     }}>
        <Form form={updateForm} name='update-form' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} 
        onFinish={onUpdateFinish} 
        onFinishFailed={onUpdateFinishFailed} 
        autoComplete='on'
        >
          <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Chưa nhập Name' }]} hasFeedback>
            <Input />
          </Form.Item>


          <Form.Item label='Role' name='role' rules={[{ required: true, message: 'Chưa nhập Role' }]} hasFeedback>
            <Input />
          </Form.Item>

          <Form.Item
            hasFeedback
            label='Thư điện tử'
            name='email'
            rules={[
              { required: true, message: 'Chưa nhập Thư điện tử' },
              { type: 'email', message: 'Thư điện tử không hợp lệ' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item extra='Ex: https://loremflickr.com/100/100/business' label='Avatar Link' name='avatar' rules={[{ required: false}]} hasFeedback>
            <Input />
          </Form.Item>
            
          <Form.Item hidden label='Id' name='id' hasFeedback>
            <Input />
          </Form.Item>

        </Form>
      </Modal>
      {/* ====================== CREATE MODAL ================================ */}
     <Modal 
     title="Create new a Employee" 
     open={createFormVisible} 
     onOk={()=>{
        console.log('add submit');
        createForm.submit();
     }} 
     okText='Lưu thông tin'
     onCancel={()=>{
        console.log('cancel create');
        
        setCreateFormVisible(false);
        createForm.resetFields();
     }}>
        <Form form={createForm} name='add-form' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} 
        onFinish={onAddFinish} 
        onFinishFailed={onAddFinishFailed} 
        autoComplete='on'
        >
          <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Chưa nhập Name' }]} hasFeedback>
            <Input />
          </Form.Item>


          <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Chưa nhập mật khẩu' }]} hasFeedback>
            <Input.Password />
          </Form.Item>

          <Form.Item
            hasFeedback
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Chưa nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item extra='Ex: https://loremflickr.com/100/100/business' label='Avatar Link' name='avatar' rules={[{ required: false}]} hasFeedback>
            <Input />
          </Form.Item>
         
        </Form>
      </Modal>
    </div>
  );
};

export default Employees;
