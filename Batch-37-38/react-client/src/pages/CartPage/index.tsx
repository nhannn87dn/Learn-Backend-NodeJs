import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../hooks/useCartStore";
import numeral from "numeral";
const CartPage = () => {
    const navigate = useNavigate();
    const {items, increaseQuantity, decreaseQuantity, total} = useCartStore();
  return (
    <div>
        <div className="bg-gray-100 h-screen py-8">
    <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-full">
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left font-semibold">Product</th>
                                <th className="text-left font-semibold">Price</th>
                                <th className="text-left font-semibold">Quantity</th>
                                <th className="text-left font-semibold">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.length > 0 && items.map((product)=>{
                                    return <tr>
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <img className="h-16 w-16 mr-4" src={product.thumb} alt="Product image" />
                                            <span className="font-semibold">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4">{numeral(product.price).format('0,0$')}</td>
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <button onClick={()=>{
                                                decreaseQuantity(product.id)
                                            }} className="border rounded-md py-2 px-4 mr-2">-</button>
                                            <span className="text-center w-8">{product.quantity}</span>
                                            <button onClick={()=>{
                                                increaseQuantity(product.id)
                                            }} className="border rounded-md py-2 px-4 ml-2">+</button>
                                        </div>
                                    </td>
                                    <td className="py-4">{numeral(product.price * product.quantity).format('0,0$')}</td>
                                </tr>
                                })
                            }
                            <tr>
                                <td>Total</td>
                                <td colSpan={3} className="text-right">{numeral(total).format('0,0$')}</td>
                            </tr>
                            <tr>
                                <td>
                                <button onClick={()=>{
                        navigate('/checkout')
                    }} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    </div>
</div>
    </div>
  )
}

export default CartPage