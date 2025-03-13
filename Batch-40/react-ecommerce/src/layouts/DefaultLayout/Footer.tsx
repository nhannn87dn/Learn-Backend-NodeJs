import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-b border-gray-700">
          <div>
            <h3 className="font-bold mb-2">About Us</h3>
            <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/shop" className="hover:text-gray-400">Shop</Link></li>
              <li><Link to="/about" className="hover:text-gray-400">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gray-400">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-gray-400">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/shipping" className="hover:text-gray-400">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-gray-400">Returns Policy</Link></li>
              <li><Link to="/support" className="hover:text-gray-400">Support</Link></li>
              <li><Link to="/terms" className="hover:text-gray-400">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Follow Us</h3>
            <ul className="space-y-2">
              <li><a href="https://facebook.com" className="hover:text-gray-400">Facebook</a></li>
              <li><a href="https://twitter.com" className="hover:text-gray-400">Twitter</a></li>
              <li><a href="https://instagram.com" className="hover:text-gray-400">Instagram</a></li>
              <li><a href="https://linkedin.com" className="hover:text-gray-400">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center py-4">
          <div className="text-sm">
            &copy; 2023 Your Company. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-400">Terms of Service</Link>
            <Link to="/contact" className="hover:text-gray-400">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
