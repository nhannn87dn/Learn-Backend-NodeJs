import CartSteps from "@/components/CartSteps";
import { useShoppingCartStore } from "@/stores/useShoppingCartStore";
import { useEffect } from "react";
import { useNavigate } from "react-router";



const CartDonePage = () => {
    const navigate = useNavigate();
    const { orderInfo, clearCart } = useShoppingCartStore((state) => state);
    console.log('<<=== 🚀 orderInfo ===>>',orderInfo);
    
    // Clear cart after successful order
    useEffect(()=>{
      clearCart();
    },[clearCart])

  return (
    <main className="container mx-auto">
      <CartSteps />
      <div className="cart-done max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Cảm ơn bạn đã đặt hàng!</h1>
        <p className="mb-4">Đơn hàng số <strong className="text-red-500 font-bold">{orderInfo.orderId} </strong>của bạn đã được đặt thành công.</p>
        <p className="mb-4">Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.</p>
        <div className="border-t pt-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Thông tin đơn hàng</h2>
          <div className="mb-2 flex justify-between">
            <span className="text-gray-700">Tổng tiền:</span>
            <span className="font-bold text-blue-600">{orderInfo.totalAmount.toLocaleString()}đ</span>
          </div>
          <div className="mb-2 flex justify-between">
            <span className="text-gray-700">Phương thức thanh toán:</span>
            <span>{orderInfo.paymentType}</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-700 font-medium">Thông tin khách hàng:</span>
            <div className="ml-4 mt-1 text-sm">
              <div>Họ tên: {orderInfo.customer.last_name} {orderInfo.customer.first_name}</div>
              <div>Điện thoại: {orderInfo.customer.phone}</div>
              <div>Email: {orderInfo.customer.email}</div>
              <div>Địa chỉ: {orderInfo.customer.street}, {orderInfo.customer.city}, {orderInfo.customer.state} {orderInfo.customer.zip_code}</div>
            </div>
          </div>
        </div>
      </div>
        <div className="text-center mt-6">
            <button onClick={() => {
                navigate("/");
            }} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Quay lại trang chủ</button>
        </div>
    </main>
  )
}

export default CartDonePage