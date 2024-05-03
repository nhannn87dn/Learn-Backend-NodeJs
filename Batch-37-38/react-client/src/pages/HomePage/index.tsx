import Products from "../../components/ui/Products";

const HomePage = () => {
  return (
    <div>
      <section>banner</section>
      <section className="products-list my-5">
        <Products title="Road" id="65f2be7b1d80b8bd5e195c38" />
      </section>
      <section className="products-list my-5">
        <Products title="Mountain" id="65f2be7b1d80b8bd5e195c39" />
      </section>
    </div>
  );
};

export default HomePage;
