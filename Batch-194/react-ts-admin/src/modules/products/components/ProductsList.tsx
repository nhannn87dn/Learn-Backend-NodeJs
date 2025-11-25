import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Pagination, Popconfirm, Space, Table } from "antd"
import type { TableProps } from 'antd';
import type { IProduct } from "../product.type";
import ProductSearch from "./ProductSearch";


const ProductsList = ({
    isLoading = false,
    data = [],
    totalRecords = 0,
    onHandleChangePage,
    onDeleteProduct,
    onEditProduct
}: { 
    isLoading?: boolean,
    data: IProduct[], 
    totalRecords: number, 
    onHandleChangePage: (page: number, pageSize?: number) => void ,
    onDeleteProduct: (id: string) => void;
    onEditProduct: (product: IProduct) => void;
}) => {

console.log('<<=== 🚀 ProductsList data ===>>', data);




const columns: TableProps<IProduct>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'product_name',
    key: 'product_name',
    render: (text) => <strong>{text}</strong>,
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
    title: 'Model Year',
    key: 'modelYear',
    dataIndex: 'modelYear',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button 
        type="link" icon={<EditOutlined />} onClick={() => onEditProduct(record)}>Edit</Button>
        <Popconfirm
        title="Delete product"
        description={`Are you sure to delete this ${record.product_name}?`}
        onConfirm={()=> onDeleteProduct(record._id)}
        okText="Yes"
        cancelText="No"
      >
        <Button type="link" danger icon={<DeleteOutlined />}>Delete</Button>
      </Popconfirm>
      </Space>
    ),
  },
];

  return (
    <>
    <ProductSearch />
    <Table loading={isLoading} columns={columns} dataSource={data} pagination={false} />
    <Pagination 
    defaultCurrent={1} 
    onChange={(page, pageSize)=>{
        onHandleChangePage(page, pageSize);
    }}
    total={totalRecords} />
    </>
  )
}

export default ProductsList