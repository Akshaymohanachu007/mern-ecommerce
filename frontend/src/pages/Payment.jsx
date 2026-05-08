import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] =
    useState("Cash On Delivery");

  const submitHandler = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "paymentMethod",
      paymentMethod
    );

    navigate("/placeorder");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
      <h1 className="text-4xl font-bold mb-8">
        Payment Method
      </h1>

      <form
        onSubmit={submitHandler}
        className="space-y-5"
      >
        <select
          className="w-full border p-4 rounded-xl"
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(e.target.value)
          }
        >
          <option>
            Cash On Delivery
          </option>

          <option>UPI</option>

          <option>Credit Card</option>
        </select>

        <button className="w-full bg-black text-white py-4 rounded-xl font-bold">
          Continue
        </button>
      </form>
    </div>
  );
}

export default Payment;