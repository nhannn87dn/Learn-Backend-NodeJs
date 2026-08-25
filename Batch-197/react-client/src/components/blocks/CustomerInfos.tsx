import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ENV } from '@/config/env';
import { useShoppingCartStore } from '@/stores/shopping-cart-store';

const objectIdPattern = /^[0-9a-fA-F]{24}$/;
const paymentMethods = ['cod', 'bank_transfer', 'cash', 'credit_card', 'paypal'] as const;

const checkoutSchema = z.object({
  customerMode: z.enum(['guest', 'authenticated']),
  customerId: z.string(),
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  email: z.string().trim(),
  phone: z.string().trim(),
  street: z.string().trim(),
  city: z.string().trim(),
  state: z.string().trim(),
  shippingFee: z.coerce.number().min(0),
  discount: z.coerce.number().min(0),
  paymentMethod: z.enum(paymentMethods),
}).superRefine((data, context) => {
  if (data.customerMode === 'authenticated') {
    if (!objectIdPattern.test(data.customerId)) {
      context.addIssue({ code: 'custom', path: ['customerId'], message: 'Customer ID không hợp lệ' });
    }
    return;
  }

  const requiredFields = [
    ['firstName', 'Vui lòng nhập tên'],
    ['lastName', 'Vui lòng nhập họ'],
    ['email', 'Vui lòng nhập email'],
    ['phone', 'Vui lòng nhập số điện thoại'],
    ['street', 'Vui lòng nhập địa chỉ'],
    ['city', 'Vui lòng nhập thành phố'],
    ['state', 'Vui lòng nhập tỉnh/thành'],
  ] as const;

  requiredFields.forEach(([field, message]) => {
    if (!data[field]) context.addIssue({ code: 'custom', path: [field], message });
  });
  if (data.email && !z.string().email().safeParse(data.email).success) {
    context.addIssue({ code: 'custom', path: ['email'], message: 'Email không hợp lệ' });
  }
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;
type CheckoutFormInput = z.input<typeof checkoutSchema>;

const defaultValues: CheckoutFormData = {
  customerMode: 'guest',
  customerId: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  shippingFee: 0,
  discount: 0,
  paymentMethod: 'cod',
};

type FieldName = keyof CheckoutFormData;

type CustomerInfosProps = {
  onOrderSuccess: () => void;
};

const CustomerInfos = ({ onOrderSuccess }: CustomerInfosProps) => {
  const { items, clearCart } = useShoppingCartStore();
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, reset } = useForm<CheckoutFormInput, unknown, CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues,
  });
  const customerMode = watch('customerMode');

  const onSubmit = async (data: CheckoutFormData) => {
    setMessage('');
    setIsSuccess(false);
    const payload = {
      ...(data.customerMode === 'authenticated'
        ? { customerId: data.customerId }
        : { customer: { firstName: data.firstName, lastName: data.lastName, email: data.email, phone: data.phone, street: data.street, city: data.city, state: data.state } }),
      items: items.map((item) => ({ productId: item.id, product_name: item.name, price: item.price, quantity: item.quantity, subtotal: item.price * item.quantity })),
      shippingAddress: { firstName: data.firstName, lastName: data.lastName, phone: data.phone, street: data.street, city: data.city, state: data.state },
      shippingFee: data.shippingFee,
      discount: data.discount,
      paymentMethod: data.paymentMethod,
    };

    try {
      await axios.post(`${ENV.API_URL}/v1/orders`, payload);
      setMessage('Đặt hàng thành công. Cảm ơn bạn đã mua hàng.');
      setIsSuccess(true);
      onOrderSuccess();
      clearCart();
      reset(defaultValues);
    } catch (error) {
      setMessage(axios.isAxiosError(error) ? error.response?.data?.message || 'Không thể tạo đơn hàng' : 'Không thể tạo đơn hàng');
    }
  };

  const inputClass = 'w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-600';
  const renderError = (field: FieldName) => errors[field] && <p className="mt-1 text-xs text-red-600">{errors[field]?.message as string}</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Thông tin đặt hàng</h2>
        <p className="mt-1 text-sm text-slate-500">Bạn có thể đặt hàng mà không cần đăng nhập.</p>
      </div>

      <fieldset className="space-y-3">
        <legend className="mb-2 font-semibold">Loại khách hàng</legend>
        <label className="flex items-center gap-2 text-sm"><input type="radio" value="guest" {...register('customerMode')} /> Khách vãng lai</label>
        <label className="flex items-center gap-2 text-sm"><input type="radio" value="authenticated" {...register('customerMode')} /> Khách hàng đã đăng nhập</label>
      </fieldset>

      {customerMode === 'authenticated' ? (
        <div>
          <label className="mb-1 block text-sm font-medium">Customer ID</label>
          <input className={inputClass} placeholder="Nhập MongoDB customer ID" {...register('customerId')} />
          {renderError('customerId')}
        </div>
      ) : (
        <section className="space-y-3">
          <h3 className="font-semibold">Thông tin khách hàng</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {([['firstName', 'Tên'], ['lastName', 'Họ'], ['email', 'Email'], ['phone', 'Số điện thoại'], ['street', 'Địa chỉ'], ['city', 'Thành phố'], ['state', 'Tỉnh/thành']] as const).map(([field, label]) => (
              <div key={field} className={field === 'street' ? 'sm:col-span-2' : ''}>
                <label className="mb-1 block text-sm font-medium">{label}</label>
                <input className={inputClass} type={field === 'email' ? 'email' : 'text'} {...register(field)} />
                {renderError(field)}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <h3 className="font-semibold">Thanh toán</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div><label className="mb-1 block text-sm font-medium">Phí vận chuyển</label><input className={inputClass} type="number" min="0" {...register('shippingFee')} /></div>
          <div><label className="mb-1 block text-sm font-medium">Giảm giá</label><input className={inputClass} type="number" min="0" {...register('discount')} /></div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Phương thức thanh toán</p>
          {paymentMethods.map((method) => <label key={method} className="flex items-center gap-2 text-sm"><input type="radio" value={method} {...register('paymentMethod')} /> {method}</label>)}
        </div>
      </section>

      {message && <p className={isSuccess ? 'text-sm text-green-700' : 'text-sm text-red-600'}>{message}</p>}
      <button type="submit" disabled={isSubmitting} className="w-full rounded-md bg-slate-900 px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
        {isSubmitting ? 'Đang xử lý...' : 'Đặt hàng'}
      </button>
    </form>
  );
};

export default CustomerInfos;