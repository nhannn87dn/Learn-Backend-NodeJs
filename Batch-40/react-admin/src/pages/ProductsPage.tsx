import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Flex, Form, Input, InputNumber, message, Modal, Pagination, Popconfirm, Select, Space, Table } from "antd";
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
    product_name: string;
    price: number;
    stock: number;
    model_year: number;
    category: {
        category_name: string
    }
  }

export default function ProductsPage() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    //get page và  limit
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    
    console.log(page, limit);
    
    const KEYs = {
        getProducts: ()=>{
            return ['products', page, limit]
        },
        getProduct: (id: string)=>{
            return ['product', id]
        }
    }
    /** ----| BEGIN GET PRODUCTS |---- */
    const fetchProducts = async ()=>{
        const response = await axiosClient.get(`${env.API_URL}/v1/products?page=${page}&limit=${limit}`);
        return response.data;
    }
    
    const queryProducts = useQuery({ 
        queryKey: KEYs.getProducts(), //lưu ý cache key: thêm query params vào cache
        queryFn: fetchProducts 
    });
    console.log('<<=== 🚀 Products ===>>',queryProducts.data);

    const queryClient = useQueryClient()
    /** ----| BEGIN DELETE PRODUCT |---- */
    const deleteProduct = async(id: string)=>{
        const response = await axiosClient.delete(`${env.API_URL}/v1/products/${id}`);
        return response.data;
    }
    const mutationDelete = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
          // Làm tươi lại danh sách sản phẩm
          queryClient.invalidateQueries({ queryKey: KEYs.getProducts() });
          //Hiển thị message xóa thành công
          console.log('Xóa Product thành công!');
          messageApi.open({
            type: 'success',
            content: 'Xóa Product thành công!',
          });
        },
        onError: (err)=> {
          console.log('Xóa Product không thành công!', err);
          messageApi.open({
            type: 'error',
            content: 'Xóa Product không thành công!',
          });
          //Hiển thị message xóa thất bại
        }
      });


      /** ----| BEGIN edit PRODUCT |---- */
      const [formEdit] = Form.useForm();
      const [selectedId, setSelectedId] = useState<string>('');
      const [isModalEditOpen, setIsModalEditOpen] = useState(false);
      type FieldType = {
        product_name: string;
        price: number;
        model_year: number;
        description?: string;
        stock: number;
        category: string;
        brand_id: string;
        discount?: number;
        thumbnail?: string;
      };

      const updateProduct = async(formData: any)=>{
        //tách id ra khỏi payload
        const {id, ...payload} = formData;
        const response = await axiosClient.put(
            `${env.API_URL}/v1/products/${id}`,
            payload,
        );
        return response.data;
    }
    const mutationUpdate = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
          // Làm tươi lại danh sách sản phẩm
          queryClient.invalidateQueries({ queryKey: KEYs.getProducts() });
          queryClient.invalidateQueries({ queryKey: KEYs.getProduct(selectedId) });
          //Hiển thị message xóa thành công
          messageApi.open({
            type: 'success',
            content: 'Edit Product thành công!',
          });
          //ẩn modal
          setIsModalEditOpen(false);
          //clear data từ form
          formEdit.resetFields();
        },
        onError: (err)=> {
          console.log('Edit Product không thành công!', err);
          messageApi.open({
            type: 'error',
            content: 'Edit Product không thành công!',
          });
        }
      });

      
      const onFinishEdit: FormProps<FieldType>['onFinish'] = async(values) => {
        console.log('Success:', values);
        //gọi API để update
        await mutationUpdate.mutateAsync({
            id: selectedId,
            product_name: values.product_name,
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
       /** ----| END edit PRODUCT |---- */

      const fetchProduct = async ()=>{
            const response = await axiosClient.get(`${env.API_URL}/v1/products/${selectedId}`);
            return response.data;
        }
        
        const queryProduct = useQuery({ 
            queryKey: KEYs.getProduct(selectedId), //lưu ý cache key: thêm query params vào cache
            queryFn: fetchProduct,
            enabled: selectedId !== '' && isModalEditOpen === true
        });
        console.log('queryProduct',queryProduct?.data?.data);
        //Sử dụng useEffect để đổ dữ liệu vào form khi fetch thông tin thành công
        useEffect(()=>{
           console.log('selectedId',selectedId);
           if(queryProduct.isSuccess && queryProduct.data){
            console.log('isSuccess');
               formEdit.setFieldsValue(queryProduct?.data?.data);
           }
        },[selectedId, formEdit, queryProduct?.data,queryProduct.isSuccess])


        /** ----| BEGIN GET Categories |---- */
        const fetchCategories = async ()=>{
            const response = await axiosClient.get(`${env.API_URL}/v1/categories`);
            return response.data;
        }
        
        const queryCategories = useQuery({ 
            queryKey: ['categories'], //lưu ý cache key: thêm query params vào cache
            queryFn: fetchCategories 
        });

        const onChangeCategory = (value: string) => {
            console.log(`selected ${value}`);
          };
          
          const onSearchCategory = (value: string) => {
            console.log('search:', value);
          };


          /** ----| BEGIN GET brands |---- */
        const fetchBrands = async ()=>{
            const response = await axiosClient.get(`${env.API_URL}/v1/brands`);
            return response.data;
        }
        
        const queryBrands = useQuery({ 
            queryKey: ['brands'], //lưu ý cache key: thêm query params vào cache
            queryFn: fetchBrands 
        });

        const onChangeBrand = (value: string) => {
            console.log(`selected ${value}`);
          };
          
          const onSearchBrand = (value: string) => {
            console.log('search:', value);
          };


     /** ----| BEGIN COMLUMs Config |---- */
      const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Thumb',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (text) => <Avatar shape="square" src={text} />,
          },
        {
          title: 'Name',
          dataIndex: 'product_name',
          key: 'product_name',
     
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (_, record) => (
              <span>{record.category.category_name}</span>
            ),
          },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Model year',
          dataIndex: 'model_year',
          key: 'model_year',
        },
        {
          title: 'Stock',
          key: 'stock',
          dataIndex: 'stock',
          
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
                    title="Delete the product"
                    description="Are you sure to dielete this product?"
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
        <title>Product Manager</title>
        <Card 
        variant="borderless" 
        title="Products List" 
        extra={<Button onClick={()=>{
            console.log('Thêm mới sản phẩm');
        }} icon={<PlusOutlined />} type="primary">Thêm mới</Button>}
        >
        <Flex vertical gap="middle">
        <Table<DataType>
        rowKey="_id" 
        loading={queryProducts?.isLoading?? true}
        columns={columns} 
        dataSource={queryProducts?.data?.data.products ?? []}
        pagination={false}
        />
        <Pagination
        align="end" 
        defaultCurrent={1} 
        total={queryProducts?.data?.data.pagination.totalRecord ?? 0}
        onChange={(page, pageSize)=>{
            console.log(page, pageSize);
            navigate(`/products?page=${page}&limit=${pageSize}`)
        }}
        />
        </Flex>
        </Card>
        {/* MODAL EDIT  */}
        <Modal
        title="Edit Product"
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
            label="Product Name"
            name="product_name"
            rules={[{ required: true, message: 'Please input your Product name!' }]}
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
            label="Category"
            name="category"
            rules={[{  required: true, message: 'Please input your category'}]}
            >
            <Select
                showSearch
                placeholder="Select a Category"
                optionFilterProp="label"
                onChange={onChangeCategory}
                onSearch={onSearchCategory}
                options={[
                    { value: "", label: "All Categories" },
                    ...(queryCategories.data
                      ? queryCategories.data.data.categories.map((c) => ({
                          value: c._id,
                          label: c.category_name,
                        }))
                      : []),
                  ]}
            />
            </Form.Item>

            <Form.Item<FieldType>
            label="Brand"
            name="brand_id"
            rules={[{  required: true, message: 'Please input your brand'}]}
            >
            <Select
                showSearch
                placeholder="Select a Brand"
                optionFilterProp="label"
                onChange={onChangeBrand}
                onSearch={onSearchBrand}
                options={[
                    { value: "", label: "All brans" },
                    ...(queryBrands.data
                      ? queryBrands.data.data.map((c) => ({
                          value: c._id,
                          label: c.brand_name,
                        }))
                      : []),
                  ]}
            />
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
