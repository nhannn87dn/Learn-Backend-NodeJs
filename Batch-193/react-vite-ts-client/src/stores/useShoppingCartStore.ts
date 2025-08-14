
// Import zustand và các middleware devtools, persist
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';


// Định nghĩa kiểu dữ liệu cho từng sản phẩm trong giỏ hàng
interface ICartItem {
    id: string;
    product_name: string;
    price: number;
    thumbnail: string;
    quantity: number;
}

// Định nghĩa kiểu dữ liệu cho store quản lý giỏ hàng và đơn hàng
interface IShoppingCartStore {
    cartSteps: number;
    setCartSteps: (step: number) => void;
    // Danh sách sản phẩm trong giỏ
    items: ICartItem[];
    // Tổng tiền của giỏ hàng
    totalAmount: number;
    // Thêm sản phẩm vào giỏ
    addItem: (item: ICartItem) => void;
    // Xóa sản phẩm khỏi giỏ
    removeItem: (itemId: string) => void;
    // Xóa toàn bộ giỏ hàng
    clearCart: () => void;
    //Tăng số lượng sản phẩm
    increaseItemQuantity: (itemId: string) => void;
    //Giảm số lượng sản phẩm
    decreaseItemQuantity: (itemId: string) => void;
    // Thông tin đơn hàng đã đặt
    orderInfo: {
        customer: {
            first_name: string;
            last_name: string;
            email: string;
            phone: string;
            street: string;
            city: string;
            state: string;
            zip_code: string;
        };
        orderId: string;
        paymentType: number;
        items: ICartItem[];
        totalAmount: number;
    };
    // Cập nhật thông tin đơn hàng
    setOrderInfo: (orderInfo: IShoppingCartStore['orderInfo']) => void;
}

const orderInfoDefault = {
                    customer: {
                        first_name: '',
                        last_name: '',
                        email: '',
                        phone: '',
                        street: '',
                        city: '',
                        state: '',
                        zip_code: '',
                    },
                    orderId: '',
                    paymentType: 0,
                    items: [],
                    totalAmount: 0,
                }

// Store zustand quản lý giỏ hàng, đơn hàng, có tích hợp devtools và lưu localStorage
export const useShoppingCartStore = create<IShoppingCartStore>()(
    devtools(
        persist(
            (set) => ({
                cartSteps: 1, // Bước hiện tại trong quá trình thanh toán
                setCartSteps: (step) => set({ cartSteps: step }),
                // Danh sách sản phẩm trong giỏ
                items: [],
                // Tổng tiền của giỏ hàng
                totalAmount: 0,
                // Thêm sản phẩm vào giỏ, nếu đã có thì tăng số lượng
                addItem: (item) => set((state) => {
                    const existingItem = state.items.find(i => i.id === item.id);
                    // Nếu sản phẩm đã có trong giỏ thì tăng số lượng
                    if (existingItem) {
                        return {
                            items: state.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i),
                            totalAmount: state.totalAmount + item.price * item.quantity
                        };
                    }
                    // Nếu sản phẩm chưa có trong giỏ thì thêm mới
                    return {
                        items: [...state.items, item],
                        totalAmount: state.totalAmount + item.price * item.quantity
                    };
                }),
                // Xóa sản phẩm khỏi giỏ
                removeItem: (itemId) => set((state) => {
                    const item = state.items.find(i => i.id === itemId);
                    if (!item) return state;
                    return {
                        items: state.items.filter(i => i.id !== itemId),
                        totalAmount: state.totalAmount - item.price * item.quantity
                    };
                }),
                //Tăng số lượng
                increaseItemQuantity: (itemId) => set((state) => {
                    const item = state.items.find(i => i.id === itemId);
                    if (!item) return state;
                    return {
                        items: state.items.map(i => i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i),
                        totalAmount: state.totalAmount + item.price
                    };
                }),
                // Giảm số lượng
                decreaseItemQuantity: (itemId) => set((state) => {
                    const item = state.items.find(i => i.id === itemId);
                    if (!item) return state;
                    if (item.quantity === 1) {
                        return {
                            items: state.items.filter(i => i.id !== itemId),
                            totalAmount: state.totalAmount - item.price
                        };
                    }
                    return {
                        items: state.items.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i),
                        totalAmount: state.totalAmount - item.price
                    };
                }),
                // Xóa toàn bộ giỏ hàng
                clearCart: () => set({ items: [], totalAmount: 0 }),
                // Thông tin đơn hàng đã đặt
                orderInfo: orderInfoDefault,
                // Cập nhật thông tin đơn hàng
                setOrderInfo: (orderInfo) => set({ orderInfo }),
            }),
            {
                name: 'shopping-cart-store', // key lưu trong localStorage
            }
        )
    )
);