import { Link } from 'react-router'
import { useShoppingCartStore } from '../stores/useShoppingCartStore'

export default function CartHeader() {
  const {cartNumber} = useShoppingCartStore();
  return (
    <div className="cart">
        <Link to="/cart" className="hover:text-gray-400 flex gap-x-[8px]">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H19m-2 8a2 2 0 100 4 2 2 0 000-4zm-10 0a2 2 0 100 4 2 2 0 000-4z"></path>
          </svg>
          <span className="flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{cartNumber}</span>
        </Link>
      </div>
  )
}
