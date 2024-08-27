import { Button, Flex, Space, Table } from "antd";
import { axiosClient } from "../../lib/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
   const navigate = useNavigate();
    const params = useParams();
    const id = params.id ? params.id : '';

    useEffect(()=>{
        if(id === ''){
            navigate('/orders')
        }
    }, [navigate,id])


    const fetchOrderDetails = async () => {
        const url = `http://localhost:8080/api/v1/orders/${id}`;
        const res = await axiosClient.get(url);
        return res.data.data;
    };

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["orders", id],
        queryFn: fetchOrderDetails,
        /** Gọi API khi id khác rỗng */
        enabled: id!== ''
      });

    if(isLoading) {
        return <div>Loading...</div>
    }

    
  const columns = [
    {
      title: "Name",
      dataIndex: "product_name",
      key: "product_name",
      render: (_, record) => <a>{`${record.product.product_name}`}</a>,
    },
    {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity"
      },
      {
        title: "Giá bán",
        dataIndex: "price",
        key: "price"
      },
      {
        title: "discount",
        dataIndex: "discount",
        key: "discount",
        render: (_, record) => <span>{record.discount}</span>,
      },
      {
        title: "Thành tiền",
        dataIndex: "amount",
        key: "amount",
        align: 'right',
        render: (_, record) => <span>{record.quantity * record.price}</span>,
      },
   
  ];

  return (
    <div>
        <Flex justify="space-between" align="center">
        <h1>OrderDetails</h1>
        <Button onClick={()=>{
            navigate('/orders')
        }}  type="primary">
           Danh sách đơn hàng
        </Button>
      </Flex>
        <h1></h1>
        {
            data ? (
                <div className="orderWrapper">
                    <h2>Thông tin đơn hàng</h2>
                    <ul>
                        <li>ID: {data._id}</li>
                        <li>Order Status: {data.orderStatusTitle}</li>
                        <li>Order Status: {data.paymentTypeTitle}</li>
                        <li>CreatedAt: {data.createdAt}</li>
                        <li>Order Note: {data.order_note}</li>
                    </ul>
                    <h2>Thông tin khách hàng</h2>
                    <ul>
                        <li>Name: {data.customer.first_name} {data.customer.last_name}</li>
                        <li>Phone: {data.customer.phone}</li>
                        <li>Email: {data.customer.email}</li>
                        <li>Địa chỉ giao hàng: {data.street} - {data.city} -  {data.state} </li>
                    </ul>
                    <h2>Thông tin sản phẩm</h2>
                    <Table
                        dataSource={data.order_items || []}
                        columns={columns}
                        pagination={false} // Tắt phân trang nếu không cần
                        summary={pageData => {
                            let totalAmount = 0;

                            pageData.forEach(({ quantity, price }) => {
                            totalAmount += quantity * price;
                            });

                            return (
                            <Table.Summary.Row>
                                <Table.Summary.Cell colSpan={4} align="right">
                                <strong>Total:</strong>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell align="right">
                                <strong>{totalAmount}</strong>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                            );
                }}
                />
                <h2>Xử lý đơn hàng</h2>
                <Space>
                    <Button type="primary">Xác nhận đơn</Button>
                    <Button type="primary">Hoàn thành</Button>
                    <Button type="primary" danger>Hủy đơn</Button>
                </Space>
                </div>
            ) : (<span>Empty...</span>)
        }
    </div>
  )
}

export default OrderDetails