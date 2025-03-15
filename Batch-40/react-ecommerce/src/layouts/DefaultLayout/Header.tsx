import { Link } from 'react-router';
import CartHeader from '../../components/CartHeader';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="logo">
        <img src="/path-to-logo.png" alt="Logo" className="h-8" />
      </div>
      <nav className="flex space-x-4">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        <Link to="/shop" className="hover:text-gray-400">Shop</Link>
        <Link to="/about" className="hover:text-gray-400">About</Link>
        <Link to="/contact" className="hover:text-gray-400">Contact</Link>
      </nav>
      <CartHeader />
    </header>
  )
}
