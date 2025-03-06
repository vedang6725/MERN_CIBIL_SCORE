import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserInput = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pan: "",
    dob: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user.name,
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Request to our backend instead of Equifax directly
      const response = await axios.post(
        "http://localhost:3001/api/equifax/credit-score", // Backend API route
        {
          name: formData.name,
          mobile: formData.mobile,
          pan: formData.pan,
          dob: formData.dob,
        }
      );

      console.log("Credit Score Response:", response.data);

      // Store credit score in local storage
      localStorage.setItem("creditScore", JSON.stringify(response.data));

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error fetching credit score:", error);
      if (error.response) {
        setError(`Error: ${error.response.data.message || "Failed to fetch credit score"}`);
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 p-4">
      <div className="bg-white/15 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 animate-fadeIn">
        <h2 className="text-2xl font-bold text-white text-center mb-8 drop-shadow-md">
          Please enter the following details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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
          </div>

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
              <label className="text-white text-sm font-medium mb-1 block">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full bg-white/20 backdrop-blur-md p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-300 transition-all"
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

          {error && <p className="text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-white text-blue-700 font-bold p-4 rounded-xl shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 mt-8 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
            disabled={loading}
          >
            {loading ? "Checking..." : "Proceed"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInput;
