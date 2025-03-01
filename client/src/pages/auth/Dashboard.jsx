import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ updateAuth }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            setUser({ name: "Shivam Yadav", creditScore: 750, subscribedPlan: "Premium" });
        }
    }, [navigate]);

    if (!user) return <h1>Loading...</h1>;

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6">Welcome, {user.name}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
            {/* Credit Score */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-lg font-semibold">Credit Builder</h2>
                <p className="text-gray-600 mt-2">Credit Score: <span className="font-bold">{user.creditScore}</span></p>
                <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 transition">
                    Check Score
                </button>
            </div>

            {/* Profile Update */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-lg font-semibold">Profile Update</h2>
                <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-600 transition">
                    Update Profile
                </button>
            </div>

            {/* Subscription */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-lg font-semibold">Subscription</h2>
                <p className="text-gray-600 mt-2">Subscribed Plan: <span className="font-bold">{user.subscribedPlan}</span></p>
                <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-red-600 transition">
                    Cancel Subscription
                </button>
            </div>
        </div>

        {/* Logout Button */}
        <button
            onClick={() => {
                localStorage.removeItem("token");
                updateAuth();
                navigate("/login");
            }}
            className="bg-gray-700 text-white px-6 py-3 mt-6 rounded-lg hover:bg-gray-800 transition"
        >
            Logout
        </button>
    </div>
    );
};

export default Dashboard;
