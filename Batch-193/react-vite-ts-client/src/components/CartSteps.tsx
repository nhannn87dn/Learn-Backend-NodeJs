import { useShoppingCartStore } from "@/stores/useShoppingCartStore";
import React from "react";

const steps = [
  { label: "Giỏ hàng" },
  { label: "Thông tin" },
  { label: "Thanh toán" },
  { label: "Hoàn tất" },
];

const CartSteps = () => {
  const { cartSteps } = useShoppingCartStore((state) => state);
  return (
    <nav className="flex items-center justify-center gap-4 md:gap-8 py-6 mb-2 select-none">
      {steps.map((step, idx) => (
        <React.Fragment key={step.label}>
          <div className="flex items-center gap-2">
            <span
              className={
                `w-8 h-8 flex items-center justify-center rounded-full font-bold ` +
                (idx + 1 === cartSteps
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-600")
              }
            >
              {idx + 1}
            </span>
            <span className={idx + 1 === cartSteps ? "font-semibold text-blue-600" : "font-semibold text-blue-600 opacity-70"}>
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <span className="w-8 h-1 bg-gray-200 rounded-full md:w-16"></span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export default CartSteps