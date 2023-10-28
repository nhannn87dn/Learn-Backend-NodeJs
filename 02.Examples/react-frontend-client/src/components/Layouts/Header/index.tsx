import CartInfo from "../../CartInfo";
import Navigation from "../../Navigation";
import UserInfo from "../../UserInfo";


const Header = () => {
    console.log('Header render');
    //className={`bg-color ${styles.header}`}
  return (
    <header className='bg-indigo-500 text-white'>
      <div className="container mx-auto">
        <div className="flex justify-between py-5">
          <div className="text-3xl text-bold ">E-commerce</div>
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
