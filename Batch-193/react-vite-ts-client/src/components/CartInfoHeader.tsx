import { Link } from "react-router";
import { useShoppingCartStore } from "@/stores/useShoppingCartStore";
import React from "react";
const CartInfoHeader = () => {
    const { items, totalAmount } = useShoppingCartStore((state) => state);
    const [showCartInfo, setShowCartInfo] = React.useState(false);
    return (
        <div className="relative"
            onMouseEnter={() => setShowCartInfo(true)}
            onMouseLeave={() => setShowCartInfo(false)}
        >
            <Link to={"/cart"} className="flex items-center gap-x-1">
                Cart{" "}
                <span className="w-[20px] h-[20px] rounded-full bg-white text-indigo-600 flex items-center justify-center">
                    {items.length}
                </span>
            </Link>
            {showCartInfo && (
                <div className="cart-info bg-white shadow absolute right-0 top-full mt-2 w-60 z-10">
                    {items.length > 0 ? (
                        <>
                            <ul>
                                {items.map((item) => (
                                    <li className="text-gray-700" key={item.id}>{item.product_name} -  {item.quantity}x{item.price}</li>
                                ))}
                            </ul>
                            <p className="text-gray-700">Total: <strong>{totalAmount}</strong></p>
                        </>
                    ) : (
                        <p className="text-gray-700">Your cart is empty</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CartInfoHeader;
