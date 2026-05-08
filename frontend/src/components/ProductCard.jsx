import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="h-60 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">
          {product.name}
        </h2>

        <p className="text-gray-600 mb-2">
          {product.brand}
        </p>

        <p className="text-2xl font-bold text-green-600 mb-4">
          ₹{product.price}
        </p>

        <Link
          to={`/product/${product._id}`}
          className="block text-center bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        >
          View Product
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;