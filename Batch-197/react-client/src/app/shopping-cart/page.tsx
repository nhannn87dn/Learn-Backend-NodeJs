import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useShoppingCartStore } from "@/stores/shopping-cart-store"
import CustomerInfos from "@/components/blocks/CustomerInfos"
import { useState } from "react"

const ShoppingCartPage = () => {
    const [isOrderSuccess, setIsOrderSuccess] = useState(false)
    const {items, getTotalPrice, decreaseItemQuantity, increaseItemQuantity, clearCart, removeItem} = useShoppingCartStore()
    if (isOrderSuccess) {
        return (
            <div className="shopping-cart-page flex min-h-full items-center justify-center p-5">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-green-700">Đặt hàng thành công</h2>
                    <p className="mt-2 text-slate-600">Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</p>
                </div>
            </div>
        )
    }

    if(items.length === 0) {
        return (
            <div className="shopping-cart-page flex justify-center items-center h-full">
                <h2 className="text-2xl font-bold">Giỏ hàng của bạn đang trống</h2>
            </div>
        )
    }
  
    return (
    <div className="shopping-cart-page flex gap-5">
        <div className="customer-infos w-1/2 p-5">
            <CustomerInfos onOrderSuccess={() => setIsOrderSuccess(true)} />
        </div>
        <div className="products-in-cart w-1/2 bg-slate-100 p-5">
                <div className="cart-header">
                    <Button onClick={clearCart}>
                        Clear giỏ hàng
                    </Button>
                </div>
            {items.map((item) => (
                <div key={item.id} className="product-item flex gap-3 items-center bg-white p-3 mb-1">
                    <h3 className="w-1/2">{item.name} <Badge className="cursor-pointer"  onClick={() => removeItem(item.id)} variant="destructive">Xóa</Badge></h3>

                    <div className="item-r w-1/2 flex justify-end items-center gap-3">
                        <div className="flex gap-2 items-center">
                            <Button className="cursor-pointer" onClick={() => decreaseItemQuantity(item.id)}>
                                -
                            </Button>
                            <span>{item.quantity}</span>
                            <Button className="cursor-pointer" onClick={() => increaseItemQuantity(item.id)}>
                                +
                            </Button>
                        </div>
                        {item.quantity} x ${item.price}
                    </div>
                </div>
            ))}
            <div className="total-price flex justify-between p-3">
              <span>Total: </span> <span className="font-bold">${getTotalPrice.toFixed(2)}</span>
            </div>
        </div>
    </div>
  )
}

export default ShoppingCartPage