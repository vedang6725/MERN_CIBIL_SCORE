import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ updateAuth }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post("http://localhost:3001/user/login", { email, password });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                updateAuth(); // Update App.jsx state
                navigate("/userinput");
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error.response?.data?.message || error.message);
            setError(error.response?.data?.message || "Invalid email or password.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Welcome DBNPE</h2>

                {error && <p className="text-red-400 text-center">{error}</p>}

                <form onSubmit={handleLogin}>
                    <div className="mb-4 relative">
                        <label className="block text-white text-sm mb-1">Email</label>
                        <div className="flex items-center border bg-white/30 backdrop-blur-md p-2 rounded-lg">
                            <FaEnvelope className="text-white text-lg mx-2" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent outline-none text-white placeholder-white"
                                placeholder="Enter email address"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6 relative">
                        <label className="block text-white text-sm mb-1">Password</label>
                        <div className="flex items-center border bg-white/30 backdrop-blur-md p-2 rounded-lg">
                            <FaLock className="text-white text-lg mx-2" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent outline-none text-white placeholder-white"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-blue-600 font-semibold p-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition transform hover:scale-105"
                    >
                        Login
                    </button>
                </form>

                <p className="text-white text-sm text-center mt-4">
                    Don't have an account?
                    <Link to="/signup" className="underline hover:text-yellow-300"> Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
