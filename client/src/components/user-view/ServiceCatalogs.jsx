import { useState, useEffect } from "react";


const ServiceCatalogs = () => {
  const [user, setUser] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  
  useEffect(() => {
    // Get user data from localStorage
    const dashboardData = JSON.parse(localStorage.getItem("dashboardData"));
    const userData = JSON.parse(localStorage.getItem("user"));
    
    if (dashboardData && userData) {
      setUser({
        name: userData.name,
        email: userData.email,
        creditScore: dashboardData.creditScore || 0,
      });
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  // Define service categories
  const categories = [
    { id: "all", name: "All Services" },
    { id: "credit", name: "Credit Services" },
    { id: "loans", name: "Loan Services" },
    { id: "financial", name: "Financial Planning" },
    { id: "premium", name: "Premium Services" }
  ];

  // Define all services with their credit score requirements
  const allServices = [
    {
      id: 1,
      title: "Basic Credit Report",
      description: "Access your basic credit report with score and summary.",
      category: "credit",
      icon: "📊",
      free: true,
      minCreditScore: 0,
      ctaText: "View Report"
    },
    {
      id: 2,
      title: "Credit Score Monitoring",
      description: "Get monthly updates on your credit score changes.",
      category: "credit",
      icon: "📈",
      free: true,
      minCreditScore: 0,
      ctaText: "Activate Now"
    },
    {
      id: 3,
      title: "Credit Improvement Plan",
      description: "Personalized plan to improve your credit score.",
      category: "credit",
      icon: "🔍",
      free: false,
      minCreditScore: 0,
      ctaText: "Get Plan",
      price: "₹399/month"
    },
    {
      id: 4,
      title: "Personal Loan Eligibility",
      description: "Check your eligibility for personal loans from top banks.",
      category: "loans",
      icon: "💰",
      free: true,
      minCreditScore: 0,
      ctaText: "Check Eligibility"
    },
    {
      id: 5,
      title: "Pre-approved Loan Offers",
      description: "View pre-approved loan offers tailored to your profile.",
      category: "loans",
      icon: "🏦",
      free: false,
      minCreditScore: 650,
      ctaText: "View Offers",
      price: "₹199/month"
    },
    {
      id: 6,
      title: "Home Loan Rate Comparison",
      description: "Compare home loan interest rates from multiple lenders.",
      category: "loans",
      icon: "🏠",
      free: true,
      minCreditScore: 0,
      ctaText: "Compare Rates"
    },
    {
      id: 7,
      title: "Credit Card Recommendations",
      description: "Get personalized credit card recommendations based on your profile.",
      category: "financial",
      icon: "💳",
      free: true,
      minCreditScore: 600,
      ctaText: "View Cards"
    },
    {
      id: 8,
      title: "Investment Advisory",
      description: "Personalized investment recommendations based on your financial goals.",
      category: "financial",
      icon: "📋",
      free: false,
      minCreditScore: 700,
      ctaText: "Get Advice",
      price: "₹599/month"
    },
    {
      id: 9,
      title: "Tax Planning Services",
      description: "Optimize your tax strategy with personalized recommendations.",
      category: "financial",
      icon: "📝",
      free: false,
      minCreditScore: 650,
      ctaText: "Plan Taxes",
      price: "₹499/quarter"
    },
    {
      id: 10,
      title: "Premium Credit Analysis",
      description: "In-depth analysis of your credit report with expert recommendations.",
      category: "premium",
      icon: "🔎",
      free: false,
      minCreditScore: 750,
      ctaText: "Get Analysis",
      price: "₹999/quarter"
    },
    {
      id: 11,
      title: "Priority Loan Processing",
      description: "Get your loan applications processed on priority with our partner banks.",
      category: "premium",
      icon: "⚡",
      free: false,
      minCreditScore: 750,
      ctaText: "Activate",
      price: "₹1,499/year"
    },
    {
      id: 12,
      title: "Financial Wellness Score",
      description: "Comprehensive assessment of your overall financial health.",
      category: "premium",
      icon: "📈",
      free: false,
      minCreditScore: 700,
      ctaText: "Get Score",
      price: "₹799/year"
    }
  ];
  
  // Filter services based on active category and user's credit score
  const filteredServices = allServices.filter(service => 
    (activeCategory === "all" || service.category === activeCategory) &&
    user.creditScore >= service.minCreditScore
  );

  // Get credit score status and related UI elements
  const getCreditScoreStatus = (score) => {
    if (score === 0) return { text: "No Credit History", color: "text-slate-600", bgColor: "bg-slate-100" };
    if (score < 600) return { text: "Poor", color: "text-red-600", bgColor: "bg-red-100" };
    if (score < 650) return { text: "Average", color: "text-amber-600", bgColor: "bg-amber-100" };
    if (score < 750) return { text: "Very Good", color: "text-emerald-600", bgColor: "bg-emerald-100" };
    return { text: "Excellent", color: "text-indigo-600", bgColor: "bg-indigo-100" };
  };

  const creditStatus = getCreditScoreStatus(user.creditScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Service Catalog</h1>
          <p className="text-slate-600 text-lg">Discover services tailored to your financial needs</p>
        </div>
        
        {/* Credit Score Banner */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className={`w-16 h-16 rounded-full ${creditStatus.bgColor} flex items-center justify-center mr-6`}>
              <span className={`text-2xl font-bold ${creditStatus.color}`}>
                {user.creditScore || 0}
              </span>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Your Credit Score</p>
              <p className={`text-xl font-semibold ${creditStatus.color}`}>{creditStatus.text}</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-slate-600 mb-2">Higher credit score unlocks more premium services</p>
            <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300">
              Improve Your Score
            </button>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.length > 0 ? (
            filteredServices.map(service => (
              <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-3xl mb-2">{service.icon}</div>
                    {service.free ? (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                        Free
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                        Premium
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  
                  {service.minCreditScore > 0 && (
                    <div className="mb-4 text-xs text-slate-500">
                      <span>Min. Credit Score: </span>
                      <span className="font-semibold">{service.minCreditScore}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
                    {!service.free && <span className="text-indigo-600 font-medium">{service.price}</span>}
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      service.free 
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" 
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    } transition-colors duration-300 ml-auto`}>
                      {service.ctaText}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 py-16 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Services Available</h3>
              <p className="text-slate-600 mb-6">Improve your credit score to unlock more services</p>
              <button className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                Learn How to Improve
              </button>
            </div>
          )}
        </div>
        
        {/* Credit Score Upgrade Banner */}
        <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-10 flex flex-col md:flex-row items-center">
            <div className="flex-1 text-white mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Unlock Premium Services</h2>
              <p className="text-indigo-100 text-lg mb-6">
                Improve your credit score to access exclusive financial services and better loan offers.
              </p>
              <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors duration-300">
                Get Premium Coaching
              </button>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <div className="absolute inset-0 bg-white rounded-full opacity-20"></div>
                <div className="z-10 text-white text-center">
                  <div className="text-5xl font-bold">⭐</div>
                  <div className="mt-2 font-medium">Premium Benefits</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
    
    </div>
  );
};

export default ServiceCatalogs;