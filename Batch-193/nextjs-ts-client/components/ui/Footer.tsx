'use client';
import Link from 'next/link';

const Footer = () => {
    console.log('Footer');
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Cột 1: Logo & mô tả */}
        <div>
          <h2 className="text-xl font-bold mb-2 text-white">MyLogo</h2>
          <p className="text-sm text-gray-400">Nền tảng học lập trình backend Node.js, Express, MongoDB, SQL Server, React, Next.js.</p>
        </div>
        {/* Cột 2: Navigation */}
        <div>
            <li>
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-blue-400 transition-colors">Courses</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
            </li>
          </ul>
        </div>
        {/* Cột 3: Hỗ trợ */}
        <div>
          <h3 className="font-semibold mb-2 text-white">Support</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
        {/* Cột 4: Liên hệ */}
        <div>
          <h3 className="font-semibold mb-2 text-white">Contact</h3>
          <ul className="space-y-1 text-sm">
            <li>Email: <a href="mailto:info@example.com" className="hover:text-blue-400">info@example.com</a></li>
            <li>Phone: <a href="tel:+84123456789" className="hover:text-blue-400">+84 123 456 789</a></li>
            <li>Address: Đà Nẵng, Việt Nam</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500 text-xs">© {new Date().getFullYear()} MyLogo. All rights reserved.</div>
    </footer>
  );
}

export default Footer