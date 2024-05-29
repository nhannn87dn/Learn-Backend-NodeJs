
import {Form,Checkbox, Input,InputNumber, type FormProps, Select,Button,message, Row, Col, Upload} from 'antd'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../library/axiosClient";
import { useNavigate } from "react-router-dom";
import globalConfig from "../../constants/config";
import { UploadOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


interface DataType {
    _id?: string;
    productName: string;
    category: string,
    brandId: string,
    price: number;
    sort: number;
    isActive: boolean,
    description?: string,
    discount: number,
    stock: number,
    modelYear: number,
    thumbnail?: string,
    slug: string,
    isHome?: boolean;
    file?: UploadFile
  }
  
const ProductAddPage = () => {
  const [file, setFile] = useState<UploadFile | null>(null);
  console.log('<<=== 🚀 file ===>>',file);
    const [messageApi, contextHolder] = message.useMessage();
    //const {user} = useAuth()

    // React.useEffect(()=>{
    //   if(user?.role != 'user'){
    //     messageApi.open({
    //       type: "success",
    //       content: "Ban khong co quyen Them moi",
    //     });
    //   }

    // },[user])
    
    const navigate = useNavigate();
    
    const [createForm] = Form.useForm();
   

    const getCategories = async () => {
        return axiosClient.get(`/v1/categories`)
      };
      //Lấy danh sách về
    const queryCategory = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const getBrands = async () => {
        return axiosClient.get(`/v1/brands`)
      };
      //Lấy danh sách về
    const queryBrand = useQuery({
        queryKey: ["brands"],
        queryFn: getBrands,
    });
    
    
    const queryClient = useQueryClient();
    const fetchCreate = async (formData: DataType) => {
        return axiosClient.post(`/v1/products`, formData);
      };
    
      const mutationCreate = useMutation({
        mutationFn: fetchCreate,
        onSuccess: () => {
          console.log("Create success !");
          messageApi.open({
            type: "success",
            content: "Create success !",
          });
          // Làm tươi lại danh sách danh mục dựa trên key đã định nghĩa
          queryClient.invalidateQueries({
            queryKey: ["products"],
          });
          //
          createForm.resetFields();
        },
        onError: (error) => {
          //khi gọi API bị lỗi
          messageApi.open({
            type: "error",
            content: "Create error !",
          });
        },
      });

    
    const onFinishCreate = (values: DataType) => {
       console.log('<<=== 🚀 onFinishCreate  ===>>',values);
      const formData = new FormData();

        // Thêm các giá trị từ form vào formData
        Object.keys(values).forEach(key => {
          formData.append(key, values[key]);
        });

        // Thêm file vào formData
        if (file) {
          formData.append('file', file);
        }

        // Gọi mutation để gửi dữ liệu
        mutationCreate.mutate(formData);
      };
      
      const onFinishCreateFailed: FormProps<DataType>["onFinishFailed"] = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


    
    
    
  
  return (
    <div>
        {contextHolder}
        <h1>ProductAddPage</h1>
        <Button type='primary' onClick={()=>{
            navigate('/products')
        }}>Products List</Button>
        <Form
          form={createForm}
          name="edit-form"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ 
            price: 0,
            discount: 0,
            sort: 50,
            stock: 100,
            isHome: false,
            thumbnail: '',
            isActive: true 
          }}
          onFinish={onFinishCreate}
          onFinishFailed={onFinishCreateFailed}
          autoComplete="off"
        >
          <Form.Item<DataType>
            label="Product Name"
            name="productName"
            rules={[
              { required: true, message: "Please input product Name!" },
              { min: 4, message: "Tối thiểu 4 kí tự" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<DataType>
            label="URL SEO"
            name="slug"
            rules={[
              { required: true, message: "Please input product slug!" },
              { min: 4, message: "Tối thiểu 4 kí tự" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<DataType>
            label="Category"
            name="category"
            rules={[
              { required: true, message: "Please input product Category!" },
            ]}
          >
           <Select
            style={{ width: 120 }}
            onChange={()=>{
            }}
            options={
                queryCategory.data &&
                queryCategory.data.data.data.categories.map((c) => {
                  return {
                    value: c._id,
                    label: c.categoryName,
                  };
                })
            }
            />
          </Form.Item>


          <Form.Item<DataType>
            label="Brand"
            name="brandId"
            rules={[
              { required: true, message: "Please input product Brand!" },
            ]}
          >
           <Select
            style={{ width: 120 }}
            onChange={()=>{
            }}
            options={
                queryBrand.data &&
                queryBrand.data.data.data.brands.map((c) => {
                  return {
                    value: c._id,
                    label: c.brandName,
                  };
                })
            }
            />
          </Form.Item>
          

          <Form.Item<DataType>
            hasFeedback
            label="Price"
            name="price"
            rules={[
              { required: false, message: "Please Price" },
              {
                type: "number",
                min: 0,
                message: "Tối thiểu phải là 0",
              },
            ]}
          >
            <InputNumber min={0} defaultValue={0} />
          </Form.Item>

          <Form.Item<DataType>
            hasFeedback
            label="Discount"
            name="discount"
            rules={[
              { required: false, message: "Please discount" },
              {
                type: "number",
                min: 0,
                message: "Tối thiểu phải là 0",
              },
            ]}
          >
            <InputNumber min={0} defaultValue={0} />
          </Form.Item>

          <Form.Item<DataType>
            hasFeedback
            label="Stock"
            name="stock"
            rules={[
              { required: false, message: "Please Stock" },
              {
                type: "number",
                min: 0,
                message: "Tối thiểu phải là 0",
              },
            ]}
          >
            <InputNumber min={0} defaultValue={0} />
          </Form.Item>

          <Form.Item<DataType>
            label="Description"
            name="description"
            rules={[{ max: 500, message: "Tối đa 500 kí tự" }]}
          >
             <Input.TextArea />
          </Form.Item>

          <Form.Item<DataType>
            hasFeedback
            label="Sort"
            name="sort"
            rules={[
              { required: false, message: "Please sort" },
              {
                type: "number",
                min: 1,
                message: "Tối thiểu phải là 1",
              },
            ]}
          >
            <InputNumber min={0} defaultValue={50} />
          </Form.Item>

          <Form.Item<DataType>
            label="Thumbnail"
            name="thumbnail"
          >
            <Input />
          </Form.Item>
          <Row style={{margin: "20px 0"}}>
          <Col offset={4}>
            
            <Upload
              onRemove = {
                () => {
                  setFile(null);
                }
              }
              beforeUpload= {
                (file) => {
                  setFile(file);
                  return false;
                }
              }
             
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Col>
        </Row>

          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
         
          <Form.Item name="isHome" valuePropName="checked" >
              <Checkbox>is Home</Checkbox>
            </Form.Item>
      
         
            <Form.Item name="isActive" valuePropName="checked">
              <Checkbox checked={true} defaultChecked={true}>Enable</Checkbox>
            </Form.Item>
          <Button 
          type="primary" 
          htmlType="submit"
          loading={mutationCreate.isPending}
          >
            Submit
          </Button>
         
         
        
        </Form.Item>
        </Form>
    </div>
  )
}

export default ProductAddPage