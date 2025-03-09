import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AccountSettings from "./AccountSettings";
import SubscriptionBilling from "./SubscriptionBilling";

const Dashboard = ({ updateAuth }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      // Get combined data from localStorage
      const dashboardData = JSON.parse(localStorage.getItem("dashboardData"));
      const userData = JSON.parse(localStorage.getItem("user"));
      
      if (!dashboardData) {
        navigate("/loan-information");
        return;
      }
      
      setUser({
        name: userData.name,
        email: userData.email,
        creditScore: dashboardData.creditScore,
        subscribedPlan: "Premium",
        subscriptionDate: "January 15, 2025",
        nextBillingDate: "February 15, 2025",
        phoneNumber: dashboardData.mobile || "+91 9876543210",
        pan: dashboardData.pan,
        dob: dashboardData.dob,
        loanInfo: dashboardData.loanInfo
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
      <Header user={user} handleLogout={handleLogout} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-4 font-medium cursor-pointer text-sm ${
                activeTab === "overview"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("account")}
              className={`pb-4 font-medium cursor-pointer text-sm ${
                activeTab === "account"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Profile update
            </button>
            <button
              onClick={() => setActiveTab("billing")}
              className={`pb-4 font-medium cursor-pointer text-sm ${
                activeTab === "billing"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Subscription & Billing
            </button>
          </div>
        </div>

        {activeTab === "overview" && <Overview user={user} />}
        {activeTab === "account" && <AccountSettings user={user} />}
        {activeTab === "billing" && <SubscriptionBilling user={user} />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const Overview = ({ user }) => {
  // Determine credit score color
  const getCreditScoreColor = (score) => {
    if (score === 0) return "text-gray-600";
    if (score < 600) return "text-red-600";
    if (score < 700) return "text-yellow-600";
    return "text-green-600";
  };

  // Get credit score description
  const getCreditScoreDescription = (score) => {
    if (score === 0) return "No Credit History";
    if (500 <= 600) return "Poor";
    if (600 <= 650) return "Poor";
    if (650 <= 750) return " Very Good";
    return "Excellent";
  };

  // Get credit score icon
  const getCreditScoreIcon = (score) => {
    if (score === 0) {
      return "⚪";
    } else if (score < 600) {
      return "🔴";
    } else if (score < 650) {
      return "🟠";
    } else if (score < 750) {
      return "🟢";
    } else {
      return "✨";
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
        <p className="text-gray-600">Here's an overview of your profile and credit health.</p>
      </div>

      {/* Credit Score */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Credit Score</h2>
          <div className="flex items-center space-x-4">
            <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-gray-200 flex items-center justify-center">
              <span className={`text-3xl font-bold ${getCreditScoreColor(user.creditScore)}`}>
                {user.creditScore}
              </span>
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-2xl mr-2">{getCreditScoreIcon(user.creditScore)}</span>
                <span className={`text-xl font-semibold ${getCreditScoreColor(user.creditScore)}`}>
                  {getCreditScoreDescription(user.creditScore)}
                </span>
              </div>
              <p className="text-gray-600 mt-1">
                {user.creditScore === 0
                  ? "You have no credit history yet. Taking a loan and making regular payments can help establish your credit score."
                  : user.creditScore < 600
                  ? "Your credit score needs improvement. Focus on paying existing loans on time."
                  : user.creditScore < 650
                  ? "Your credit score is fair. Continue making regular payments to improve it."
                  : user.creditScore < 750
                  ? "You have a good credit score. Keep up with timely payments."
                  : "Excellent credit score! You're likely to get the best loan terms."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Summary */}
      {user.loanInfo && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Loan Summary</h2>
            
            {user.loanInfo.hasTakenLoan === "no" ? (
              <p className="text-gray-600">You have no existing loans.</p>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Total Number of Loans</p>
                    <p className="text-2xl font-semibold">{user.loanInfo.numberOfLoans}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">EMI Bounced</p>
                    <p className="text-2xl font-semibold">
                      {user.loanInfo.hasBouncedEMI === "yes" ? user.loanInfo.bouncedEMICount : 0}
                    </p>
                  </div>
                </div>

                {user.loanInfo.numberOfLoans > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">Loan Details</h3>
                    <div className="space-y-4">
                      {user.loanInfo.loans.slice(0, Math.min(user.loanInfo.numberOfLoans, 2)).map((loan, index) => (
                        loan.loanAmount && (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium">Loan {index + 1}</h4>
                              <span className={loan.bouncedEmi > 0 ? "text-red-500 text-sm" : "text-green-500 text-sm"}>
                                {loan.bouncedEmi > 0 ? `${loan.bouncedEmi} EMI Missed` : "Good Standing"}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-gray-500">Loan Amount</p>
                                <p className="font-semibold">₹{Number(loan.loanAmount).toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Monthly EMI</p>
                                <p className="font-semibold">₹{Number(loan.emi).toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Credit Tips */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Tips to Improve Your Credit</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Make all loan payments on time</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Keep your credit utilization low</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Don't apply for too many loans in a short period</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Check your credit report regularly for errors</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Maintain a diverse mix of credit accounts</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;