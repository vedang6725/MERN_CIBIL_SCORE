import React from "react";

const Header = ({ user, handleLogout }) => {
  return (
    <header className="bg-gradient-to-r from-white to-blue-50 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white h-10 w-10 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-200">
              C
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800">CreditBoost</h1>
          </div>
          
          {/* Right side elements */}
          <div className="flex items-center space-x-6">
            {/* User greeting - visible on medium screens and up */}
            <div className="hidden md:flex items-center">
              <span className="text-gray-500 mr-1">Welcome,</span>
              <span className="font-semibold text-gray-800">{user.name}</span>
            </div>
            
            {/* User Avatar */}
            <div className="relative group">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-white font-semibold cursor-pointer shadow-md hover:shadow-lg transition-all duration-200">
                {user.name.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-blue-700 transition-colors duration-200 flex items-center space-x-2 group"
            >
              <span className="hidden sm:inline text-sm font-medium group-hover:text-blue-700">Logout</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;