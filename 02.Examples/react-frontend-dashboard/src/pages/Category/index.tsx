import {  Table, Button, Popconfirm, Space, Image  } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams  } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
interface CategoryType {
  id: number;
  name: string;
  image: string;
 
}


const fetchData = async (page: number)=>{
  // const page = 1;
  const offset = (page - 1) * 10;
  const url = `https://api.escuelajs.co/api/v1/categories?offset=${offset}&limit=10`;
  
  return fetch(url).then(res => res.json())
}


const Category = () => {
  
  const [params] = useSearchParams();
  const navigate = useNavigate();
   const page =  params.get('page');
   const int_page = page ? parseInt(page) : 1;



   console.log('<<=== 🚀 page ===>>',page);
   // Sử dụng useQuery để fetch data từ API
   const { data, isLoading, isError, error } = useQuery<CategoryType[], Error>({ 
      queryKey: ['categories', {page}], 
      queryFn: () =>  fetchData(int_page)
  })

  if(isLoading) return (
    <>
    <Skeleton count={10} />
    </>
  )

  if(isError){
    return (<div>Error: {error.message}</div>)
  }


  
const columns: ColumnsType<CategoryType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
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
              type='dashed'
              icon={<EditOutlined />}
              onClick={() => {
                console.log('EDIT', record);
               
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


  return (
   <div>
    <div className='grid grid-cols-12'>
      <div className="col-span-12 md:col-span-8">
      <h1 className="py-5 text-2xl text-bold">Categories List</h1>
      </div>
      <div className="col-span-12 md:col-span-4">
        <div className="flex">
           <Button type='primary' onClick={()=> {
            navigate('/category/add');
           }}>Thêm mới</Button>
        </div>
      </div>
    </div>
   
    {/* ==============TABLET================= */}
    <Table columns={columns} dataSource={data} />
    
   </div>
  );
};

export default Category;
