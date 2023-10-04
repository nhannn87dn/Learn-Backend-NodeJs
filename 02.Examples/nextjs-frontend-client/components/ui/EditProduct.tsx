"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface ProductType {
  id: string;
  name: string;
  price: string;
  desc: string;
  createdAt: string;
  meterial: string;
  catId: string;
  slug: string;
}

interface UpdateFormState {
  name: string;
  price: string;
}

const EditProduct = ({ product }: { product: ProductType }) => {
  

  const [formState, setFormState] = useState<UpdateFormState>({
    name: product.name,
    price: product.price,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState: UpdateFormState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Thực hiện logic cập nhật dữ liệu ở đây
    console.log(
      `Cập nhật thông tin: Name - ${formState.name}, Price - ${formState.price}`
    );
    try {
      const response = await fetch(
        `https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products/${product.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        }
      );

      if (!response.ok) {
        throw new Error("Đã xảy ra lỗi khi cập nhật dữ liệu.");
      }
      //Làm tươi data theo tag key
     

      // Xử lý phản hồi thành công
      const updatedData = await response.json();
      console.log("Dữ liệu đã được cập nhật:", updatedData);
      // Reset form sau khi submit
      setFormState({
        name: "",
        price: "",
      });
    } catch (error: any) {
      console.error("Lỗi:", error.message);
    }
  };

  return (
    <>
      <div>Edit product:</div>
      <form onSubmit={handleSubmit}>
       
        <input
          placeholder="Name"
          className="border py-2 px-4 rounded"
          type="text"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
        />
        <input
          placeholder="Price"
          className="border py-2 px-4 rounded"
          type="text"
          name="price"
          value={formState.price}
          onChange={handleInputChange}
        />
        <button
          className="py-2 px-4 rounded bg-indigo-500 text-white"
          type="submit"
        >
          Cập nhật
        </button>
      </form>
    </>
  );
};

export default EditProduct;
