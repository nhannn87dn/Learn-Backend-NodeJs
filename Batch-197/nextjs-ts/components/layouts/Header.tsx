import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-indigo-500 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Phần bên trái: Logo */}
        <div className="text-2xl font-bold tracking-wide">
          <Link href="/" className="hover:text-indigo-100 transition duration-200">
            MyLogo
          </Link>
        </div>

        {/* Phần bên phải: Navigation */}
        <nav>
          <ul className="flex space-x-6 font-medium text-lg">
            <li>
              <Link 
                href="/" 
                className="hover:text-indigo-200 transition duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/blog" 
                className="hover:text-indigo-200 transition duration-200"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="hover:text-indigo-200 transition duration-200"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link 
                href="/customer" 
                className="hover:text-indigo-200 transition duration-200"
              >
                Customer
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;