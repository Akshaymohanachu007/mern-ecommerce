
import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useSelector } from "react-redux";

import axiosInstance from "../../api/axiosInstance";

function ProductEdit() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { userInfo } = useSelector(
    (state) => state.auth
  );

  const [name, setName] = useState("");

  const [image, setImage] = useState("");

  const [brand, setBrand] = useState("");

  const [category, setCategory] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] = useState("");

  const [countInStock, setCountInStock] =
    useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axiosInstance.get(
        `/products/${id}`
      );

      setName(data.name);
      setImage(data.image);
      setBrand(data.brand);
      setCategory(data.category);
      setDescription(data.description);
      setPrice(data.price);
      setCountInStock(data.countInStock);
    };

    fetchProduct();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axiosInstance.put(
        `/products/${id}`,
        {
          name,
          image,
          brand,
          category,
          description,
          price,
          countInStock,
        },
        config
      );

      navigate("/admin/products");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
      <h1 className="text-4xl font-bold mb-8">
        Edit Product
      </h1>

      <form
        onSubmit={submitHandler}
        className="space-y-5"
      >
        <input
          type="text"
          placeholder="Product Name"
          className="w-full border p-4 rounded-xl"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Image URL"
          className="w-full border p-4 rounded-xl"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Brand"
          className="w-full border p-4 rounded-xl"
          value={brand}
          onChange={(e) =>
            setBrand(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Category"
          className="w-full border p-4 rounded-xl"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <textarea
          placeholder="Description"
          className="w-full border p-4 rounded-xl"
          rows="5"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        ></textarea>

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-4 rounded-xl"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Stock Count"
          className="w-full border p-4 rounded-xl"
          value={countInStock}
          onChange={(e) =>
            setCountInStock(e.target.value)
          }
        />

        <button className="w-full bg-black text-white py-4 rounded-xl text-lg font-bold">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default ProductEdit;