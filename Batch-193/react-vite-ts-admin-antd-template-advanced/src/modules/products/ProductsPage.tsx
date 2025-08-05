import { Pagination, Space, Table } from 'antd';
import type { TableProps } from 'antd';

import { fetchProducts } from './product.service';
import { useQuery } from '@tanstack/react-query';
import type { ProductsResponse, ProductType } from './product.type';
import { useNavigate, useSearchParams } from 'react-router';

const ProductsPage = () => {

  const navigate = useNavigate()

  const [params] = useSearchParams();
  const page = params.get('page');
  const limit = params.get('limit');
  const int_page = page ? parseInt(page) : 1;
  const int_limit = limit ? parseInt(limit) : 5;

  console.log('<<=== 🚀 int_page ===>>',int_page,int_limit);

 const queryProducts = useQuery<ProductsResponse, Error>({
  queryKey: ['products', int_page, int_limit ],
  queryFn: ()=>fetchProducts(int_page, int_limit)
 })

 console.log('<<=== 🚀 queryProducts.data ===>>',queryProducts.data);

const columns: TableProps<ProductType>['columns'] = [
   {
    title: 'Thumbnail',
    key: 'thumbnail',
    dataIndex: 'thumbnail',
    render: (_, record) => (
      <>
        <img height={40} width={40} src={record.thumbnail} alt={record.product_name} />
      </>
    ),
  },
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
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite </a>
        <a>Delete</a>
      </Space>
    ),
  },
];



  return (<>
  <h1>product List</h1>
  <Table<ProductType> columns={columns} dataSource={queryProducts.data?.products || []} />
  <div style={{ textAlign: 'right', marginTop: 30 }}>
            <Pagination
              defaultCurrent={1}
              total={queryProducts.data?.totalRecords || 0} // Example total, replace with actual total from API
              showSizeChanger={false}
              pageSize={int_limit}
              onChange={(page, pageSize)=>{
                  navigate(`?page=${page}&limit=${pageSize}`)
              }}
              showQuickJumper
              showTotal={(total) => `Total ${total} items`}
            />
          </div>
  </>)
};

export default ProductsPage;