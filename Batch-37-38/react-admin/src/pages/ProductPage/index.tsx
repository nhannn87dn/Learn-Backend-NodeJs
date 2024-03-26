import React from 'react';
import { Space, Table, Button, Popconfirm, message,Pagination,Modal  } from 'antd';
import {
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import type { TableProps, PaginationProps } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../library/axiosClient";
import useAuth from '../../hooks/useAuth';

interface DataType {
  _id?: string;
  productName: string;
  category: string,
  price: number;
  sort: number;
  isActive: boolean
}


const ProductPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const page = params.get("page");
  const limit = params.get("limit");
  const int_page = page ? parseInt(page) : 1;
  const int_limit = limit ? parseInt(limit) : 10;
  const onChangePagination: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
    navigate(`/products?page=${pageNumber}`);
  };

  const {user} =useAuth();

  //Lay danh sach danhmuc
  const getProducts = async (page = 1, limit = 10) => {
    return axiosClient.get(`/v1/products?page=${page}&limit=${limit}`);
  };
  //Lấy danh sách về
  // {data, isLoading, error, isError}
  const queryProducts = useQuery({
    queryKey: ["products", int_page, int_limit],
    queryFn: () => getProducts(int_page, int_limit),
  });

  const queryClient = useQueryClient();
  //=========================== FETCH DELETE =================================//
  // Mutations Để xóa danh mục
  const fetchDelete = async (id: string) => {
    return axiosClient.delete("/v1/products/" + id);
  };
  const deleteMutation = useMutation({
    mutationFn: fetchDelete,
    onSuccess: () => {
      console.log("Xóa category thành công !");
      messageApi.open({
        type: "success",
        content: "Delete success !",
      });
      // Làm tươi lại danh sách danh mục dựa trên key đã định nghĩa
      queryClient.invalidateQueries({
        queryKey: ["products", int_page, int_limit],
      });
    },
    onError: (err) => {
      console.log("Xóa có lỗi !", err);
      //msgError('Xóa Product không thành công !');
      messageApi.open({
        type: "error",
        content: "Delete fail !",
      });
    },
  });


  
const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'productName',
    key: 'productName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Category',
    dataIndex: 'categoryName',
    key: 'categoryName',
    render: (_, record) => {
      return <span>{record.category.categoryName}</span>;
    },
  },
  {
    title: "Sort",
    dataIndex: "sort",
    key: "sort",
  },
  {
    title: "Active",
    key: "isActive",
    dataIndex: "isActive",
    render: (text, record) => {
      return <span>{record.isActive ? "Enable" : "Disable"}</span>;
    },
  },
  
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button
          type="dashed"
          onClick={() => {
            console.log("Edit", record);
            navigate(`/products/${record._id}`)
          }}
        >
          Edit
        </Button>
        <Popconfirm
          title="Are you sure to delete?"
          onConfirm={() => {
            // DELETE
            console.log("DELETE", record);
            deleteMutation.mutate(record._id)
          }}
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
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
    <>
    {contextHolder}
    <h2>Product List</h2>
    <Button type='primary' onClick={()=>{
            navigate('/products/add')
        }}>Create new Product</Button>
    <Table
        pagination={false}
        columns={columns}
        dataSource={queryProducts.data?.data.data.products}
      />
      <div style={{ marginTop: 20 }}>
        <Pagination
          defaultCurrent={int_page}
          total={queryProducts.data?.data.data.totalItems}
          showSizeChanger
          defaultPageSize={int_limit}
          onChange={onChangePagination}
          showTotal={(total) => `Total ${total} items`}
        />
      </div>
    </>
  )
};

export default ProductPage;