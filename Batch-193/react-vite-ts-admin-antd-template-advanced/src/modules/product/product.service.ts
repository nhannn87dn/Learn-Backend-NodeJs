import type { ProductType } from "./product.type";

export const fetchCategories = async () => {
  const url = `https://api.escuelajs.co/api/v1/categories`;
  return fetch(url).then((res) => res.json());
};


//Hàm get Sản phẩm
export const fetchData = async (page: number, limit = 10) => {
  // const page = 1;
  const offset = (page - 1) * 10;
  const url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`;

  return fetch(url).then((res) => res.json());
};


export const fetchDelete = async (id: number) =>
      fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
        method: 'DELETE',
      }).then((response) => response.json());


export const updateData = async (formData: ProductType) => {
  const {id, ...payload} = formData;
  return fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json());
}

export const fetchCreate = async (formData: ProductType) => fetch(`https://api.escuelajs.co/api/v1/products`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
}).then((response) => response.json());