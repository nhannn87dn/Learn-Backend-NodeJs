import CategoriesTree from "../components/CategoriesTree";

export default function HomePage() {
  return (
    <>
    <section className="my-3" id="section-banner-home">
       <div className="container mx-auto">
          <div className="section-banner-wrapper flex gap-x-[20px]">
                <nav className="categories-tree w-[220px] bg-white p-3">
                    <CategoriesTree />
                </nav>
                <div className="banner-home flex-auto bg-slate-100">
                    <h1>Carousel</h1>
                </div>
          </div>
       </div>
    </section>
    </>
  )
}
