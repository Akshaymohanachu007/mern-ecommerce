import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router-dom";

import {
  fetchProductDetails,
} from "../redux/thunks/productThunks";

import { addToCart } from "../redux/slices/cartSlice";

function ProductDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  const { product, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty,
      })
    );

    navigate("/cart");
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-xl">
      <img
        src={product?.image}
        alt={product?.name}
        className="rounded-2xl w-full"
      />

      <div>
        <h1 className="text-5xl font-bold mb-4">
          {product?.name}
        </h1>

        <p className="text-gray-600 mb-4 text-lg">
          {product?.description}
        </p>

        <p className="text-4xl font-bold text-green-600 mb-6">
          ₹{product?.price}
        </p>

        {/* Quantity */}
        <div className="mb-6">
          <label className="block mb-2 font-bold">
            Quantity
          </label>

          <select
            value={qty}
            onChange={(e) =>
              setQty(Number(e.target.value))
            }
            className="border p-3 rounded-lg"
          >
            {[...Array(product?.countInStock || 1).keys()].map(
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
        </div>

        <button
          onClick={addToCartHandler}
          className="bg-black text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-800 transition"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;