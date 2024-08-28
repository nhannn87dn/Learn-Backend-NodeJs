import { Outlet, Link } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">HOme</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
};

export default DefaultLayout;
