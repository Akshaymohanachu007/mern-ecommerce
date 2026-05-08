import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useSelector } from "react-redux";

import axiosInstance from "../../api/axiosInstance";

function UserEdit() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { userInfo } = useSelector(
    (state) => state.auth
  );

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [isAdmin, setIsAdmin] =
    useState(false);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axiosInstance.get(
          `/users/${id}`,
          config
        );

        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
      } catch (error) {
        alert(
          error.response?.data?.message ||
            error.message
        );
      }
    };

    fetchUser();
  }, [id]);

  // Update user
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axiosInstance.put(
        `/users/${id}`,
        {
          name,
          email,
          isAdmin,
        },
        config
      );

      navigate("/admin/users");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
      <h1 className="text-4xl font-bold mb-8">
        Edit User
      </h1>

      <form
        onSubmit={submitHandler}
        className="space-y-5"
      >
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-4 rounded-xl"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-4 rounded-xl"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        {/* Admin Checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) =>
              setIsAdmin(e.target.checked)
            }
            className="w-5 h-5"
          />

          <label className="text-lg font-semibold">
            Is Admin
          </label>
        </div>

        <button className="w-full bg-black text-white py-4 rounded-xl text-lg font-bold">
          Update User
        </button>
      </form>
    </div>
  );
}

export default UserEdit;