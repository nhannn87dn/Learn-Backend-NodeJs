import CartInfo from "../../CartInfo";
import Navigation from "../../Navigation";
import UserInfo from "../../UserInfo";
import styles from "./Header.module.css";
import clsx from 'clsx';

const Header = () => {
    console.log('Header render');
    //className={`bg-color ${styles.header}`}
  return (
    <header className={clsx('bg-color',styles.header)}>
      <div className="container mx-auto">
        <div className={styles.header_wrapper}>
          <div className="logo">FakeShop</div>
          <Navigation />
          <div className="area_right">
            <UserInfo  />
            <CartInfo />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
