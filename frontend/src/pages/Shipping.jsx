import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Shipping() {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");

  const [city, setCity] = useState("");

  const [postalCode, setPostalCode] =
    useState("");

  const [country, setCountry] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        address,
        city,
        postalCode,
        country,
      })
    );

    navigate("/payment");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
      <h1 className="text-4xl font-bold mb-8">
        Shipping
      </h1>

      <form
        onSubmit={submitHandler}
        className="space-y-5"
      >
        <input
          type="text"
          placeholder="Address"
          className="w-full border p-4 rounded-xl"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="City"
          className="w-full border p-4 rounded-xl"
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Postal Code"
          className="w-full border p-4 rounded-xl"
          value={postalCode}
          onChange={(e) =>
            setPostalCode(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Country"
          className="w-full border p-4 rounded-xl"
          value={country}
          onChange={(e) =>
            setCountry(e.target.value)
          }
        />

        <button className="w-full bg-black text-white py-4 rounded-xl font-bold">
          Continue
        </button>
      </form>
    </div>
  );
}

export default Shipping;