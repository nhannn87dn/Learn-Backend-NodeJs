import { useCart } from "../hooks/useCart";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SETTINGS } from "../constants/settings";
import axios from "axios";
import { useState } from "react";

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
    note: yup.string().optional(),
    payment_type: yup.number().required().positive().min(1).max(4),
  })
  .required();

//Typescript for Form Data
type FormData = yup.InferType<typeof schema>;

const CartPage = () => {
  const {
    products,
    increase,
    decrement,
    removeFromCart,
    totalAmount,
    clearCart,
  } = useCart();

  const [isDone, setIsDone] = useState(false);
  const [order, setOrder] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
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
      note: data.note,
      payment_type: data.payment_type,
      //Danh sách sản phẩm
      order_items: products,
    };

    console.log(payload);

    //return false;
    //Gửi payload lên để tạo đơn
    try {
      const response = await axios.post(
        `${SETTINGS.URL_API}/v1/orders`,
        payload
      );
      console.log("<<=== 🚀 response ===>>", response.data);
      if (response?.data && response.data.statusCode === 201) {
        //1. Clear form
        reset();
        //2. clear state cart
        clearCart();
        //3. Show Popup đặt hàng thành công
        setIsDone(true);
        setOrder(response.data.data);
      } else {
        //xu ly viecj khac
      }
    } catch (error) {
      console.log("<<=== 🚀 error ===>>", error);
    }
  };

  //Nếu mà product là []
  if (products.length === 0 && order === null) return <div>Giỏ hàng trống</div>;

  if (products.length === 0 && isDone && order !== null)
    return (
      <div>
        <h1>Đặt hàng thành công !</h1>
        <p>Ma Don hang:{order.id}</p>
      </div>
    );

  //Nếu khác []
  return (
    <div>
      <h1 className="text-2xl font-bold my-4">CartPage</h1>
      <ul className="flex flex-col gap-y-4">
        {products.map((p) => {
          return (
            <li className="item flex gap-x-4" key={p.product}>
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
                    console.log(p.product);
                    decrement(p.product);
                  }}
                >
                  -
                </button>
                <input className="w-[40px]" type="text" value={p.quantity} />
                <button
                  onClick={() => {
                    console.log(p.product);
                    increase(p.product);
                  }}
                >
                  +
                </button>
              </span>
              <span>
                <button
                  onClick={() => {
                    removeFromCart(p.product);
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
          <div className="input_item">
            <input placeholder="Order Note" {...register("note")} />
            <p>{errors.note?.message}</p>
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
