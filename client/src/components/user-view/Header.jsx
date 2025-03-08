import React from "react";

const Header = ({ user, handleLogout }) => {
  return (
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
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold cursor-pointer">
              {user.name.charAt(0)}
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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