import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { removeFromCart, addToCart, } from "../redux/slices/cartSlice";

import { useNavigate } from "react-router-dom";

function Cart() {
    const dispatch = useDispatch();

    const { cartItems } = useSelector(
        (state) => state.cart
    );

    const removeHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const qtyChangeHandler = (item, qty) => {
        dispatch(
            addToCart({
                ...item,
                qty: Number(qty),
            })
        );
    };

    const navigate = useNavigate();

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">
                Shopping Cart
            </h1>

            {cartItems.length === 0 ? (
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <p className="text-xl text-gray-600">
                        Cart is empty
                    </p>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white p-4 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-4"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-32 h-32 object-cover rounded-xl"
                                />

                                <div className="flex-grow">
                                    <Link
                                        to={`/product/${item._id}`}
                                        className="text-2xl font-bold"
                                    >
                                        {item.name}
                                    </Link>

                                    <p className="text-green-600 text-xl font-bold mt-2">
                                        ₹{item.price}
                                    </p>
                                </div>

                                {/* Quantity */}
                                <select
                                    value={item.qty}
                                    onChange={(e) =>
                                        qtyChangeHandler(
                                            item,
                                            e.target.value
                                        )
                                    }
                                    className="border p-2 rounded-lg"
                                >
                                    {[...Array(item.countInStock).keys()].map(
                                        (x) => (
                                            <option
                                                key={x + 1}
                                                value={x + 1}
                                            >
                                                {x + 1}
                                            </option>
                                        )
                                    )}
                                </select>

                                {/* Remove */}
                                <button
                                    onClick={() =>
                                        removeHandler(item._id)
                                    }
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg h-fit">
                        <h2 className="text-2xl font-bold mb-4">
                            Cart Summary
                        </h2>

                        <p className="text-lg mb-2">
                            Items:
                            {" "}
                            {cartItems.reduce(
                                (acc, item) => acc + item.qty,
                                0
                            )}
                        </p>

                        <p className="text-2xl font-bold text-green-600 mb-6">
                            ₹
                            {cartItems.reduce(
                                (acc, item) =>
                                    acc + item.qty * item.price,
                                0
                            )}
                        </p>

                        <button
                            onClick={() => navigate("/shipping")}
                            className="w-full bg-black text-white py-4 rounded-xl text-lg font-bold hover:bg-gray-800 transition"
                        >
                            Proceed To Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;