import { Table, Button, Popconfirm, Space, Image, Card, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
interface CategoryType {
  id: number;
  name: string;
  image: string;
}

//Hàm get Danh mục
const fetchData = async (page: number) => {
  // const page = 1;
  const offset = (page - 1) * 10;
  const url = `https://api.escuelajs.co/api/v1/categories?offset=${offset}&limit=10`;

  return fetch(url).then((res) => res.json());
};


const fetchDelete = (id: number) =>
      fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
        method: 'DELETE',
      }).then((response) => response.json());

/**
 * Component Category
 */
const Category = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const page = params.get('page');
  const int_page = page ? parseInt(page) : 1;

  console.log('<<=== 🚀 page ===>>', page);
  // Sử dụng useQuery để fetch data từ API
  const { data, isLoading, isError, error } = useQuery<CategoryType[], Error>({
    queryKey: ['categories', { page }],
    queryFn: () => fetchData(int_page),
  });
  
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
  // Mutations Để xóa danh mục
  const deleteMutation = useMutation({
    mutationFn: fetchDelete,
    onSuccess: () => {
      console.log('Xóa danh mục thành công !');
      msgSuccess();
      // Sau khi thêm mới thành công thì update lại danh sách sản phẩm dựa vào queryKey
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (err)=> {
      console.log('Xóa có lỗi !', err);
      msgError()
    }
  })


  if (isLoading)
    return (
      <>
        <Skeleton count={10} />
      </>
    );

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const columns: ColumnsType<CategoryType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <Image src={text} alt="Product" width={50} />,
    },

    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
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
              navigate(`/category/edit/${record.id}`);
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
    <Card
      title="Categories List"
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate('/category/add');
          }}
        >
          Thêm mới
        </Button>
      }
    >
       {contextHolder}
      {/* ==============TABLET================= */}
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default Category;
