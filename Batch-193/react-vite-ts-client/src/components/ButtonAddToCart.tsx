import type { Product } from "@/services/productService";
import { Button } from "./ui/button";
import { useShoppingCartStore } from "@/stores/useShoppingCartStore";
import { toast } from "sonner"

const ButtonAddToCart = ({ product }: { product: Product }) => {
   const {  addItem } = useShoppingCartStore((state) => state);
  return (
    <Button
      onClick={() => {
        addItem({
            id: product._id,
            product_name: product.product_name,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1,
        });
        toast.success("Item added to cart");
      }}
    >
      Add to cart
    </Button>
  );
};

export default ButtonAddToCart;
