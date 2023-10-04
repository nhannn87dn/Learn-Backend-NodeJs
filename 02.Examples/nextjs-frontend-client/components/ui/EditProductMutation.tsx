'use client'

import React, { useState,ChangeEvent } from 'react';
import { SubmitButton } from './SubmitButton';
import { updateProduct } from '@/actions/productAction';

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
    message: string;
    success: boolean;
}

const EditProductMutation = ({product}: {product: ProductType}) => {

  const [formState, setFormState] = useState<UpdateFormState>({
    name:  product.name,
    price: product.price,
    message: '',
    success: false
  });
   
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState: UpdateFormState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
    return <>
    <div>Edit product Mutation: {product.price}</div>
    <form action={async FormData => {
      const result =   await updateProduct(FormData);
      if(result){
        setFormState((prevState: UpdateFormState) => ({
          ...prevState,
          message: result.message,
          success: result.success
        }));
      }
    }}>

        {formState.message !== '' ? (
            <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">
              {formState.message}
            </span>
          </div>
        ): null}
        

          <input type="hidden" value={product.id} name='_id' />
          <input placeholder='Name'  className='border py-2 px-4 rounded' type="text" name="name" value={formState.name} onChange={handleInputChange} />
          <input placeholder='Price' className='border py-2 px-4 rounded' type="text" name="price" value={formState.price} onChange={handleInputChange} />
         <SubmitButton />
      </form>
    </>
}

export default EditProductMutation