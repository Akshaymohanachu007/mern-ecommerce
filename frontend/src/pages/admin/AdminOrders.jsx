import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import axiosInstance from "../../api/axiosInstance";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const { userInfo } = useSelector(
    (state) => state.auth
  );

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axiosInstance.get(
        "/orders",
        config
      );

      setOrders(data);

      setLoading(false);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message
      );

      setLoading(false);
    }
  };

  // Mark Delivered
  const deliverHandler = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axiosInstance.put(
        `/orders/${id}/deliver`,
        {},
        config
      );

      fetchOrders();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Manage Orders
      </h1>

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

      {/* Orders Table */}
      <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">
                Order ID
              </th>

              <th className="p-4 text-left">
                User
              </th>

              <th className="p-4 text-left">
                Total
              </th>

              <th className="p-4 text-left">
                Paid
              </th>

              <th className="p-4 text-left">
                Delivered
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b"
              >
                <td className="p-4">
                  {order._id}
                </td>

                <td className="p-4">
                  {order.user?.name}
                </td>

                <td className="p-4">
                  ₹{order.totalPrice}
                </td>

                <td className="p-4">
                  {order.isPaid
                    ? "Paid"
                    : "Not Paid"}
                </td>

                <td className="p-4">
                  {order.isDelivered
                    ? "Delivered"
                    : "Pending"}
                </td>

                <td className="p-4">
                  {!order.isDelivered && (
                    <button
                      onClick={() =>
                        deliverHandler(order._id)
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                      Mark Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;