import { Link } from "react-router-dom"
import { useCartStore } from "../../../hooks/useCartStore"
const Header = () => {
  const {itemCount} = useCartStore();
    return (
      <header className="bg-indigo-500 text-white">
        <div className="container mx-auto">
            <div className="header-middle flex justify-between py-5">
                <div className="logo">LOGO</div>
                <nav>
                  <ul className="flex gap-x-10">
                    <li>
                      <Link to={`/`}>Home</Link>
                    </li>
                    <li>
                    <Link to={`/login`}>Login</Link>
                    </li>
                    <li>
                    <Link to={`/customer`}>Customer</Link>
                    </li>
                    <li>
                    <Link to={`/cart`}><span>Cart <em className="w-[20px] h-[20px] text-center inline-block rounded-full bg-white text-indigo-900">{itemCount}</em></span></Link>
                    </li>
                  </ul>
                </nav>
            </div>
        </div>
      </header>
    )
  }
  
  export default Header