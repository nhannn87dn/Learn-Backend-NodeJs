import { Button, Flex, Pagination, Space, Table, Tag, Popconfirm } from 'antd';
import type { TableProps } from 'antd';
import type { IPagination, IProduct,  } from '../product.type';
import { useNavigate } from 'react-router';



const ProductList = ({
    data,
    pagination,
    isLoading,
    onHandleDelete,
}: {
    data: IProduct[],
    pagination: IPagination | null,
    isLoading: boolean,
    onHandleDelete: (id: string)=>void
}) => {

    const navigate = useNavigate();

const columns: TableProps<IProduct>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'product_name',
    key: 'product_name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
  },
  {
    title: 'isNew',
    key: 'isNew',
    dataIndex: 'isNew',
    render: (_, { isNew }) => (
      <Flex gap="small" align="center" wrap>
        {isNew ? <Tag color="green">New</Tag> : <Tag color="red">Old</Tag>}
      </Flex>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="link">Edit</Button>
        <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={()=>{
            console.log(record._id)
            onHandleDelete(record._id)
        }}
        okText="Yes"
        cancelText="No"
      >
         <Button type="link" danger>Delete</Button>
      </Popconfirm>
       
      </Space>
    ),
  },
];

  return (
    <Flex vertical gap="large">
        <Table<IProduct> 
        columns={columns} 
        dataSource={data} 
        loading={isLoading}
        pagination={false}
         />
        <Pagination 
        defaultCurrent={1} total={pagination?.totalItems || 0}
        onChange={(page, pageSize)=>{
            console.log('<<=== 🚀  page, pageSize===>>', page, pageSize);
            navigate(`/products?page=${page}&limit=${pageSize}`);
        }}
         />
    </Flex>
  )
}

export default ProductList