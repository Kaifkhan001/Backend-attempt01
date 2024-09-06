// controllers/dbController.js
import User from '../models/user.js';

// **Get a User by ID**
export const getUser = async (req, res) => {
  try {
    const { id } = req.params; // Extract the user ID from the request parameters
    const user = await User.findById(id); // Fetch the user from the database

    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // If user doesn't exist
    }

    res.status(200).json(user); // Return the user data
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server Error' }); // Handle server errors
  }
};

// **Create a New User**
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Extract user details from the request body

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create a new user instance
    const newUser = new User({ name, email, password });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser); // Return the saved user data
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server Error' }); // Handle server errors
  }
};
