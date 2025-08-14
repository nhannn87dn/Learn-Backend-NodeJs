import CartEmptyMessage from "@/components/CartEmptyMessage";
import CartSteps from "@/components/CartSteps";
import { Button } from "@/components/ui/button";
import { useShoppingCartStore } from "@/stores/useShoppingCartStore";
import { useNavigate } from "react-router";

const CartPage = () => {
  const navigate = useNavigate();
  const { items, totalAmount, removeItem, increaseItemQuantity, decreaseItemQuantity, setCartSteps, clearCart } = useShoppingCartStore((state) => state);
  
  if (items.length === 0) {
    return <CartEmptyMessage />;
  }
  
  return (
    <main className="container mx-auto">
      <CartSteps />
      <section className="cart-layout max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <div className="cart-items bg-white rounded-lg shadow p-4 mb-6">
          {/* Example cart items */}
          {items.map((item) => {
            return (
              <div className="flex items-center border-b py-4 last:border-b-0">
                <img
                  src={item.thumbnail}
                  alt="Product"
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{item.product_name}</h2>
                  <div className="flex items-center mt-2">
                    <button onClick={() => decreaseItemQuantity(item.id)} className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300">
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button onClick={() => increaseItemQuantity(item.id)} className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300">
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-blue-600">{item.price}</p>
                  <button onClick={()=>removeItem(item.id)} className="text-red-500 text-sm mt-2 hover:underline">
                    Xóa
                  </button>
                </div>
              </div>
            );
          })}

          {/* Thêm nhiều sản phẩm khác nếu cần */}
        </div>
        <div className="my-3"><Button onClick={clearCart}>Xóa giỏ hàng</Button></div>
        <div className="cart-summary bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center border-t pt-4">
            <span className="text-xl font-bold">Tổng cộng</span>
            <span className="text-xl font-bold text-blue-600">{totalAmount.toFixed(2)}</span>
          </div>
          <button
            onClick={() => {
              navigate("/cart/checkout");
              //set CartStep => 2
              setCartSteps(2);
            }}
            className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
          >
            Thanh toán
          </button>
        </div>
      </section>
    </main>
  );
};

export default CartPage;
