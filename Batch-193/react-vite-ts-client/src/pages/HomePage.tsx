import CategoryTree from "@/components/CategoryTree"
import ProductGridHome from "@/components/ProductGridHome"

const HomePage = () => {
  return (
    <main className="home-page container mx-auto my-5">
      <section className="section section-category-banner flex gap-x-[20px]">
          <div className="categories-tree w-[200px]">
            <CategoryTree />
          </div>
          <div className="home-banner flex-1 bg-slate-100 min-h-[300px]">
            <h1>Welcome to Our Store</h1>
            <p>Discover the best products for your needs</p>
          </div>
      </section>
      <ProductGridHome
        title="Garden1"
        linkMore="/category/garden1"
        catId="6878dd70c4303577d8af6f9e"
      />

       <ProductGridHome
        title="Beauty2"
        linkMore="/category/beauty2"
        catId="6878dd70c4303577d8af6fa0"
      />
    </main>
  )
}

export default HomePage