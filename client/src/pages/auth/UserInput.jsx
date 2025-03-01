import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserInput = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    aadhar: "",
    pan: "",
    zipcode: "",
    state: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user.name,
        email: user.email,
      }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Input Submitted:", formData);
    navigate("/dashboard");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 p-4">
      <div className="bg-white/15 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 animate-fadeIn">
        <h2 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-md">Complete Your Profile</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pre-filled fields */}
          <div className="space-y-4">
            <div className="relative">
              <label className="text-white text-sm font-medium mb-1 block">Full Name</label>
              <input 
                type="text" 
                value={formData.name} 
                readOnly 
                className="w-full bg-white/20 backdrop-blur-md p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-300 transition-all" 
              />
            </div>
            
            <div className="relative">
              <label className="text-white text-sm font-medium mb-1 block">Email</label>
              <input 
                type="email" 
                value={formData.email} 
                readOnly 
                className="w-full bg-white/20 backdrop-blur-md p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-300 transition-all" 
              />
            </div>
          </div>

          {/* User input fields */}
          <div className="space-y-4">
            <div className="relative">
              <label className="text-white text-sm font-medium mb-1 block">Mobile No</label>
              <input 
                type="text" 
                name="mobile"
                placeholder="Enter mobile number" 
                value={formData.mobile}
                onChange={handleChange}
                className="w-full bg-white/20 backdrop-blur-md p-3 rounded-xl text-white outline-none placeholder-white/70 focus:ring-2 focus:ring-blue-300 transition-all" 
                required 
              />
            </div>
            
            <div className="relative">
              <label className="text-white text-sm font-medium mb-1 block">Aadhar Card</label>
              <input 
                type="text" 
                name="aadhar"
                placeholder="Enter Aadhar number" 
                value={formData.aadhar}
                onChange={handleChange}
                className="w-full bg-white/20 backdrop-blur-md p-3 rounded-xl text-white outline-none placeholder-white/70 focus:ring-2 focus:ring-blue-300 transition-all" 
                required 
              />
            </div>
            
            <div className="relative">
              <label className="text-white text-sm font-medium mb-1 block">PAN Card</label>
              <input 
                type="text" 
                name="pan"
                placeholder="Enter PAN number" 
                value={formData.pan}
                onChange={handleChange}
                className="w-full bg-white/20 backdrop-blur-md p-3 rounded-xl text-white outline-none placeholder-white/70 focus:ring-2 focus:ring-blue-300 transition-all" 
                required 
              />
            </div>
          </div>

          {/* Location fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="text-white text-sm font-medium mb-1 block">Zipcode</label>
              <input 
                type="text" 
                name="zipcode"
                placeholder="Enter Zipcode" 
                value={formData.zipcode}
                onChange={handleChange}
                className="w-full bg-white/20 backdrop-blur-md p-3 rounded-xl text-white outline-none placeholder-white/70 focus:ring-2 focus:ring-blue-300 transition-all" 
                required 
              />
            </div>
            
            <div className="relative">
              <label className="text-white text-sm font-medium mb-1 block">State</label>
              <input 
                type="text" 
                name="state"
                placeholder="Enter State" 
                value={formData.state}
                onChange={handleChange}
                className="w-full bg-white/20 backdrop-blur-md p-3 rounded-xl text-white outline-none placeholder-white/70 focus:ring-2 focus:ring-blue-300 transition-all" 
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-white text-blue-700 font-bold p-4 rounded-xl shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 mt-8 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
          >
            Submit Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInput;