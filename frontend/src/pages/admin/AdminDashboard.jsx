import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        <Link
          to="/admin/products"
          className="bg-white p-10 rounded-2xl shadow-xl text-center hover:scale-105 transition"
        >
          <h2 className="text-3xl font-bold mb-4">
            Products
          </h2>

          <p>Manage Products</p>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white p-10 rounded-2xl shadow-xl text-center hover:scale-105 transition"
        >
          <h2 className="text-3xl font-bold mb-4">
            Orders
          </h2>

          <p>Manage Orders</p>
        </Link>

        <Link
          to="/admin/users"
          className="bg-white p-10 rounded-2xl shadow-xl text-center hover:scale-105 transition"
        >
          <h2 className="text-3xl font-bold mb-4">
            Users
          </h2>

          <p>Manage Users</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;