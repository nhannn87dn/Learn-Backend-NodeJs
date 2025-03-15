import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

interface CartItem {
  _id: string;
  product_name: string;
  price: number;
  discount: number;
  quantity: number; // số lượng mua của item
  thumb: string; // ảnh minh họa
}
interface ICart {
  cartNumber: number;
  cartItems: CartItem[]; // danh sách items
  addCartItem: (product: CartItem) => void; // thêm 1 item
  removeCartItem: (productId: string) => void; // xóa 1 item
  updateCartQuantity: (productId: string, quantity: number) => void; // thay đổi số lượng
  clearCart: ()=>void; // xóa tất cả item
  totalAmount: number;
}

export const useShoppingCartStore = create<ICart>()(
  devtools(
    persist(
      (set, get) => ({
        cartNumber: 0, // số lượng item có trong giỏ
        cartItems: [], // danh sách items
        totalAmount: 0,
        addCartItem: (product: CartItem) => {
          const { cartItems, totalAmount } = get(); // lấy state hiện tại
          const existingItem = cartItems.find(item => item._id === product._id);
          if (existingItem) {
            set({
              cartItems: cartItems.map(item =>
                item._id === product._id ? { ...item, quantity: item.quantity + product.quantity } : item
              ),
              cartNumber: get().cartNumber + product.quantity, // tăng số lượng giỏ hàng lên
              totalAmount: totalAmount + product.price * product.quantity // cập nhật tổng tiền
            });
          } 
          //Nếu ko tồn tại thì thêm vào mảng
          else {
            set({
              cartItems: [...cartItems, product],
              cartNumber: get().cartNumber + product.quantity,
              totalAmount: totalAmount + (product.price * product.quantity) // cập nhật tổng tiền
            });
          }
        }, // thêm 1 item
        removeCartItem: (productId: string) => {
          const { cartItems, totalAmount } = get();
          const itemToRemove = cartItems.find(item => item._id === productId);
          if (itemToRemove) {
            set({
              cartItems: cartItems.filter(item => item._id !== productId),
              cartNumber: get().cartNumber - itemToRemove.quantity,
              totalAmount: totalAmount - (itemToRemove.price * itemToRemove.quantity) // cập nhật tổng tiền
            });
          }
        }, // xóa 1 item
        updateCartQuantity: (productId: string, quantity: number) => {
          const { cartItems, totalAmount } = get();
          const itemToUpdate = cartItems.find(item => item._id === productId);
          if (itemToUpdate) {
            const newQuantity = itemToUpdate.quantity + quantity;
            if (newQuantity > 0) { // prevent negative quantity
              set({
                cartItems: cartItems.map(item =>
                  item._id === productId ? { ...item, quantity: newQuantity } : item
                ),
                cartNumber: get().cartNumber + quantity,
                totalAmount: totalAmount + (itemToUpdate.price * quantity) // cập nhật tổng tiền
              });
            } else {
              set({
                cartItems: cartItems.filter(item => item._id !== productId),
                cartNumber: get().cartNumber - itemToUpdate.quantity,
                totalAmount: totalAmount - (itemToUpdate.price  * itemToUpdate.quantity) // cập nhật tổng tiền
              });
            }
          }
        }, // thay đổi số lượng
        clearCart: () => {
          set({
            cartItems: [],
            cartNumber: 0,
            totalAmount: 0,
          });
        }, // xóa tất cả item 
      }),
      {
        name: 'cart-storage', // unique name
        storage: createJSONStorage(() => localStorage), // use local storage
      }
    )
  )
);