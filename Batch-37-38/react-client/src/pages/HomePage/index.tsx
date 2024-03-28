import Products from "../../components/ui/Products"

const HomePage = () => {
  return (
    <div>
      <section>banner</section>
      <section className="products-list my-5">
        <Products title="Road" id='6601616b922ab0bd14db3058' />
      </section>
      <section className="products-list my-5">
        <Products title="Mountain" id='6601616b922ab0bd14db3059' />
      </section>
    </div>
  )
}

export default HomePage