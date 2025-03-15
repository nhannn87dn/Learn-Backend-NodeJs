import { useForm, SubmitHandler } from 'react-hook-form';
import { useShoppingCartStore } from '../stores/useShoppingCartStore';

type FormValues = {
    first_name: string;
    last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipcode?: number;
  payment_type: number;
  order_note?: string
};

export default function CheckoutPage() {

    //lấy items từ giỏ hàng
    const {cartItems} = useShoppingCartStore();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => {
    // Handle form submission
    console.log('Customer Info:', data);
    // Send data to server...
    const orderPayload = {
        customer: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            state: data.state,
            zipcode: data.zipcode,
         
          },
          address: data.address,
            city: data.city,
            state: data.state,
            zipcode: data.zipcode,
            payment_type: data.payment_type,
            order_note: data.order_note,
            order_items: cartItems, // Lấy từ giỏ hàng
        };
        console.log('<<=== 🚀 orderPayload ===>>',orderPayload);

        //Gọi API để tạo đơn hàng
        //Nếu thành công--> chuyển sang trang Thông báo trạng thái
        //thành công hoặc thất bại.

        //Nếu thành công ==> clear hết giỏ hàng đi.
      };



  return (
    <div className='container mx-auto my-3 '>
      <div className="checkout_wrapper max-w-2xl bg-white p-4 mx-auto">
        <h1>Checkout Page</h1>
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
            <input {...register('address', { required: true })} />
            {errors.address && <span>This field is required</span>}
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
