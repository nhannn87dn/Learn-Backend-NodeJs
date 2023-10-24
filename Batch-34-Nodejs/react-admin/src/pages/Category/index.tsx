import React from 'react';
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  useQuery,  
} from '@tanstack/react-query';
import { axiosClient } from '../../library/axiosClient';
import { useNavigate } from 'react-router-dom';
import config from '../../constants/config';

interface DataType {
  id: number;
  name: string;
  description: string;
 
}

const Category= () => {

  const navigate = useNavigate();
  //Lay danh sach danhmuc
  const getCategories = async ()=> {
      return axiosClient.get(config.urlAPI+'/categories');
  }
  const queryCategory = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories 
  });

  console.log('<<=== 🚀 queryCategory.data ===>>',queryCategory.data?.data.data);
  
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  

  return (
    <>
     <Button type="primary" onClick={()=>{
        navigate('/category/add');
     }}>Create a new Category</Button>
    <Table columns={columns} key={'_id'} dataSource={queryCategory.data?.data.data} />
    </>
  )
};

export default Category;