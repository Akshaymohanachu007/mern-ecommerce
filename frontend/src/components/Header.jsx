import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

function Header() {
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header className="bg-black text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link
                    to="/"
                    className="text-3xl font-extrabold tracking-wide"
                >
                    VIBE SHOP
                </Link>

                <nav className="flex items-center gap-6 text-lg">
                    <Link to="/">Home</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/orders">Orders</Link>
                    {userInfo?.isAdmin && (
                        <Link to="/admin/dashboard">
                            Admin
                        </Link>
                    )}
                    <Link to="/contact">Contact</Link>

                    {userInfo ? (
                        <div className="flex items-center gap-4">
                            <span className="font-semibold">
                                {userInfo.name}
                            </span>

                            <button
                                onClick={logoutHandler}
                                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link
                                to="/login"
                                className="bg-white text-black px-4 py-2 rounded font-semibold"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="border border-white px-4 py-2 rounded"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;