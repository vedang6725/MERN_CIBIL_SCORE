import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ updateAuth }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            setUser({ 
                name: "Shivam Yadav", 
                email: "shivam.yadav@example.com",
                creditScore: 750, 
                subscribedPlan: "Premium",
                subscriptionDate: "January 15, 2025",
                nextBillingDate: "February 15, 2025",
                phoneNumber: "+91 9876543210"
            });
        }
    }, [navigate]);

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        updateAuth();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <div className="bg-blue-600 text-white h-10 w-10 rounded-lg flex items-center justify-center text-xl font-bold">
                                C
                            </div>
                            <h1 className="text-xl font-bold text-gray-800">CreditBoost</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center">
                                <span className="text-gray-600 mr-1">Hello,</span>
                                <span className="font-medium text-gray-800">{user.name}</span>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                                {user.name.charAt(0)}
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="mb-8 border-b border-gray-200">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`pb-4 font-medium text-sm ${
                                activeTab === "overview"
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab("account")}
                            className={`pb-4 font-medium text-sm ${
                                activeTab === "account"
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            Account Settings
                        </button>
                        <button
                            onClick={() => setActiveTab("billing")}
                            className={`pb-4 font-medium text-sm ${
                                activeTab === "billing"
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            Subscription & Billing
                        </button>
                    </div>
                </div>

                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <div className="space-y-6">
                        {/* Credit Score Section */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5">
                                <h2 className="text-xl font-semibold text-white">Your Credit Overview</h2>
                            </div>
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="mb-4 md:mb-0">
                                        <span className="text-gray-500 text-sm">Current Credit Score</span>
                                        <div className="flex items-end space-x-2">
                                            <span className="text-4xl font-bold text-gray-800">{user.creditScore}</span>
                                            <span className="text-sm text-green-600 font-medium pb-1">+15 pts this month</span>
                                        </div>
                                        <div className="mt-1 text-sm text-gray-500">
                                            <span className={`inline-block px-2 py-1 rounded-full ${
                                                user.creditScore >= 750 ? "bg-green-100 text-green-700" :
                                                user.creditScore >= 650 ? "bg-yellow-100 text-yellow-700" :
                                                "bg-red-100 text-red-700"
                                            }`}>
                                                {user.creditScore >= 750 ? "Excellent" :
                                                 user.creditScore >= 650 ? "Good" :
                                                 "Needs Improvement"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="text-sm text-gray-500">Credit Utilization</div>
                                            <div className="mt-1 text-xl font-semibold">28%</div>
                                            <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                                <div className="bg-green-500 h-full rounded-full" style={{ width: "28%" }}></div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="text-sm text-gray-500">On-time Payments</div>
                                            <div className="mt-1 text-xl font-semibold">98%</div>
                                            <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                                <div className="bg-blue-500 h-full rounded-full" style={{ width: "98%" }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition transform hover:scale-105">
                                        Full Credit Report
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">Credit Builder</h3>
                                <p className="mt-2 text-sm text-gray-600">Check your credit score and get personalized recommendations.</p>
                                <button className="mt-4 text-blue-600 font-medium text-sm hover:text-blue-800 flex items-center">
                                    Check Score 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">Profile Update</h3>
                                <p className="mt-2 text-sm text-gray-600">Keep your information up to date for accurate credit reporting.</p>
                                <button className="mt-4 text-green-600 font-medium text-sm hover:text-green-800 flex items-center">
                                    Update Profile
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">Subscription</h3>
                                <p className="mt-2 text-sm text-gray-600">Current Plan: <span className="font-medium text-purple-600">{user.subscribedPlan}</span></p>
                                <button className="mt-4 text-purple-600 font-medium text-sm hover:text-purple-800 flex items-center">
                                    Manage Subscription
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Tips & Recommendations */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-5">
                                <h2 className="text-xl font-semibold text-white">Tips & Recommendations</h2>
                            </div>
                            <div className="p-6">
                                <div className="divide-y divide-gray-200">
                                    <div className="py-4 flex">
                                        <div className="flex-shrink-0 mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-base font-medium text-gray-800">Keep Your Credit Utilization Low</h3>
                                            <p className="mt-1 text-sm text-gray-600">Aim to use less than 30% of your available credit to improve your score.</p>
                                        </div>
                                    </div>
                                    <div className="py-4 flex">
                                        <div className="flex-shrink-0 mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-base font-medium text-gray-800">Always Pay Bills On Time</h3>
                                            <p className="mt-1 text-sm text-gray-600">Payment history accounts for 35% of your credit score. Set up automatic payments.</p>
                                        </div>
                                    </div>
                                    <div className="py-4 flex">
                                        <div className="flex-shrink-0 mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-base font-medium text-gray-800">Monitor Your Credit Report</h3>
                                            <p className="mt-1 text-sm text-gray-600">Check for errors and disputes that could be affecting your score.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Account Settings Tab */}
                {activeTab === "account" && (
                    <div className="bg-white rounded-xl shadow-sm">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Settings</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={user.name}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        value={user.email}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={user.phoneNumber}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div className="pt-4">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Subscription & Billing Tab */}
                {activeTab === "billing" && (
                    <div className="bg-white rounded-xl shadow-sm">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Subscription & Billing</h2>
                            <div className="border border-gray-200 rounded-lg p-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800">Current Plan: <span className="text-blue-600">{user.subscribedPlan}</span></h3>
                                        <p className="text-sm text-gray-600 mt-1">Started on: {user.subscriptionDate}</p>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Active</span>
                                </div>
                                <div className="mt-4 text-sm text-gray-600">
                                    <p>Next billing date: <span className="font-medium">{user.nextBillingDate}</span></p>
                                </div>
                                <div className="mt-4 flex space-x-3">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition">
                                        Upgrade Plan
                                    </button>
                                    <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium transition">
                                        Cancel Subscription
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-800 mb-4">Billing History</h3>
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Feb 01, 2025</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">$29.99</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Paid</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">Download</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Jan 01, 2025</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">$29.99</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Paid</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">Download</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Dec 01, 2024</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">$29.99</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Paid</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">Download</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="bg-blue-600 text-white h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold">
                                C
                            </div>
                            <span className="text-gray-600">© 2025 CreditBoost. All rights reserved.</span>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <div className="flex space-x-6">
                                <a href="#" className="text-gray-500 hover:text-gray-700">Privacy Policy</a>
                                <a href="#" className="text-gray-500 hover:text-gray-700">Terms of Service</a>
                                <a href="#" className="text-gray-500 hover:text-gray-700">Contact Support</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;