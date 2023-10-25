import { useCartStore } from "../../hooks/useCartStore"
import { Link } from "react-router-dom";

const CartInfo = () => {
  const {itemCount} = useCartStore();
  return (
     <Link to={'/cart'}>
    <span style={{
      backgroundColor: "#fff",
      padding: "5px 10px",
      borderRadius: "20px",
      marginLeft: "15px",
      cursor: "pointer",
      fontWeight: "bold",
    }}>{itemCount}</span>
     </Link>
  )
}

export default CartInfo