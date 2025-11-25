import type { FormProps } from "antd";
import { Form, Input, Modal, InputNumber, Select } from "antd";
import type { IProductDTO } from "../product.type";
import type { ICategory } from "../../categories/categories.type";
import { useEffect } from "react";

const { TextArea } = Input;

const ProductEdit = ({
  isModalOpen,
  handleOk,
  handleCancel,
  onEditProduct,
  product,
  categories,
  brands
}: {
  isModalOpen: boolean;
  // handleOk receives created product payload optionally
  handleOk?: (values?: IProductDTO) => void;
  handleCancel: () => void;
onEditProduct: (product: IProductDTO) => void;
categories: ICategory[];
brands: any[];
product: IProductDTO;
}) => {
  const [form] = Form.useForm<IProductDTO>();


  useEffect(() => {
    if (product) {
      // populate form with product values
      form.setFieldsValue({
        product_name: product.product_name ?? "",
        price: (product as IProductDTO).price ?? 0,
        discount: (product as IProductDTO).discount ?? 0,
        description: (product as IProductDTO).description ?? "",
        stock: (product as IProductDTO).stock ?? 0,
        modelYear: (product as IProductDTO).modelYear ?? new Date().getFullYear(),
        thumbnail: (product as IProductDTO).thumbnail ?? "",
        slug: (product as IProductDTO).slug ?? "",
        category: (product as IProductDTO).category ?? "",
        brand: (product as IProductDTO).brand ?? "",
      } as Partial<IProductDTO>);
    } else {
      form.resetFields();
    }
  }, [product, form]);

  const onFinish: FormProps<IProductDTO>["onFinish"] = async (values) => {
    console.log("Success:", values);

    //GỌI API ĐỂ THÊM SẢN PHẨM
    await onEditProduct(values);
    // bubble up values if parent needs them
    handleOk?.(values);
    form.resetFields();
  };

  const onFinishFailed: FormProps<IProductDTO>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };


  console.log('xxxx',categories);

  return (
    <Modal
      width={800}
      title="Edit Product"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      // submit the inner form when the modal OK is clicked
      onOk={() => form.submit()}
      onCancel={() => {
        form.resetFields();
        handleCancel();
      }}
      okText="Submit"
    >
      <Form<IProductDTO>
        form={form}
        layout="vertical"
        style={{ maxWidth: 700 }}
        initialValues={{
          product_name: product.product_name,
          price: product.price,
          discount: product.discount,
          description: product.description,
          stock: product.stock,
          modelYear: product.modelYear,
          thumbnail: product.thumbnail,
          slug: product.slug,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div style={{
            maxHeight: '60vh',
            overflowY: 'auto',
        }}>
            <Form.Item
          label="Product Name"
          name="product_name"
          rules={[{ required: true, message: "Please input product name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Slug"
          name="slug"
          rules={[{ required: true, message: "Please input slug" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
        {/* Thêm giúp tôi giá trị mặc định cho select */}
         <Select
          defaultValue={""}
            options={[
                { value: '', label: 'Select a category' },
                ...(categories?.map((c) => ({
                value: c._id,
                label: c.category_name,
                })) || [])
            ]}
            />
        </Form.Item>
        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: "Please select a brand" }]}
        >
         <Select
           defaultValue={""}   // giá trị mặc định
            options={[
                { value: '', label: 'Select a brand' },
                ...(brands?.map((c) => ({
                value: c._id,
                label: c.brand_name,
                })) || [])
            ]}
            />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input price" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item label="Discount (%)" name="discount">
          <InputNumber style={{ width: "100%" }} min={0} max={100} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Stock"
          name="stock"
          rules={[{ required: true, message: "Please input stock" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item
          label="Model Year"
          name="modelYear"
          rules={[{ required: true, message: "Please input model year" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={1900}
            max={new Date().getFullYear() + 1}
          />
        </Form.Item>

        <Form.Item
          label="Thumbnail URL"
          name="thumbnail"
        >
          <Input />
        </Form.Item>
        </div>

        
      </Form>
    </Modal>
  );
};

export default ProductEdit;
