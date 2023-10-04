'use server'

import { revalidateTag } from 'next/cache';

export async function updateProduct(formData: FormData) {
     
  console.log('formData',formData);

  try {
     const payload = {
      name: formData.get('name'),
      price: formData.get('price')
     }
     const id = formData.get('_id');
      const response = await fetch(`https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }).then(res => res.json());
    
    console.log(response);
    //làm tươi lại dữ liệu
    revalidateTag('products-all');

    return {data: response, success: true, message: 'Update Success', error: null}

  } catch (error) {
    console.log(error);
    return {data: null, success: false, message: 'Update Fails', error: error}
  }

  
}
  
