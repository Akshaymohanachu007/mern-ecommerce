import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchMyOrders } from "../redux/thunks/orderThunks";

function Orders() {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      {loading && <h2>Loading...</h2>}

      {error && (
        <div className="bg-red-200 p-4 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">
                Order ID
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;