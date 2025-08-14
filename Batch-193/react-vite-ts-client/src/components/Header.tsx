
import { NavLink } from "react-router";
import CartInfoHeader from "./CartInfoHeader";

const Header = () => {
 
  return (
    <header className="bg-indigo-600 text-white py-4">
      <div className="container mx-auto">
        <div className="header-middle flex justify-between">
          <div className="logo text-3xl font-bold">FakeShop</div>
          <nav>
            <ul className="flex gap-x-3">
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "font-bold" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/login"}
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "font-bold" : ""
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <CartInfoHeader />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
