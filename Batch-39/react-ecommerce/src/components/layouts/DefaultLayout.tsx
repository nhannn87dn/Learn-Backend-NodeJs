import { Outlet, Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

const DefaultLayout = () => {
  const { getTotalNumber } = useCart();

  return (
    <>
      <header className="bg-indigo-500 text-white">
        <div className="container mx-auto">
          <div className="header_wrapper flex justify-between items-center py-5">
            <div className="logo">SHOP</div>
            <nav className="navigation">
              <ul className="flex gap-x-4">
                <li>
                  <Link to="/">HOme</Link>
                </li>
                <li>
                  <Link to="/products">Products</Link>
                </li>
                <li>
                  <Link to="/cart">
                    Giỏ hàng: <span>{getTotalNumber()}</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto my-5">
        <Outlet />
      </main>
      <footer className="bg-slate-900 text-white py-10">
        <div className="container mx-auto">Footer</div>
      </footer>
    </>
  );
};

export default DefaultLayout;
