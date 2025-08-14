import { useNavigate } from "react-router";

const CartEmptyMessage = () => {
    const navigate = useNavigate();
  return (
    <main className="container mx-auto">
     <section className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
         <h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
            <p className="mb-4">Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
            <button onClick={()=>{
                navigate("/");
            }} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Tiếp tục mua sắm</button>
     </section>
    </main>
  )
}

export default CartEmptyMessage