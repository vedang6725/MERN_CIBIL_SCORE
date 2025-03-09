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
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    updateAuth();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <Header user={user} handleLogout={handleLogout} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Tabs */}
        <div className="mb-10 border-b border-slate-200">
          <div className="flex space-x-12">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-4 font-medium cursor-pointer text-sm transition-all duration-200 ${
                activeTab === "overview"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("account")}
              className={`pb-4 font-medium cursor-pointer text-sm transition-all duration-200 ${
                activeTab === "account"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Profile Update
            </button>
            <button
              onClick={() => setActiveTab("billing")}
              className={`pb-4 font-medium cursor-pointer text-sm transition-all duration-200 ${
                activeTab === "billing"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-slate-500 hover:text-slate-700"
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
    if (score === 0) return "text-slate-600";
    if (score < 600) return "text-red-600";
    if (score < 700) return "text-amber-600";
    return "text-emerald-600";
  };

  // Get credit score description
  const getCreditScoreDescription = (score) => {
    if (score === 0) return "No Credit History";
    if (score < 600) return "Poor";
    if (score < 650) return "Average";
    if (score < 750) return "Very Good";
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

  // Get credit score ring color for the circular display
  const getCreditScoreRingColor = (score) => {
    if (score === 0) return "border-slate-300";
    if (score < 600) return "border-red-500";
    if (score < 650) return "border-amber-500";
    if (score < 750) return "border-emerald-500";
    return "border-indigo-500";
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, {user.name}!</h1>
        <p className="text-slate-600 text-lg">Here's an overview of your profile and credit health.</p>
      </div>

      {/* Credit Score Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Your Credit Score</h2>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
            <div className={`w-40 h-40 rounded-full bg-slate-50 border-8 ${getCreditScoreRingColor(user.creditScore)} flex items-center justify-center mb-6 md:mb-0 mx-auto md:mx-0 transition-all duration-300`}>
              <span className={`text-4xl font-bold ${getCreditScoreColor(user.creditScore)}`}>
                {user.creditScore}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">{getCreditScoreIcon(user.creditScore)}</span>
                <span className={`text-2xl font-semibold ${getCreditScoreColor(user.creditScore)}`}>
                  {getCreditScoreDescription(user.creditScore)}
                </span>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed">
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
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Loan Summary</h2>
            
            {user.loanInfo.hasTakenLoan === "no" ? (
              <div className="bg-slate-50 p-6 rounded-xl text-center">
                <p className="text-slate-600 text-lg">You have no existing loans.</p>
                <button className="mt-4 px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                  Explore Loan Options
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-slate-50 p-6 rounded-xl transition-all duration-300 hover:shadow-md">
                    <p className="text-sm font-medium text-slate-500 mb-2">Total Loans</p>
                    <p className="text-3xl font-bold text-slate-900">{user.loanInfo.numberOfLoans}</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl transition-all duration-300 hover:shadow-md">
                    <p className="text-sm font-medium text-slate-500 mb-2">EMI Bounced</p>
                    <p className={`text-3xl font-bold ${user.loanInfo.hasBouncedEMI === "yes" ? "text-red-600" : "text-slate-900"}`}>
                      {user.loanInfo.hasBouncedEMI === "yes" ? user.loanInfo.bouncedEMICount : 0}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl transition-all duration-300 hover:shadow-md">
                    <p className="text-sm font-medium text-slate-500 mb-2">Next Payment</p>
                    <p className="text-3xl font-bold text-slate-900">15 Mar</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl transition-all duration-300 hover:shadow-md">
                    <p className="text-sm font-medium text-slate-500 mb-2">Status</p>
                    <p className="text-xl font-bold text-emerald-600">Active</p>
                  </div>
                </div>

                {user.loanInfo.numberOfLoans > 0 && (
                  <div>
                    <h3 className="font-semibold text-slate-800 text-xl mb-4">Loan Details</h3>
                    <div className="space-y-4">
                      {user.loanInfo.loans.slice(0, Math.min(user.loanInfo.numberOfLoans, 2)).map((loan, index) => (
                        loan.loanAmount && (
                          <div key={index} className="bg-slate-50 p-6 rounded-xl transition-all duration-300 hover:shadow-md">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="font-medium text-lg text-slate-800">Loan {index + 1}</h4>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${loan.bouncedEmi > 0 ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"}`}>
                                {loan.bouncedEmi > 0 ? `${loan.bouncedEmi} EMI Missed` : "Good Standing"}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                              <div>
                                <p className="text-xs font-medium text-slate-500 mb-1">Loan Amount</p>
                                <p className="text-lg font-bold text-slate-900">₹{Number(loan.loanAmount).toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-slate-500 mb-1">Monthly EMI</p>
                                <p className="text-lg font-bold text-slate-900">₹{Number(loan.emi).toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-slate-500 mb-1">Interest Rate</p>
                                <p className="text-lg font-bold text-slate-900">8.5%</p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-slate-500 mb-1">Tenure</p>
                                <p className="text-lg font-bold text-slate-900">36 months</p>
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-200">
                              <div className="w-full bg-slate-200 rounded-full h-2.5">
                                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                              </div>
                              <div className="flex justify-between mt-2 text-xs text-slate-500">
                                <span>65% Complete</span>
                                <span>23 months remaining</span>
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
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Tips to Improve Your Credit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-xl transition-all duration-300 hover:shadow-md flex">
              <div className="mr-4 text-indigo-600 text-xl">📅</div>
              <div>
                <h3 className="font-medium text-slate-900 mb-1">Payment Timeliness</h3>
                <p className="text-slate-600">Make all loan payments on time to avoid penalties and maintain a good credit score.</p>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl transition-all duration-300 hover:shadow-md flex">
              <div className="mr-4 text-indigo-600 text-xl">💳</div>
              <div>
                <h3 className="font-medium text-slate-900 mb-1">Credit Utilization</h3>
                <p className="text-slate-600">Keep your credit utilization below 30% of your available credit limit.</p>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl transition-all duration-300 hover:shadow-md flex">
              <div className="mr-4 text-indigo-600 text-xl">🔍</div>
              <div>
                <h3 className="font-medium text-slate-900 mb-1">Regular Monitoring</h3>
                <p className="text-slate-600">Check your credit report regularly for errors and dispute inaccurate information.</p>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl transition-all duration-300 hover:shadow-md flex">
              <div className="mr-4 text-indigo-600 text-xl">🧩</div>
              <div>
                <h3 className="font-medium text-slate-900 mb-1">Credit Mix</h3>
                <p className="text-slate-600">Maintain a diverse mix of credit accounts to demonstrate your ability to manage different types of credit.</p>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <button className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-lg hover:bg-indigo-100 transition-colors duration-300">
              View All Credit Tips
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium text-slate-800">Download Report</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span className="text-sm font-medium text-slate-800">Payment History</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-slate-800">Schedule EMI</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-sm font-medium text-slate-800">Apply for Loan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;