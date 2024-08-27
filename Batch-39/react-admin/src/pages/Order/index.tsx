import { axiosClient } from "../../lib/axiosClient";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Flex, Form, Input, Pagination, Popconfirm, Row, Select, Space, Table } from "antd";


const Order = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();

  const page_str = params.get("page");
  const page = page_str ? page_str : 1;


  const phone_str = params.get("phone");
  const phone_number = phone_str ? phone_str : null;

  const keyword_str = params.get("keyword");
  const keyword = keyword_str ? keyword_str : null;

  const order_status_str = params.get("order_status");
  const order_status = order_status_str ? order_status_str : 0;

  const payment_type_str = params.get("payment_type");
  const payment_type = payment_type_str ? payment_type_str : 0;


  const fetchOrder = async () => {
    const limit = 10;
    let url = `http://localhost:8080/api/v1/orders?`;

    if (phone_number) {
        url += `phone=${phone_number}&`;
    }

    if (keyword) {
        url += `keyword=${keyword}&`;
    }
    if (order_status != 0) {
        url += `order_status=${order_status}&`;
    }
    if (payment_type != 0) {
        url += `payment_type=${payment_type}&`;
    }

    url += `page=${page}&limit=${limit}`;

    const res = await axiosClient.get(url);
    return res.data.data;
  };

  const queryOrder = useQuery({
    queryKey: ["orders", page, phone_number, keyword, order_status, payment_type],
    queryFn: fetchOrder,
  });


  //=== SEARCH FORM ========== //
  const [formSearch] = Form.useForm();
  // Submit Form updatye
  const onFinishSearch = async (values) => {
    console.log("Success:", values);
    //cập nhật lại url
    const params = new URLSearchParams();

    // Duyệt qua từng cặp key-value trong object
    for (const [key, value] of Object.entries(values)) {
        if (value !== undefined && value !== '') { // Chỉ thêm khi giá trị không rỗng và không undefined
            params.append(key, value);
        }
    }

    const searchString = params.toString();

    navigate(`/orders?${searchString}`);
  };
  const onFinishFailedSearch = async (errorInfo) => {
    console.log("errorInfo:", errorInfo);
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (_, record) => <a>{`${record.customer.first_name} ${record.customer.last_name}`}</a>,
    },
    {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        render: (_, record) => <span>{record.customer.phone}</span>,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (_, record) => <span>{record.customer.email}</span>,
      },
      {
        title: "Status",
        dataIndex: "orderStatusTitle",
        key: "orderStatusTitle",
        render: (_, record) => <span>{record.orderStatusTitle}</span>,
      },
      {
        title: "Payment",
        dataIndex: "paymentTypeTitle",
        key: "paymentTypeTitle",
        render: (_, record) => <span>{record.paymentTypeTitle}</span>,
      },
      {
        title: "Created at",
        dataIndex: "email",
        key: "createdAt",
        render: (_, record) => <span>{record.createdAt}</span>,
      },
    
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => {
        return (
          <Space>
            <Button
              onClick={() => {
               navigate(`/orders/${record._id}`)
              }}
              type="dashed"
            >
              View
            </Button>
            <Popconfirm
              title="Delete the product"
              description="Are you sure to delete this product?"
              onConfirm={() => {
                //gọi api xóa
                //deleteProduct.mutate(record._id);
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
        <Flex justify="space-between" align="center">
        <h1>Orders List</h1>
        <Button  type="primary">
           Thêm mới
        </Button>
      </Flex>

      <div>
        <Form
          form={formSearch}
          name="form-search"
          onFinish={onFinishSearch}
          onFinishFailed={onFinishFailedSearch}
          autoComplete="on"
          layout="vertical"
        >
            <Row>
            <Col span={5}>
                <Form.Item  label="Tên Khách hàng" name="keyword">
            <Input placeholder="FirstName hoặc LastName" />
          </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label="Phone" name="phone">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={5}>
                        <Form.Item label="Order Status" name="order_status">
                    <Select  defaultValue={0} options={[
                        { value: 0, label: "Tất cả trạng thái",  },
                        { value: 1, label: "Pending" },
                        { value: 2, label: "Processing" },
                        { value: 3, label: "Rejected" },
                        { value: 4, label: "Completed" },

                        ]} />
                </Form.Item>
                </Col>
                <Col span={5}>
                <Form.Item label="Payment Method" name="payment_type">
            <Select  defaultValue={0} options={[
                { value: 0, label: "Tất cả Phương thức" },
                { value: 1, label: "COD" },
                { value: 2, label: "Credit" },
                { value: 3, label: "ATM" },
                { value: 4, label: "Cash" },
                ]} />
          </Form.Item>
                </Col>
                
                <Col span={4}>
                    <Form.Item label="Thao tác" labelCol={{offset: 2}}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                            Search
                            </Button>
                            <Button onClick={()=>{
                                formSearch.resetFields();
                            }} type="default">
                            Reset
                            </Button>
                        </Space>
                        
                    </Form.Item>
                </Col>
            </Row>
         

         

          

          
         
        </Form>
      </div>
    <Table
        pagination={false}
        dataSource={queryOrder?.data?.orders_list || []}
        columns={columns}
        loading={queryOrder.isLoading}
      />
      <Pagination
        defaultCurrent={1}
        onChange={(page, pageSize) => {
          console.log(page, pageSize);
          //Thay đổi uRL
          navigate(`/orders?page=${page}`);
        }}
        total={queryOrder?.data?.pagination.totalRecords || 0}
      />
    </div>
  )
}

export default Order