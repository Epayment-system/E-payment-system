const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { User } = require('../models');
const { Op } = require('sequelize');

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Images');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, 'profile_picture-' + uniqueSuffix + '.' + fileExtension);
  },
});

const upload = multer({ storage: storage }).single('ProfilePicture');

// Get all users
const get = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new user
const create = async (req, res) => {
  const { UserID, FirstName, LastName, Gender, UserName, Password, Email, PhoneNumber, Address, Role } = req.body;
  const profilePicture = req.file;

  // Hash the password
  const hashedPassword = await bcrypt.hash(Password, 10);

  try {
    const newUser = await User.create({
      UserID,
      FirstName,
      LastName,
      Gender,
      UserName,
      Password: hashedPassword,
      Email,
      PhoneNumber,
      Address,
      Role,
      ProfilePicture: profileprofilePicture.filename ? profilePicture.filename : null,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { UserName, Email, Password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { UserName: { [Op.eq]: UserName } },
          { Email: { [Op.eq]: Email } }
        ]
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ UserId: user.id }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a single user by ID
const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a user by ID
const update = async (req, res) => {
  const { id } = req.params;
  const { UserID, FirstName, LastName, Gender, UserName, Password, Email, PhoneNumber, Address, Role } = req.body;
  const ProfilePicture = req.file;

  try {
    const user = await User.findByPk(id);
    if (user) {
      // Hash the password if it's provided
      const hashedPassword = Password ? await bcrypt.hash(Password, 10) : user.Password;

      // Update the user's data
      await user.update({
        UserID,
        FirstName,
        LastName,
        Gender,
        UserName,
        Password: hashedPassword,
        Email,
        PhoneNumber,
        Address,
        Role,
        ProfilePicture: profilePicture ? profilePicture.filename : user.ProfilePicture,
      });

      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a user by ID
const Delete = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  get,
  create,
  login,
  getById,
  update,
  Delete,
  upload,
};