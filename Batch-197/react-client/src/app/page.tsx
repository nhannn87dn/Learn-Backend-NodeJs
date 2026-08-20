import CategoriesTree from "@/components/blocks/CategoriesTree";
import HomeNewArticle from "@/components/blocks/HomeNewArticle";
import HomeProducts from "@/components/blocks/HomeProducts";



const HomePage = () => {
 
  return (
    <>
     <section className="hero flex gap-5">
        <div className="categories_tree w-1/4 bg-gray-100 p-5 rounded-lg">
            <CategoriesTree />
        </div>
       
        <div className="banner_hero w-3/4 bg-gray-200 p-5 rounded-lg h-[300px]">

        </div>
      </section>
      <HomeProducts categoryId="6a6dd690b74b5aeea306dd71" />
      <HomeNewArticle />
    </>
  )
}

export default HomePage