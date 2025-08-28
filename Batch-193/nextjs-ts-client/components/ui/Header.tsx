import Link from "next/link";


const navigation = [
  { name: "Home", href: "/" },
  { name: "Brands (Client + use Hook)", href: "/brands" },
  { name: "Categories (Client + useEffect)", href: "/categories" },
  { name: "Products (Server)", href: "/products" },
  { name: "Profile", href: "/customer/profile" },
];

const Header = () => {
    console.log("header");
  return (
    <header className="w-full bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <span className="text-xl font-bold text-blue-600">MyLogo</span>
        </div>
        {/* Navigation */}
        <nav className="flex space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header