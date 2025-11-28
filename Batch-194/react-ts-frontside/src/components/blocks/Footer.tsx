
import React from "react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white">BrandName</h3>
            <p className="mt-2 text-sm text-gray-400">Quality products, great prices, delivered fast.</p>
            <div className="mt-4 flex space-x-3">
              <a aria-label="Facebook" className="p-2 rounded-md bg-gray-800 hover:bg-gray-700">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.06 5.66 21.13 10.44 21.93v-6.85H8.08v-2.9h2.36V9.41c0-2.33 1.38-3.61 3.5-3.61.99 0 2.03.18 2.03.18v2.23h-1.14c-1.12 0-1.47.7-1.47 1.42v1.7h2.5l-.4 2.9h-2.1v6.85C18.34 21.13 22 17.06 22 12.07z" />
                </svg>
              </a>
              <a aria-label="Twitter" className="p-2 rounded-md bg-gray-800 hover:bg-gray-700">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M22 5.92c-.63.28-1.3.47-2 .55.72-.43 1.27-1.11 1.53-1.92-.67.4-1.41.69-2.2.85C18.9 4.6 17.96 4 16.88 4c-1.73 0-3.13 1.4-3.13 3.12 0 .24.03.47.08.69C10.22 7.66 7.1 6.01 5 3.4c-.27.47-.42 1.01-.42 1.59 0 1.1.56 2.07 1.42 2.64-.52-.02-1.01-.16-1.44-.4v.04c0 1.53 1.09 2.81 2.54 3.1-.27.07-.56.11-.86.11-.21 0-.42-.02-.62-.06.42 1.32 1.63 2.28 3.07 2.31C7.5 15.6 6.07 16.3 4.55 16.3 4.2 16.3 3.86 16.28 3.53 16.23c1.47.94 3.21 1.5 5.09 1.5 6.1 0 9.44-5.05 9.44-9.43v-.43c.65-.47 1.21-1.06 1.66-1.72-.6.27-1.25.45-1.93.53z" />
                </svg>
              </a>
              <a aria-label="Instagram" className="p-2 rounded-md bg-gray-800 hover:bg-gray-700">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zM12 7.2A4.8 4.8 0 1016.8 12 4.8 4.8 0 0012 7.2zm0 2.4a2.4 2.4 0 11-2.4 2.4A2.4 2.4 0 0112 9.6zM18.5 6.1a.9.9 0 11-.9-.9.9.9 0 01.9.9z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white">Customer Service</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
              <li><a href="#" className="hover:text-white">Shipping</a></li>
              <li><a href="#" className="hover:text-white">Track Order</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Press</a></li>
              <li><a href="#" className="hover:text-white">Affiliates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white">Join our Newsletter</h4>
            <p className="mt-2 text-sm text-gray-400">Get updates on new arrivals and promotions.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input id="footer-email" type="email" placeholder="you@email.com" className="w-full px-3 py-2 rounded-l-md focus:outline-none text-gray-900 bg-white" />
              <button type="submit" className="px-4 rounded-r-md bg-indigo-600 hover:bg-indigo-500 text-white">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>© {year} BrandName. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs">Payments:</span>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-gray-800 rounded-sm" title="Visa" />
                <div className="w-8 h-5 bg-gray-800 rounded-sm" title="Mastercard" />
                <div className="w-8 h-5 bg-gray-800 rounded-sm" title="Paypal" />
              </div>
            </div>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;