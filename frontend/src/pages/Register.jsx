import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/thunks/authThunks";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const result = await dispatch(registerUser({ name, email, password }));
    
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Register
        </h1>
        
        {error && (
          <div className="bg-red-200 p-4 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={submitHandler} className="space-y-5">
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-4 rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-4 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-4 rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button 
            className="w-full bg-black text-white py-4 rounded-xl text-lg font-bold hover:bg-gray-800 transition"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        
        <p className="text-center mt-6 text-gray-600">
          Already have an account?
          <Link to="/login" className="text-black font-bold ml-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;