import { Link } from "react-router"
import SearchForm from "./SearchForm"

const Header = () => {
  return (
    <header className="bg-indigo-500 text-white py-3">
        <div className="container mx-auto">
            <div className="middle-header flex justify-between items-center">
                <div className="logo">
                    <span className="bold text-2xl d-block">Logo</span>
                </div>
                <div className="search-bar w-[400px] mx-4">
                    <SearchForm onSearch={(q) => console.log("Tìm kiếm:", q)} />
                </div>
                <nav>
                    <ul className="flex gap-4 items-center">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
  )
}

export default Header