import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TProduct = {
    _id: string,
    product_name: string;
    price: number;
    thumbnail: string;
    quantity: number;
    discount:number;
}

interface TCart {
    products: TProduct[];
    addToCart: (item: TProduct) => void;
    removeFromCart: (id: string)=> void;
    increase: (id: string)=>void;
    decrement:  (id: string)=>void;
    getTotalNumber: () => number;
    totalAmount: number;
    calculateTotalAmount: () => void;
}

export const useCart = create(
  persist<TCart>(
    (set, get) => ({
      products: [],
      totalAmount: 0,

      getTotalNumber: () => {
        return get().products.length;
      },

      calculateTotalAmount: () => {
        const products = get().products;
        const total = products.reduce((sum, product) => sum + product.quantity * product.price, 0);
        set({ totalAmount: total });
      },

      addToCart: (item: TProduct) => {
        const products = get().products;
        const existingProduct = products.find((product) => product._id === item._id);

        if (existingProduct) {
          set({
            products: products.map((product) =>
              product._id === item._id
                ? { ...product, quantity: product.quantity + 1 }
                : product
            ),
          });
        } else {
          set({ products: [...products, { ...item, quantity: 1 }] });
        }

        get().calculateTotalAmount(); // Cập nhật totalAmount sau khi thêm vào giỏ hàng
      },

      removeFromCart: (id: string) => {
        set({
          products: get().products.filter((product) => product._id !== id),
        });

        get().calculateTotalAmount(); // Cập nhật totalAmount sau khi xóa khỏi giỏ hàng
      },

      increase: (id: string) => {
        set({
          products: get().products.map((product) =>
            product._id === id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        });

        get().calculateTotalAmount(); // Cập nhật totalAmount sau khi tăng số lượng
      },

      decrement: (id: string) => {
        set({
          products: get().products.map((product) =>
            product._id === id && product.quantity > 1
              ? { ...product, quantity: product.quantity - 1 }
              : product
          ),
        });

        get().calculateTotalAmount(); // Cập nhật totalAmount sau khi giảm số lượng
      },
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
