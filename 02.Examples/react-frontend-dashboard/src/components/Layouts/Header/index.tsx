import UserInfo from "../../UserInfo";

const Header = () => {
    console.log('Header render');
    //className={`bg-color ${styles.header}`}
  return (
    <header className="bg-slate-950 max-h-12 p-3">
        <div className="flex justify-between items-center">
          <div className="logo">
            <h1 className="text-xl font-bold text-slate-100">Admin Manager</h1>
          </div>
          <UserInfo  />
        </div>
      
    </header>
  );
};

export default Header;
