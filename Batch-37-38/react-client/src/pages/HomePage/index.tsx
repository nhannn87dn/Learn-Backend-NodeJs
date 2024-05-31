import Products from "../../components/ui/Products";

const HomePage = () => {
  return (
    <div>
      <section>banner</section>
      <section className="products-list my-5">
        <Products title="Road" id="66443b3b5f8bf0edce7a4e2f" />
      </section>
      <section className="products-list my-5">
        <Products title="Mountain" id="66443b3b5f8bf0edce7a4e2d" />
      </section>
    </div>
  );
};

export default HomePage;
