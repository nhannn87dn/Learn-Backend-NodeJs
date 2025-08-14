
import CartSteps from "@/components/CartSteps";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useShoppingCartStore } from "@/stores/useShoppingCartStore";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/services/orderSerivce";
import { useNavigate } from "react-router";
import { toast } from "sonner";


const schema = yup.object().shape({
  last_name: yup.string().required("Vui lòng nhập họ"),
  first_name: yup.string().required("Vui lòng nhập tên"),
  phone: yup.string().required("Vui lòng nhập số điện thoại"),
  email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
  street: yup.string().required("Vui lòng nhập địa chỉ"),
  city: yup.string().required("Vui lòng nhập thành phố"),
  state: yup.string().required("Vui lòng nhập tỉnh/thành"),
  zip_code: yup.string().max(5, "Tối đa 5 ký tự").optional().default(''),
  payment_type: yup.number().required("Vui lòng chọn phương thức thanh toán").default(1),
  order_note: yup.string().optional().default(''),
});

const CartCheckoutPage = () => {
  const navigate = useNavigate();

  //get items for checkout
  const { items, totalAmount , setCartSteps, setOrderInfo} = useShoppingCartStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  //Mutation Order
  const mutationCreateOrder = useMutation({
    mutationFn: createOrder,//hàm api tạo đơn
    onError: (error)=>{
      // Handle error
      console.error("Error creating order:", error);
      toast.error("Đã xảy ra lỗi khi tạo đơn hàng");
    },
    onSuccess: (data) => {
      // Handle successful order creation
      console.log("Order created successfully:", data);
      setCartSteps(4);
      //lưu lại thông tin đơn hàng vào localStorage
      setOrderInfo({
          customer: {
          last_name: data.last_name,
          first_name: data.first_name,
          phone: data.phone,
          email: data.email,
          street: data.street,
          city: data.city,
          state: data.state,
          zip_code: data.zip_code,
        },
          orderId: data._id,
          paymentType: data.payment_type,
          items,
          totalAmount,
      })
      //chuyển hướng đến trang hoàn tất
      navigate("/cart/done")
    },

  });

  const onSubmit = async(data: any) => {
    // Xử lý dữ liệu đặt hàng ở đây
    console.log("Dữ liệu checkout:", data);
    //payload order
    const orderPayload = {
      customer: {
        last_name: data.last_name,
        first_name: data.first_name,
        phone: data.phone,
        email: data.email,
        street: data.street,
        city: data.city,
        state: data.state,
        zip_code: data.zip_code,
      },
      order_items: items.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
      payment_type: data.payment_type || 1,
      order_note: data.order_note || '',
    }
    //tao don
    await mutationCreateOrder.mutateAsync(orderPayload);

  };

  return (
    <main className="container mx-auto">
      <CartSteps  />
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form className="checkout-layout mx-auto flex gap-x-5" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-main w-2/3">
          <section className="customer-info-form mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">Thông tin khách hàng</h2>
              <a href="/login?callbackUrl=/cart/checkout" className="text-blue-600 text-sm hover:underline">Đã có tài khoản? Đăng nhập</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Họ <span className="text-red-500">*</span></label>
                <input type="text" id="last_name" {...register("last_name")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message as string}</p>}
              </div>
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Tên <span className="text-red-500">*</span></label>
                <input type="text" id="first_name" {...register("first_name")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message as string}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại <span className="text-red-500">*</span></label>
                <input type="tel" id="phone" {...register("phone")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message as string}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                <input type="email" id="email" {...register("email")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">Địa chỉ (Số nhà, đường...) <span className="text-red-500">*</span></label>
                <input type="text" id="street" {...register("street")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street.message as string}</p>}
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">Thành phố <span className="text-red-500">*</span></label>
                <input type="text" id="city" {...register("city")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message as string}</p>}
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">Tỉnh/Thành <span className="text-red-500">*</span></label>
                <input type="text" id="state" {...register("state")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message as string}</p>}
              </div>
              <div>
                <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700">Mã bưu điện</label>
                <input type="text" id="zip_code" {...register("zip_code")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" maxLength={5} />
                {errors.zip_code && <p className="text-red-500 text-xs mt-1">{errors.zip_code.message as string}</p>}
              </div>
            </div>
          </section>
          <section className="payment-methods">
            <h2 className="text-xl font-semibold mb-2">Phương thức thanh toán</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <label className="inline-flex items-center">
                <input type="radio" value="1" {...register("payment_type")}
                  className="mr-2" />
                <span>Thẻ tín dụng</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" value="2" {...register("payment_type")}
                  className="mr-2" />
                <span>PayPal</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" value="3" {...register("payment_type")}
                  className="mr-2" />
                <span>Chuyển khoản ngân hàng</span>
              </label>
            </div>
            {errors.payment_type && <p className="text-red-500 text-xs mt-1">{errors.payment_type.message as string}</p>}
          </section>
          <section className="order-note mt-5">
            <h2 className="text-xl font-semibold mb-2">Ghi chú đơn hàng</h2>
            <textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              rows={4} placeholder="Nhập ghi chú cho đơn hàng của bạn" {...register("order_note")}></textarea>
            {errors.order_note && <p className="text-red-500 text-xs mt-1">{errors.order_note.message as string}</p>}
          </section>
        </div>
        <div className="col-sub w-1/3">
          <section className="cart-list-items bg-white rounded-lg shadow p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Giỏ hàng của bạn</h2>
           <div className="items-list flex flex-col gap-4">
              {
                items.map(item => (
                  <div key={item.id} className="cart-item flex items-center border-b py-2 gap-3">
                    <img src={item.thumbnail} alt={item.product_name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-medium">{item.product_name}</div>
                      <div className="text-gray-500 text-sm">{item.price} x {item.quantity}</div>
                    </div>
                    <div className="text-right min-w-[90px] font-semibold text-gray-800">{(item.price * item.quantity).toFixed(2)}đ</div>
                  </div>
                ))
              }
           </div>
            <div className="flex items-center mt-4">
              <input type="text" placeholder="Nhập mã giảm giá" className="flex-1 border border-gray-300 rounded-l-md p-2" />
              <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">Áp dụng</button>
            </div>
          </section>
          <section className="order-summary bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Tạm tính</span>
              <span className="font-semibold">{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Phí vận chuyển</span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex justify-between items-center border-t pt-4">
              <span className="text-xl font-bold">Tổng cộng</span>
              <span className="text-xl font-bold text-blue-600">{totalAmount.toFixed(2)}</span>
            </div>
          </section>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition">Đặt hàng</button>
        </div>
      </form>
    </main>
  );
};

export default CartCheckoutPage;
