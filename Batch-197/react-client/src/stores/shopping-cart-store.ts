import { ENV } from '@/config/env';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Item {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface ShoppingCartStore {
    items: Item[];

    // Tổng tiền
    getTotalPrice: number;

    addItem: (item: Item) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;

    increaseItemQuantity: (id: string) => void;
    decreaseItemQuantity: (id: string) => void;
}

export const useShoppingCartStore = create<ShoppingCartStore>()(
    devtools(
        persist(
            (set) => ({
                items: [],

                // Mặc định
                getTotalPrice: 0,

                addItem: (item) => {
                    set(
                        (state) => {
                            const existingItem = state.items.find(
                                (i) => i.id === item.id
                            );

                            let newItems: Item[];

                            if (existingItem) {
                                newItems = state.items.map((i) =>
                                    i.id === item.id
                                        ? {
                                              ...i,
                                              quantity:
                                                  i.quantity + item.quantity,
                                          }
                                        : i
                                );
                            } else {
                                newItems = [...state.items, item];
                            }

                            const newTotalPrice = newItems.reduce(
                                (total, item) =>
                                    total + item.price * item.quantity,
                                0
                            );

                            return {
                                items: newItems,
                                getTotalPrice: newTotalPrice,
                            };
                        },
                        false,
                        'cart/addItem'
                    );
                },

                removeItem: (id) => {
                    set(
                        (state) => {
                            const newItems = state.items.filter(
                                (item) => item.id !== id
                            );

                            const newTotalPrice = newItems.reduce(
                                (total, item) =>
                                    total + item.price * item.quantity,
                                0
                            );

                            return {
                                items: newItems,
                                getTotalPrice: newTotalPrice,
                            };
                        },
                        false,
                        'cart/removeItem'
                    );
                },

                increaseItemQuantity: (id) => {
                    set(
                        (state) => {
                            const newItems = state.items.map((item) =>
                                item.id === id
                                    ? {
                                          ...item,
                                          quantity: item.quantity + 1,
                                      }
                                    : item
                            );

                            const newTotalPrice = newItems.reduce(
                                (total, item) =>
                                    total + item.price * item.quantity,
                                0
                            );

                            return {
                                items: newItems,
                                getTotalPrice: newTotalPrice,
                            };
                        },
                        false,
                        'cart/increaseItemQuantity'
                    );
                },

                decreaseItemQuantity: (id) => {
                    set(
                        (state) => {
                            const newItems = state.items.map((item) =>
                                item.id === id
                                    ? {
                                          ...item,
                                          quantity: Math.max(
                                              1,
                                              item.quantity - 1
                                          ),
                                      }
                                    : item
                            );

                            const newTotalPrice = newItems.reduce(
                                (total, item) =>
                                    total + item.price * item.quantity,
                                0
                            );

                            return {
                                items: newItems,
                                getTotalPrice: newTotalPrice,
                            };
                        },
                        false,
                        'cart/decreaseItemQuantity'
                    );
                },

                clearCart: () => {
                    set(
                        {
                            items: [],
                            getTotalPrice: 0,
                        },
                        false,
                        'cart/clearCart'
                    );
                },
            }),
            {
                name: `${ENV.APP_NAME}-shopping-cart-storage`,
            }
        ),
        {
            name: `${ENV.APP_NAME}-ShoppingCartStore`,
        }
    )
);