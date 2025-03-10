import Profile from "../models/profilemodel.js";

// Update or Create User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const { email, name, phoneNumber, pan, aadhar, dob, state, address, city, pincode } = req.body;

    let user = await Profile.findOne({ email }); // Check if user exists

    if (user) {
      // Update existing profile
      user.name = name;
      user.phoneNumber = phoneNumber;
      user.pan = pan;
      user.aadhar = aadhar;
      user.dob = dob;
      user.state = state;
      user.address = address;
      user.city = city;
      user.pincode = pincode;

      await user.save();
    } else {
      // Create new profile if not exists
      user = new Profile({ email, name, phoneNumber, pan, aadhar, dob, state, address, city, pincode });
      await user.save();
    }

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Database error", error });
  }
};
