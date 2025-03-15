import { useNavigate } from "react-router";
import { useShoppingCartStore } from "../stores/useShoppingCartStore";

function CartPage() {
  const navigate = useNavigate();
 const {cartItems, updateCartQuantity, clearCart, removeCartItem, totalAmount} = useShoppingCartStore();
  //tính tổng tiền
 return (
    <div className="p-4 max-w-2xl mx-auto bg-white my-3 shadow">
      <div className="cart-header flex justify-between">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="more">
          <button onClick={clearCart}>Clear Cart</button>
      </div>
      </div>
      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item._id} className="flex justify-between items-center p-4 border rounded">
            <div>
              <h2 className="text-xl">{item.product_name}</h2>
              <p>${item.price}</p>
            </div>
            <div className="flex items-center">
              <button 
                className="px-2 py-1 bg-gray-200 rounded" 
                onClick={() => updateCartQuantity(item._id, -1)}
              >-</button>
              <span className="px-4">{item.quantity}</span>
              <button 
                className="px-2 py-1 bg-gray-200 rounded" 
                onClick={() => updateCartQuantity(item._id,1)}
              >+</button>

              <button onClick={()=>removeCartItem(item._id)}  title="Remove item " className="px-2 py-1 ms-4 bg-red-200 text-red-500 rounded-full">x</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</h2>
        <button onClick={()=>{
          // chuyển đến trang checkout
          navigate('/checkout')
        }}>Checkout now</button>
      </div>
    </div>
  );
}

export default CartPage;