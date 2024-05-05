import express, { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import middlewares from '../middlewares/authMiddleware';

const router = express.Router();

// Route for user registration
router.post('/register', async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      username,
      dob,
      email,
      phoneNumber,
      IDType,
      IDNumber,
      address,
      country,
      city,
      password
    } = req.body;

    // Check if any required field is missing
    if (!firstName || !lastName || !username || !dob || !email || !phoneNumber || !IDType || !IDNumber || !address || !country || !city || !password) {
      return res.status(400).json({
        message: 'All required fields must be provided',
        success: false,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists',
        success: false,
      });
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance with hashed password
    const newUser = new User({
      firstName,
      lastName,
      username,
      dob,
      email,
      phoneNumber,
      IDType,
      IDNumber,
      address,
      country,
      city,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Send success response with user data
    return res.status(201).json({
      message: 'User registered successfully',
      data: newUser,
      success: true,
    });
  } catch (error: any) { // Explicitly type error as any
    console.error('User registration error:', error);
    return res.status(500).json({
      message: 'User registration failed',
      error: error.message as string, // Type assertion to string
      success: false,
    });
  }
});

// Route for user login
router.post('/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: 'User not found',
          success: false,
        });
      }
  
      // Check if password is correct
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({
          message: 'Invalid password',
          success: false,
        });
      }

      // Check if user is verified
      if (!user.isVerified) {
        return res.status(400).json({
          message: 'User is not verified or suspended',
          success: false,
        });
      }
  
      // Generate JWT token for authentication
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
  
      // Send success response with token
      res.status(200).json({
        message: 'Login successful',
        token: token,
        success: true,
      });
    } catch (error: any) {
      console.error('User login error:', error);
      return res.status(500).json({
        message: 'Login failed',
        error: error.message,
        success: false,
      });
    }
  });

// get user info
router.post('/get-user-info', middlewares, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.userId);
    if (user) {
      user.password = '';
      res.send({
        message: 'User info retrieved successfully',
        data: user,
        success: true,
      });
    } else {
      res.send({
        message: 'User not found',
        success: false,
      });
    }
  } catch (error) {
    res.send({
      message: 'User info retrieval failed',
      success: false,
    });
  }
}
);

// get all users
router.get('/get-all-users', middlewares, async (req: Request, res: Response) => {
  try {
    const users = await User.find();
      res.send({
        message: 'Users retrieved successfully',
        data: users,
        success: true,
      });
  } catch (error) {
    res.send({
      message: 'User retrieval failed',
      success: false,
    });
  }
}
);

// update user verification status
router.post('/update-user-verified-status', middlewares, async (req: Request, res: Response) => {
  try {
    await User.findByIdAndUpdate(req.body.selectedUser, {isVerified: req.body.isVerified});
    res.send({
      data: null,
      message: 'User verification status updated successfully',
      success: true,
    });
  } catch (error) {
    res.send({
      data: error,
      message: 'User verification status update failed',
      success: false,
    });
  }
});

export default router;
