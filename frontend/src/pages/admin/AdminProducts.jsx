import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import axiosInstance from "../../api/axiosInstance";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const { userInfo } = useSelector(
    (state) => state.auth
  );

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get(
        "/products"
      );

      setProducts(data);

      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);

      setLoading(false);
    }
  };

  // Delete product
  const deleteHandler = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete?"
      )
    ) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        await axiosInstance.delete(
          `/products/${id}`,
          config
        );

        fetchProducts();
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Manage Products
        </h1>

        <Link
          to="/admin/products/create"
          className="bg-black text-white px-6 py-3 rounded-xl font-bold"
        >
          + Add Product
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <h2 className="text-2xl font-bold">
          Loading...
        </h2>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-200 p-4 rounded mb-4">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">
                Image
              </th>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Price
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b"
              >
                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </td>

                <td className="p-4 font-bold">
                  {product.name}
                </td>

                <td className="p-4">
                  ₹{product.price}
                </td>

                <td className="p-4">
                  {product.category}
                </td>

                <td className="p-4 flex gap-4">
                  <Link
                    to={`/admin/products/${product._id}/edit`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      deleteHandler(product._id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;