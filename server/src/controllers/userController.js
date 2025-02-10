require('dotenv').config();
const {User} = require('../models');
const sendEmail = require('../config/sendEmail');
// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) { 
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
      const { name, email,isadmin } = req.body;
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists.' });
      }
  
      // Create a new user if not already present
      const newUser = await User.create({ name, email,isadmin });

      //send mail to User
      const message=`Hi ${name}, Your account has been created successfully.Please login in to the applicatioin using the below link. Application URL : ${ process.env.APP_URL}`
      sendEmail(newUser.email,"Account Created Successfully.",message).then((info)=>{
        if (info.accepted.length > 0 && info.rejected.length === 0) {
          console.log('Email sent successfully:', info.accepted);
          res.status(201).json(newUser);
        }
      }).catch((err)=>console.log(err));
      
     
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  };

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      const updatedUser = await user.update(req.body);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
