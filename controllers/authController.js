const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const getUser = async (req, res) => {

  console.log('reached getuser')
  try {
    const { _id } = req?.decoded
    const data = await User.find({ _id })
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
};

const signup = async (req, res) => {
  const { firstName, lastName, password, phone, mail } = req.body; 

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ mail });

    if (existingUser) {
      return res.status(409).json({ proceed: false, data: {}, message: 'Failed to signup: Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      password: hashedPassword,
      phone,
      mail,
    });

    await newUser.save();

    // Destructure newUser to remove password
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res.status(201).json({ proceed: true, data: userWithoutPassword, message: 'Signup successful' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ proceed: false, data: {}, message: 'An error occurred during signup' });
  }
};

const signin = async (req, res) => {
  const { password, mail } = req.body;
  console.log('req body',req.body)
console.log('mail is',req.body.mail)
  try {
    // Find the user by email
    const existingUser = await User.findOne({ mail });
    console.log('ex usrr',existingUser)
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    console.log('passmach',passwordMatch)
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate the access token
    const accessToken = jwt.sign(
      { _id: existingUser._id },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRY,
      }
    );

    // Generate the refresh token
    const refreshToken = jwt.sign(
      { _id: existingUser._id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRY,
      }
    );
console.log('existingUser', existingUser )
console.log('accessToken', accessToken  )
console.log('refreshToken', refreshToken)
    // Respond with the user data and tokens
    res.status(200).json({
      proceed: true,
      data: { token: { accessToken, refreshToken }, existingUser },
      message: "Login successful",
    });
  } catch (error) {
    console.log("Error during sign-in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//password123   john.doe@example.com 

module.exports = {
  signup,
  signin,
  getUser,
}
