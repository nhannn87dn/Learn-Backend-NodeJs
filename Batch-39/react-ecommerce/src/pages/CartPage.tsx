import { useCart } from "../hooks/useCart";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SETTINGS } from "../constants/settings";
import axios from "axios";

const schema = yup
  .object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().email().required(),
    street: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip_code: yup.string().optional(),
    payment_type: yup.number().required().positive().min(1).max(4),
  })
  .required();

//Typescript for Form Data
type FormData = yup.InferType<typeof schema>;

const CartPage = () => {
  const { products, increase, decrement, removeFromCart, totalAmount } =
    useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FormData) => {
    console.log(data);
    //Gọi API tạo đơn
    const payload = {
      customer: {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        email: data.email,
        street: data.street,
        city: data.city,
        state: data.state,
        zip_code: data.zip_code,
      },
      payment_type: data.payment_type,
      //Danh sách sản phẩm
      products,
    };
    //Gửi payload lên để tạo đơn
    try {
      const response = await axios.post(
        `${SETTINGS.URL_API}/v1/orders`,
        payload
      );
      console.log("<<=== 🚀 response ===>>", response);
    } catch (error) {
      console.log("<<=== 🚀 error ===>>", error);
    }
  };

  //Nếu mà product là []
  if (products.length === 0) return <div>Giỏ hàng trống</div>;
  //Nếu khác []
  return (
    <div>
      <h1 className="text-2xl font-bold my-4">CartPage</h1>
      <ul className="flex flex-col gap-y-4">
        {products.map((p) => {
          return (
            <li className="item flex gap-x-4" key={p._id}>
              <div className="thumb w-[60px]">
                <img
                  className="w-full h-auto"
                  height={40}
                  src={p.thumbnail}
                  alt={p.product_name}
                />
              </div>
              <span className="font-bold">{p.product_name}</span>
              <span className="text-red-700">{p.price}</span>
              <span>
                <button
                  onClick={() => {
                    console.log(p._id);
                    decrement(p._id);
                  }}
                >
                  -
                </button>
                <input className="w-[40px]" type="text" value={p.quantity} />
                <button
                  onClick={() => {
                    console.log(p._id);
                    increase(p._id);
                  }}
                >
                  +
                </button>
              </span>
              <span>
                <button
                  onClick={() => {
                    removeFromCart(p._id);
                  }}
                  className="btn_delete"
                >
                  Xóa
                </button>
              </span>
            </li>
          );
        })}
        <li className="total">Tổng tiền: {totalAmount}</li>
      </ul>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold my-4">Thông tin giao hàng</h2>
        <div className="input_group flex gap-x-3 my-2">
          <div className="input_item">
            <input placeholder="First Name" {...register("first_name")} />
            <p>{errors.first_name?.message}</p>
          </div>
          <div className="input_item">
            <input placeholder="Last Name" {...register("last_name")} />
            <p>{errors.last_name?.message}</p>
          </div>
        </div>
        <div className="input_group flex gap-x-3 my-2">
          <div className="input_item">
            <input placeholder="Phone" {...register("phone")} />
            <p>{errors.phone?.message}</p>
          </div>
          <div className="input_item">
            <input placeholder="Email" {...register("email")} />
            <p>{errors.email?.message}</p>
          </div>
        </div>
        <div className="input_group my-2">
          <input placeholder="Street" {...register("street")} />
          <p>{errors.street?.message}</p>
        </div>
        <div className="input_group my-2">
          <input placeholder="City" {...register("city")} />
          <p>{errors.city?.message}</p>
        </div>
        <div className="input_group my-2">
          <input placeholder="State" {...register("state")} />
          <p>{errors.state?.message}</p>
        </div>
        <div className="input_group my-2">
          <input placeholder="Zip Code" {...register("zip_code")} />
          <p>{errors.zip_code?.message}</p>
        </div>
        <h2 className="text-2xl font-bold my-4">Phương thức thanh toán</h2>
        <div className="payment_methods">
          <div className="input_group flex flex-col my-2">
            <label>
              <input
                checked
                type="radio"
                value={1}
                {...register("payment_type")}
              />{" "}
              COD
            </label>
            <label>
              <input type="radio" value={2} {...register("payment_type")} />{" "}
              Credit
            </label>
            <label>
              <input type="radio" value={3} {...register("payment_type")} /> ATM
            </label>
            <label>
              <input type="radio" value={4} {...register("payment_type")} />{" "}
              Cash
            </label>
            <p>{errors.payment_type?.message}</p>
          </div>
        </div>
        <div className="actions">
          <button type="submit">Đặt hàng</button>
        </div>
      </form>
    </div>
  );
};

export default CartPage;
