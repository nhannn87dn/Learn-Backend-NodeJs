import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductSkeleton = ({count}: {count: number})=>{
  const totalCards = [...Array(count + 1).keys()].slice(1);
  return (
    <section className="w-fit mx-auto grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4  gap-8 mt-10 mb-10">
          {
            totalCards.map((card)=> {
              return (
                <div key={`card${card}`} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                  <Skeleton height={280} />
                  <div className="px-4 py-3 w-72">
                    <Skeleton count={2} />
                  </div>
              </div>
              )
            })
          }
    </section>
  )
}

export default ProductSkeleton