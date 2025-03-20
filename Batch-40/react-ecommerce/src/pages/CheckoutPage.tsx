import { useForm, SubmitHandler } from 'react-hook-form';
import { useShoppingCartStore } from '../stores/useShoppingCartStore';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { env } from '../constants/getEnvs';
import { useNavigate } from 'react-router';
import { useState } from 'react';

type FormValues = {
    first_name: string;
    last_name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipcode?: number;
  payment_type: number;
  order_note?: string
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [currentLayout, setCurrentLayout] = useState('formCheckout');
  const [error, setError] = useState<null | string>(null)
    //lấy items từ giỏ hàng
  const {cartItems, clearCart} = useShoppingCartStore();

  // Gọi API tạo đơn hàng
  const fetchSubmitOrder = async (payload: any)=>{
    const response = await axios.post(`${env.API_URL}/v1/orders`, payload);
    return response.data;
  }
  const mutationOrder = useMutation({
    mutationFn: fetchSubmitOrder,
    onSuccess: () => {
      //Todo: redirect when submit successfully
      setError(null);
      // Clear cart items
      clearCart();
      // redirect
      setCurrentLayout('layoutSuccess')
    },
    onError: (error) => {
      setCurrentLayout('formCheckout');
      setError('Error submitting order: '+ error?.response?.data.message);
      console.error('Error submitting order:', error);
    },
  })


  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async(data) => {
    // Handle form submission
    console.log('Customer Info:', data);
    // Send data to server...
    const orderPayload = {
        customer: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            street: data.street,
            city: data.city,
            state: data.state,
            zipcode: data.zipcode,
         
          },
          street: data.street,
            city: data.city,
            state: data.state,
            zipcode: data.zipcode,
            payment_type: data.payment_type,
            order_note: data.order_note,
            order_items: cartItems, // Lấy từ giỏ hàng
        };
        console.log('<<=== 🚀 orderPayload ===>>',orderPayload);

        //Gọi API để tạo đơn hàng
        await mutationOrder.mutateAsync(orderPayload);
      };

  if(currentLayout === 'layoutSuccess'){
    return (
    <div className='container mx-auto my-3 '>
        <div className="checkout_wrapper max-w-2xl bg-white p-4 mx-auto">
        <div className="success_wrapper">
          <h2>Your order has been placed successfully!</h2>
          <button onClick={()=>{
            navigate('/')
          }}>Continue Shopping</button>
        </div>
      </div>
      </div>
      )
  }
  if(currentLayout === 'layoutFailed'){
    return (
    <div className='container mx-auto my-3 '>
    <div className="checkout_wrapper max-w-2xl bg-white p-4 mx-auto">
       <h2>Your order has been placed failed!</h2>
       <button onClick={()=>{
            navigate('/checkout')
          }}>Continue Shopping</button>
    </div>
    </div>)
  }

  return (
    <div className='container mx-auto my-3 '>
      <div className="checkout_wrapper max-w-2xl bg-white p-4 mx-auto">
        <h1>Checkout Page</h1>
        {error && <div className="error px-3 py-2 bg-red-100 text-red-500 border border-red-500 my-3">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Firstname:</label>
            <input {...register('first_name', { required: true })} />
            {errors.first_name && <span>This field is required</span>}
          </div>
          <div>
            <label>last name:</label>
            <input {...register('last_name', { required: true })} />
            {errors.last_name && <span>This field is required</span>}
          </div>
          <div>
            <label>Email:</label>
            <input {...register('email', { required: true })} />
            {errors.email && <span>This field is required</span>}
          </div>
          <div>
            <label>Phone:</label>
            <input {...register('phone', { required: true })} />
            {errors.phone && <span>This field is required</span>}
          </div>
          <div>
            <label>Address:</label>
            <input {...register('street', { required: true })} />
            {errors.street && <span>This field is required</span>}
          </div>
          <div>
            <label>City:</label>
            <input {...register('city', { required: true })} />
            {errors.city && <span>This field is required</span>}
          </div>
          <div>
            <label>State:</label>
            <input {...register('state', { required: true })} />
            {errors.state && <span>This field is required</span>}
          </div>
          <div>
            <label>Zip Code:</label>
            <input {...register('zipcode', { required: false })} />
          </div>
          <div>
            <h3 className='font-bold text-lg'>Payment Method:</h3>
            <label>
              <input type="radio" {...register('payment_type', { required: true })} value="1" />
              COD
            </label>
            <label>
              <input type="radio" {...register('payment_type', { required: true })} value="2" />
              Credit
            </label>
            <label>
              <input type="radio" {...register('payment_type', { required: true })} value="3" />
              Bank Transfer
            </label>
            <label>
              <input type="radio" {...register('payment_type', { required: true })} value="4" />
              Cash
            </label>
          </div>
          <div>
            <label>Order note:</label>
            <textarea {...register('order_note', { required: false })} />
          </div>
          <button disabled={mutationOrder.isPending} type="submit">{mutationOrder.isPending ? 'Submitting....': 'Submit'}</button>
        </form>
      </div>
    </div>
  );
}
