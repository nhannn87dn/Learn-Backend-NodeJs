'use client';
const SearchHeader = () => {
  return (
     <form className="search-form border border-white rounded-md overflow-hidden flex bg-white">
                    <input type="text" placeholder="Search..." className="px-4 py-2 rounded-l-md text-gray-900 border-0 focus:outline-none"/>
                    <button onClick={(e) => e.preventDefault()} className="px-4 py-2 bg-white text-indigo-500 rounded-r-md font-semibold">Search</button>
                </form>
  )
}

export default SearchHeader