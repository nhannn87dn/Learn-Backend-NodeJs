import { ShoppingCart } from "lucide-react"
import { Badge } from "../ui/badge"
import { useShoppingCartStore } from "@/stores/shopping-cart-store"

const Cart = () => {
    const { items } = useShoppingCartStore();
  return (
    <span className="relative flex gap-2 items-center">
      <ShoppingCart />
      <Badge>{items.length}</Badge>
    </span>
  )
}

export default Cart