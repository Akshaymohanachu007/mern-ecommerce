import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { createOrder } from "../redux/thunks/orderThunks";

function PlaceOrder() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { cartItems } = useSelector(
    (state) => state.cart
  );

  const shippingAddress = JSON.parse(
    localStorage.getItem("shippingAddress")
  );

  const paymentMethod =
    localStorage.getItem("paymentMethod");

  const placeOrderHandler = async () => {
  const result = await dispatch(
    createOrder({
      orderItems: cartItems.map(item => ({
        ...item,
        product: item._id,  // Add this line
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice: cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      ),
      taxPrice: 100,
      shippingPrice: 50,
      totalPrice:
        cartItems.reduce(
          (acc, item) => acc + item.price * item.qty,
          0
        ) + 100 + 50,
    })
  );

  if (result.meta.requestStatus === "fulfilled") {
    navigate("/orders");
  }
};

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
      <h1 className="text-4xl font-bold mb-8">
        Place Order
      </h1>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between border-b pb-4"
          >
            <span>
              {item.name} x {item.qty}
            </span>

            <span>
              ₹{item.price * item.qty}
            </span>
          </div>
        ))}

        <button
          onClick={placeOrderHandler}
          className="w-full bg-black text-white py-4 rounded-xl text-lg font-bold"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default PlaceOrder;