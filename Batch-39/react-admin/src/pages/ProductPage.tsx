import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  Pagination,
  Button,
  Space,
  message,
  Popconfirm,
  Flex,
  Modal,
  Form,
  Input,
  Select,
  Checkbox,
  Upload,
} from "antd";
import { axiosClient } from "../lib/axiosClient";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from 'react';
import type {PopconfirmProps, GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const ProductPage = () => {

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [params] = useSearchParams();

  const page_str = params.get("page");
  const page = page_str ? page_str : 1;

  const category_str = params.get("category");
  const category_id = category_str ? category_str : null;

  const fetchProduct = async () => {
    const limit = 10;
    let url = `http://localhost:8080/api/v1/products?`;

    if (category_id) {
      url += `category=${category_id}&`;
    }

    url += `page=${page}&limit=${limit}`;

    const res = await axiosClient.get(url);
    return res.data.data;
  };

  const getProduct = useQuery({
    queryKey: ["products", page, category_id],
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

  /* ============= GET CATEGORIES, BRANDS ================ */
  const fetchCategories = async () => {
    const url = `http://localhost:8080/api/v1/categories`;
    const res = await axiosClient.get(url);
    return res.data.data;
  };

  const queryCategories = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const fetchBrands = async () => {
    const url = `http://localhost:8080/api/v1/brands`;
    const res = await axiosClient.get(url);
    return res.data.data;
  };

  const queryBrands = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  /* ============= THEM MOI ================ */
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [formCreate] = Form.useForm();

  const fetchCreateProduct = async (payload: any) => {
    const url = `http://localhost:8080/api/v1/products`;
    const res = await axiosClient.post(url, payload);
    return res.data;
  };


  const createMutationProduct = useMutation({
    mutationFn: fetchCreateProduct,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["products", page],
      });
      //Hiển thị một message thông báo là xóa thành công
      messageApi.open({
        type: "success",
        content: "Thêm mưới sản phẩm thành công",
      });
      //Đóng modal
      setIsModalAddOpen(false);
      //clear data từ form
      formCreate.resetFields();
    },
    onError: (error) => {
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Thêm mới lỗi",
      });
    },
  });

  const showModalAdd = () => {
    setIsModalAddOpen(true);
  };

  const handleOkAdd = () => {
    //Submit oK Model
    console.log("oK Model");
    formCreate.submit();
  };

  const handleCancelAdd = () => {
    setIsModalAddOpen(false);
  };
  // Submit Form Create
  const onFinishAdd = async (values) => {

    if (fileList.length === 0) {
      message.error('Vui lòng chọn file trước khi tải lên.');
      return;
    }

    const formData = new FormData();
    // Lặp qua tất cả các trường trong values và thêm chúng vào formData
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    fileList.forEach((file) => {
      formData.append('file', file as FileType);
    });

    console.log(formData)
    //gọi API để tạo mới sản phẩm
    createMutationProduct.mutate(formData);

  //   try {
  //     const response = await fetch('http://localhost:8080/api/v1/products', {
  //         method: 'POST',
  //         body: formData,
  //     });
      
  //     if (response.ok) {
  //         message.success('Tạo sản phẩm thành công.');
  //     } else {
  //     message.error('Đã có lỗi xảy ra.');
  //   }
  // } catch (error) {
  //   message.error('Tạo sản phẩm thất bại.');
  // } finally {
  //   setUploading(false);
  // }
    
    
  };
  const onFinishFailedAdd = async (errorInfo) => {
    console.log("errorInfo:", errorInfo);
  };

  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([file]);  // Chỉ chọn một file, nếu cần nhiều file thì sử dụng `setFileList([...fileList, file])`
      return false;  // Tắt upload tự động
    },
    fileList,
  };

  //=========== UPDATE ===============//
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [formUpdate] = Form.useForm();

  const fetchUpdateProduct = async (payload: any) => {
    const { id, ...params } = payload;
    const url = `http://localhost:8080/api/v1/products/${id}`;
    const res = await axiosClient.put(url, params);
    return res.data;
  };

  const updateMutationProduct = useMutation({
    mutationFn: fetchUpdateProduct,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["products", page],
      });
      //Hiển thị một message thông báo là xóa thành công
      messageApi.open({
        type: "success",
        content: "Cập nhật sản phẩm thành công",
      });
      //Đóng modal
      setIsModalEditOpen(false);
      //clear data từ form
      formUpdate.resetFields();
    },
    onError: (error) => {
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Cập nhật lỗi",
      });
    },
  });

  const handleOkEdit = () => {
    //Submit oK Model
    console.log("oK Model");
    formUpdate.submit();
  };

  // Submit Form updatye
  const onFinishEdit = async (values) => {
    console.log("Success:", values);
    //gọi API để cập nhật sản phẩm
    updateMutationProduct.mutate(values);
  };
  const onFinishFailedEdit = async (errorInfo) => {
    console.log("errorInfo:", errorInfo);
  };

  //=== SEARCH FORM ========== //
  const [formSearch] = Form.useForm();
  // Submit Form updatye
  const onFinishSearch = async (values) => {
    console.log("Success:", values);
    //cập nhật lại url
    if (values.category != "") {
      navigate(`/products?category=${values.category}`);
    } else {
      navigate(`/products`);
    }
  };
  const onFinishFailedSearch = async (errorInfo) => {
    console.log("errorInfo:", errorInfo);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (_, record) => {
        return <span>{record.category.category_name}</span>;
      },
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
            <Button
              onClick={() => {
                setIsModalEditOpen(true);
                //Lấy thông tin của record (sản phẩm) đổ vào form
                console.log("<<=== 🚀 record edit ===>>", record);
                //Biến đổi lại thuộc tính category thành: key: value
                const category = { ...record, category: record.category._id };
                formUpdate.setFieldsValue(category);
              }}
              type="dashed"
            >
              Edit
            </Button>
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
      <Flex justify="space-between" align="center">
        <h1>product List</h1>
        <Button onClick={showModalAdd} type="primary">
          <PlusOutlined /> Thêm mới
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
          <Form.Item label="Category" name="category">
            <Select
              options={[
                { value: "", label: "All Categories" },
                ...(queryCategories.data
                  ? queryCategories.data.map((c) => ({
                      value: c._id,
                      label: c.category_name,
                    }))
                  : []),
              ]}
            />
          </Form.Item>

          <Form.Item label="Brand" name="brandId">
            <Select options={[{ value: "", label: "All Brand" }]} />
          </Form.Item>

          <Form.Item label="Keyword" name="keyword">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Table
        pagination={false}
        dataSource={getProduct?.data?.products_list || []}
        columns={columns}
        loading={getProduct.isLoading}
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
      {/* =================== MODEL THEM MOI ====================== */}
      <Modal
        title="Thêm mới sản phẩm"
        open={isModalAddOpen}
        onOk={handleOkAdd}
        okText={"Thêm mới"}
        onCancel={handleCancelAdd}
        width={960}
      >
        <Form
          form={formCreate}
          name="form-create"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 960 }}
          initialValues={{ remember: true }}
          onFinish={onFinishAdd}
          onFinishFailed={onFinishFailedAdd}
          autoComplete="off"
        >
          <Form.Item
            label="Product Name"
            name="product_name"
            rules={[{ required: true, message: "Please input Product Name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Category ID"
            name="category"
            rules={[{ required: true, message: "Please input Category Id" }]}
          >
            <Select
              options={
                queryCategories.data &&
                queryCategories.data.map((c) => {
                  return {
                    value: c._id,
                    label: c.category_name,
                  };
                })
              }
            />
          </Form.Item>

          <Form.Item
            label="brand ID"
            name="brandId"
            rules={[{ required: true, message: "Please input brand ID" }]}
          >
            <Select
              options={
                queryBrands.data &&
                queryBrands.data.map((c) => {
                  return {
                    value: c._id,
                    label: c.brand_name,
                  };
                })
              }
            />
          </Form.Item>

          <Form.Item label="Price" name="price">
            <Input />
          </Form.Item>

          <Form.Item label="Discount" name="discount">
            <Input />
          </Form.Item>

          <Form.Item label="Model year" name="model_year">
            <Input />
          </Form.Item>

          <Form.Item label="Stock" name="stock">
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>

          

          <Form.Item label="Thumbnail">
          <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>

          

          <Form.Item
            name="isBest"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Is Best</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
      {/* =================== MODEL UPDATE ====================== */}
      <Modal
        title="Cập nhật sản phẩm"
        open={isModalEditOpen}
        onOk={handleOkEdit}
        onCancel={() => {
          setIsModalEditOpen(false);
        }}
        width={960}
      >
        <Form
          form={formUpdate}
          name="form-update"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 960 }}
          initialValues={{ remember: true }}
          onFinish={onFinishEdit}
          onFinishFailed={onFinishFailedEdit}
          autoComplete="off"
        >
          <Form.Item
            label="Product Id"
            name="id"
            hidden={true}
            rules={[{ required: true, message: "Please input Product Id!" }]}
          >
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            label="Product Name"
            name="product_name"
            rules={[{ required: true, message: "Please input Product Name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Category ID"
            name="category"
            rules={[{ required: true, message: "Please input Category Id" }]}
          >
            <Select
              options={
                queryCategories.data &&
                queryCategories.data.map((c) => {
                  return {
                    value: c._id,
                    label: c.category_name,
                  };
                })
              }
            />
          </Form.Item>

          <Form.Item
            label="brand ID"
            name="brandId"
            rules={[{ required: true, message: "Please input brand ID" }]}
          >
            <Select
              options={
                queryBrands.data &&
                queryBrands.data.map((c) => {
                  return {
                    value: c._id,
                    label: c.brand_name,
                  };
                })
              }
            />
          </Form.Item>

          <Form.Item label="Price" name="price">
            <Input />
          </Form.Item>

          <Form.Item label="Discount" name="discount">
            <Input />
          </Form.Item>

          <Form.Item label="Model year" name="model_year">
            <Input />
          </Form.Item>

          <Form.Item label="Stock" name="stock">
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Thumbnail" name="thumbnail">
            <Input />
          </Form.Item>

          
        <Form.Item label="Upload" name="upload">
        <Upload 
            action= {`http://localhost:8080/api/v1/upload/single-handle`} 
            listType="picture"
            onChange={(file)=>{
              console.log(file,file.file.status);
              /** Upload thành công thì cập nhật lại giá trị input thumbnail */
              if(file.file.status === 'done'){
                formUpdate.setFieldValue('thumbnail',file.file.response.data.link)
              }
            }}
            onRemove={(file)=>{
              console.log(file);
              /** Khi xóa hình thì clear giá trị khỏi input */
              formUpdate.setFieldValue('thumbnail',null);
              /** Đồng thời gọi API xóa link hình trên server, dựa vào đường dẫn */
            }}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="isBest"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Is Best</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductPage;
