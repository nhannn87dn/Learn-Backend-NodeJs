import HomeSection from "@/components/blocks/HomeSection"
import BannerHome from "./components/BannerHome"
import CategoriesTreeHome from "./components/CategoriesTreeHome"
import LaptopProductsHome from "./components/LaptopProductsHome"
import MobileProductsHome from "./components/MobileProductsHome"

const HomePage = () => {
  return (
    <main className="home-page container mx-auto py-6">
        <section className="section section-banner-home-cate-tree flex gap-x-5">
          <CategoriesTreeHome />
          <BannerHome />
        </section>
       <HomeSection title="Laptop" viewMoreLink="/categories/laptop-apple">
            <LaptopProductsHome />
        </HomeSection>
        
        <HomeSection title="Mobile" viewMoreLink="/categories/mobile">
          {/* New arrivals content goes here */}
          <MobileProductsHome />
        </HomeSection>
    </main>
  )
}

export default HomePage