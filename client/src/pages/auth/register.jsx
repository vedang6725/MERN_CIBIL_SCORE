import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const userInfo = {
            name,
            email,
            password
        };

        try {
            const response = await axios.post("http://localhost:3001/user/signup", userInfo);

            setSuccess(response.data.message);
            setName("");
            setEmail("");
            setPassword("");
            alert("Signup Successful!");

        } catch (error) {
            console.error("Error:", error.response?.data?.message || error.message);
            setError(error.response?.data?.message || "Signup failed. Please try again.");
            alert("Error: " + (error.response?.data?.message || "Signup failed"));
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Create an Account</h2>
                
                {error && <p className="text-red-400 text-center">{error}</p>}
                {success && <p className="text-green-400 text-center">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <label className="block text-white text-sm mb-1">Full Name</label>
                        <div className="flex items-center border bg-white/30 backdrop-blur-md p-2 rounded-lg focus-within:ring-2 focus-within:ring-white">
                            <FaUser className="text-white text-lg mx-2" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent outline-none text-white placeholder-white"
                                placeholder="Enter full name"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-white text-sm mb-1">Email</label>
                        <div className="flex items-center border bg-white/30 backdrop-blur-md p-2 rounded-lg focus-within:ring-2 focus-within:ring-white">
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
                        <div className="flex items-center border bg-white/30 backdrop-blur-md p-2 rounded-lg focus-within:ring-2 focus-within:ring-white">
                            <FaLock className="text-white text-lg mx-2" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent outline-none text-white placeholder-white"
                                placeholder="Enter password"
                                required
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-blue-600 font-semibold p-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition transform hover:scale-105"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-white text-sm text-center mt-4">
                    Already have an account?
                    <Link to="/login" className="underline hover:text-yellow-300"> Login</Link>
                </p>

            </div>
        </div>
    );
};

export default Signup;
