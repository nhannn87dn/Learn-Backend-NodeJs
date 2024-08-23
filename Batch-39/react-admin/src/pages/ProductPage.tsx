import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Table, Pagination, Button, Space, message, Popconfirm } from "antd";
import { axiosClient } from "../lib/axiosClient";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { PopconfirmProps } from "antd";

const ProductPage = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [params] = useSearchParams();

  const page_str = params.get("page");
  const page = page_str ? page_str : 1;

  const fetchProduct = async () => {
    const limit = 10;
    let url = `http://localhost:8080/api/v1/products?page=${page}&limit=${limit}`;
    const res = await axiosClient.get(url);
    return res.data.data;
  };

  const getProduct = useQuery({
    queryKey: ["products", page],
    queryFn: fetchProduct,
  });

  console.log(getProduct.data);

  //================== DELETE ==============//

  const queryClient = useQueryClient();

  const fetchDeleteProduct = async (id: string) => {
    const url = `http://localhost:8080/api/v1/products/${id}`;
    const res = await axiosClient.delete(url);
    return res.data.data;
  };

  const deleteProduct = useMutation({
    mutationFn: fetchDeleteProduct,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["products", page],
      });
      //Hiển thị một message thông báo là xóa thành công
      messageApi.open({
        type: "success",
        content: "Xóa sản phẩm thành công",
      });
    },
    onError: (error) => {
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Xóa lỗi",
      });
    },
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => {
        return (
          <Space>
            <Button type="dashed">Edit</Button>
            <Popconfirm
              title="Delete the product"
              description="Are you sure to delete this product?"
              onConfirm={() => {
                //gọi api xóa
                deleteProduct.mutate(record._id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="dashed" danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      {contextHolder}
      <h1>product List</h1>
      <Table
        pagination={false}
        dataSource={getProduct?.data?.products_list || []}
        columns={columns}
      />
      <Pagination
        defaultCurrent={1}
        onChange={(page, pageSize) => {
          console.log(page, pageSize);
          //Thay đổi uRL
          navigate(`/products?page=${page}`);
        }}
        total={getProduct?.data?.pagination.totalRecords || 0}
      />
    </div>
  );
};

export default ProductPage;
