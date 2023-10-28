import Skeleton from 'react-loading-skeleton';
import { useQuery } from '@tanstack/react-query';
import { ICategory } from '../../constants/types';
import { useNavigate } from 'react-router-dom';

type queryType = {
  page?: number;
  categoryId?: number
}

type ProductFilterType = {
  queryString: queryType;
  currentCategoryId: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

function encodeQueryData(data: Record<string, any>) {
  const ret = [];
  for (const d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
}


const ProductFilter = ({ queryString, currentCategoryId, currentPage, setCurrentPage }: ProductFilterType) => {
  const navigate = useNavigate();

  //=================== Fetch Categories ============ //
  const fetchCategories = async () => {
    const url = `https://api.escuelajs.co/api/v1/categories`;
    return fetch(url).then((res) => res.json());
  };
  // Sử dụng useQuery để fetch data từ API
  const queryCategories = useQuery<ICategory[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  return (
    <div className="filter_wrapper flex flex-col gap-y-5">
      <ul className="flex flex-col gap-y-1">
        <li className="filter_title font-bold text-xl">Filter by Category</li>
        <li>
          <button
            onClick={() => {
              setCurrentPage(1);
              navigate(`/products`);
            }}
            className={currentCategoryId === 0 ? `hover:text-indigo-500 font-bold text-indigo-500 btn-empty` : `btn-empty hover:text-indigo-500`}
          >
            Tất cả
          </button>
        </li>
        {queryCategories.isLoading ? (
          <Skeleton count={10} />
        ) : (
          <>
            {queryCategories.data &&
              queryCategories.data.map((item) => {
                return (
                  <li key={`queryCategories${item.id}`} className="">
                    <button
                      onClick={() => {
                        setCurrentPage(1);
                        navigate(`/products?categoryId=${item.id}`);
                      }}
                      className={
                        currentCategoryId === item.id ? `hover:text-indigo-500 font-bold text-indigo-500 btn-empty` : `hover:text-indigo-500 btn-empty`
                      }
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })}
          </>
        )}
      </ul>
      <ul className="flex flex-col gap-y-3">
        <li className="filter_title font-bold text-xl">Filter by Price</li>
        <li>
          <button 
          className='hover:text-indigo-500 btn-empty'
          onClick={()=>{
            navigate(`/products?page=${currentPage}&price_max=100`)
          }} 
          type="button">{'<'} 100$</button>
        </li>
        <li>
          <button
          className='hover:text-indigo-500 btn-empty'
            onClick={()=>{
              //Thêm page vào uRL hiện tại
              queryString = {...queryString,page: currentPage};
              const pageUrl = `/products?`+encodeQueryData(queryString)+`&price_min=100&price_max=300`;
              navigate(pageUrl);
            }} 
            type="button">$100 to 300$</button>
        </li>
        <li>
        <button
          className='hover:text-indigo-500 btn-empty'
            onClick={()=>{
              //Thêm page vào uRL hiện tại
              queryString = {...queryString,page: currentPage};
              const pageUrl = `/products?`+encodeQueryData(queryString)+`&price_min=300&price_max=600`;
              navigate(pageUrl);
            }} 
            type="button">$300 to 600$</button>
        </li>
        <li>
        <button
          className='hover:text-indigo-500 btn-empty'
            onClick={()=>{
              //Thêm page vào uRL hiện tại
              queryString = {...queryString,page: currentPage};
              const pageUrl = `/products?`+encodeQueryData(queryString)+`&price_min=600`;
              navigate(pageUrl);
            }} 
            type="button">{'>'}600$</button>
          </li>
      </ul>
    </div>
  );
};

export default ProductFilter;
