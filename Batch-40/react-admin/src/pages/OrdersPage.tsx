import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Input, InputNumber, message, Modal, Pagination, Popconfirm, Select, Space, Table } from "antd";
import type { TableProps, FormProps  } from 'antd';
import {
    useMutation,
    useQuery,
    useQueryClient,
  } from '@tanstack/react-query'
import { axiosClient } from "../libs/axiosClient";
import { env } from "../constants/getEnvs";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";

interface DataType {
    _id: string;
    order_name: string;
    price: number;
    stock: number;
    model_year: number;
    category: {
        category_name: string
    }
  }

export default function OrdersPage() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    //get page và  limit
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    
    console.log(page, limit);
    
    const KEYs = {
        getOrders: ()=>{
            return ['orders', page, limit]
        },
        getOrder: (id: string)=>{
            return ['order', id]
        }
    }
    /** ----| BEGIN GET ORDERS |---- */
    const fetchOrders = async ()=>{
        const response = await axiosClient.get(`${env.API_URL}/v1/orders?page=${page}&limit=${limit}`);
        return response.data;
    }
    
    const queryOrders = useQuery({ 
        queryKey: KEYs.getOrders(), //lưu ý cache key: thêm query params vào cache
        queryFn: fetchOrders 
    });
    console.log('<<=== 🚀 Orders ===>>',queryOrders.data);

    const queryClient = useQueryClient()
    /** ----| BEGIN DELETE ORDER |---- */
    const deleteOrder = async(id: string)=>{
        const response = await axiosClient.delete(`${env.API_URL}/v1/orders/${id}`);
        return response.data;
    }
    const mutationDelete = useMutation({
        mutationFn: deleteOrder,
        onSuccess: () => {
          // Làm tươi lại danh sách sản phẩm
          queryClient.invalidateQueries({ queryKey: KEYs.getOrders() });
          //Hiển thị message xóa thành công
          console.log('Xóa Order thành công!');
          messageApi.open({
            type: 'success',
            content: 'Xóa Order thành công!',
          });
        },
        onError: (err)=> {
          console.log('Xóa Order không thành công!', err);
          messageApi.open({
            type: 'error',
            content: 'Xóa Order không thành công!',
          });
          //Hiển thị message xóa thất bại
        }
      });


      /** ----| BEGIN edit ORDER |---- */
      const [formEdit] = Form.useForm();
      const [selectedId, setSelectedId] = useState<string>('');
      const [isModalEditOpen, setIsModalEditOpen] = useState(false);
      type FieldType = {
        order_name: string;
        price: number;
        model_year: number;
        description?: string;
        stock: number;
        category: string;
        brand_id: string;
        discount?: number;
        thumbnail?: string;
      };

      const updateOrder = async(formData: any)=>{
        //tách id ra khỏi payload
        const {id, ...payload} = formData;
        const response = await axiosClient.put(
            `${env.API_URL}/v1/orders/${id}`,
            payload,
        );
        return response.data;
    }
    const mutationUpdate = useMutation({
        mutationFn: updateOrder,
        onSuccess: () => {
          // Làm tươi lại danh sách sản phẩm
          queryClient.invalidateQueries({ queryKey: KEYs.getOrders() });
          queryClient.invalidateQueries({ queryKey: KEYs.getOrder(selectedId) });
          //Hiển thị message xóa thành công
          messageApi.open({
            type: 'success',
            content: 'Edit Order thành công!',
          });
          //ẩn modal
          setIsModalEditOpen(false);
          //clear data từ form
          formEdit.resetFields();
        },
        onError: (err)=> {
          console.log('Edit Order không thành công!', err);
          messageApi.open({
            type: 'error',
            content: 'Edit Order không thành công!',
          });
        }
      });

      
      const onFinishEdit: FormProps<FieldType>['onFinish'] = async(values) => {
        console.log('Success:', values);
        //gọi API để update
        await mutationUpdate.mutateAsync({
            id: selectedId,
            order_name: values.order_name,
            price: values.price,
            model_year: values.model_year,
            description: values.description,
            stock: values.stock,
            category: values.category,
            brand_id: values.brand_id,
            discount: values.discount,
            thumbnail: values.thumbnail
            
        });
      };
      
      const onFinishEditFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
       /** ----| END edit ORDER |---- */

      const fetchOrder = async ()=>{
            const response = await axiosClient.get(`${env.API_URL}/v1/orders/${selectedId}`);
            return response.data;
        }
        
        const queryOrder = useQuery({ 
            queryKey: KEYs.getOrder(selectedId), //lưu ý cache key: thêm query params vào cache
            queryFn: fetchOrder,
            enabled: selectedId !== '' && isModalEditOpen === true
        });
        console.log('queryOrder',queryOrder?.data?.data);
        //Sử dụng useEffect để đổ dữ liệu vào form khi fetch thông tin thành công
        useEffect(()=>{
           console.log('selectedId',selectedId);
           if(queryOrder.isSuccess && queryOrder.data){
            console.log('isSuccess');
               formEdit.setFieldsValue(queryOrder?.data?.data);
           }
        },[selectedId, formEdit, queryOrder?.data,queryOrder.isSuccess])



     /** ----| BEGIN COMLUMs Config |---- */
      const columns: TableProps<DataType>['columns'] = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            render: (text) => <span>{text}</span>,
          },
        {
          title: 'order_status',
          dataIndex: 'order_status',
          key: 'order_status',
     
        },
        {
            title: 'payment_type',
            dataIndex: 'payment_type',
            key: 'payment_type',
           
          },
        {
          title: 'order_date',
          dataIndex: 'order_date',
          key: 'order_date',
        },
        
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <Button onClick={()=>{
            console.log('edit', record._id);
            setSelectedId(record._id);
            setIsModalEditOpen(true);
              }} icon={<EditOutlined />} />
              <Popconfirm
                    title="Delete the order"
                    description="Are you sure to dielete this order?"
                    onConfirm={async()=>{
                        console.log('delete',record._id);
                        mutationDelete.mutate(record._id);
                        console.log('variables',mutationDelete.variables);
                    }}
                    okButtonProps={{ loading: mutationDelete.isPending }}
                    onCancel={()=>{
                        console.log('ko xoa');
                    }}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button  type="dashed" icon={<DeleteOutlined />} danger />
                </Popconfirm>
            </Space>
          ),
        },
      ];

  return (
    <>  
        {contextHolder}
        <title>Order Manager</title>
        <Card 
        variant="borderless" 
        title="Orders List" 
        extra={<Button onClick={()=>{
            console.log('Thêm mới sản phẩm');
        }} icon={<PlusOutlined />} type="primary">Thêm mới</Button>}
        >
        <Flex vertical gap="middle">
        <Table<DataType>
        rowKey="_id" 
        loading={queryOrders?.isLoading?? true}
        columns={columns} 
        dataSource={queryOrders?.data?.data.orders_list ?? []}
        pagination={false}
        />
        <Pagination
        align="end" 
        defaultCurrent={1} 
        total={queryOrders?.data?.data.pagination.totalRecords ?? 0}
        onChange={(page, pageSize)=>{
            console.log(page, pageSize);
            navigate(`/orders?page=${page}&limit=${pageSize}`)
        }}
        />
        </Flex>
        </Card>
        {/* MODAL EDIT  */}
        <Modal
        title="Edit Order"
        centered
        open={isModalEditOpen}
        onOk={() => {
            console.log('Update submit');
            formEdit.submit();
        }}
        onCancel={() => setIsModalEditOpen(false)}
      >
        <Form
            name="formEdit"
            form={formEdit}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{}}
            onFinish={onFinishEdit}
            onFinishFailed={onFinishEditFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
            label="Order Name"
            name="order_name"
            rules={[{ required: true, message: 'Please input your Order name!' }]}
            >
            <Input />
            </Form.Item>

            <Form.Item<FieldType>
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input your price!' }]}
            >
            <InputNumber  />
            </Form.Item>

            <Form.Item<FieldType>
            label="Discount"
            name="discount"
            >
            <InputNumber  />
            </Form.Item>
            
            <Form.Item<FieldType>
            label="Model year"
            name="model_year"
            rules={[{  required: true, message: 'Please input your model_year'}]}
            >
            <Input />
            </Form.Item>

          

            <Form.Item<FieldType>
            label="Thumbnail"
            name="thumbnail"
            >
            <Input />
            </Form.Item>
            <Form.Item<FieldType>
            label="description"
            name="description"
            >
            <Input.TextArea />
            </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
