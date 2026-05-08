import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import axiosInstance from "../../api/axiosInstance";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const { userInfo } = useSelector(
    (state) => state.auth
  );

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axiosInstance.get(
        "/users",
        config
      );

      setUsers(data);

      setLoading(false);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message
      );

      setLoading(false);
    }
  };

  // Delete user
  const deleteHandler = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user?"
      )
    ) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        await axiosInstance.delete(
          `/users/${id}`,
          config
        );

        fetchUsers();
      } catch (error) {
        alert(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Manage Users
        </h1>
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
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Admin
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b"
              >
                <td className="p-4 font-bold">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.isAdmin
                    ? "Yes"
                    : "No"}
                </td>

                <td className="p-4 flex gap-4">
                  <Link
                    to={`/admin/users/${user._id}/edit`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      deleteHandler(user._id)
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

export default AdminUsers;