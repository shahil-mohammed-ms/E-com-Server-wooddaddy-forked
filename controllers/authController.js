const User = require('../models/user');
const bcrypt = require('bcrypt');

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
const signin = async (req,res) => {

  const {password,mail} = req?.body

try {

  const existingUser =await  User.findOne({mail});
  if (!existingUser)     return res.status(401).json({ message: "Invalid email or password" });

  const passwordMatch = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.status(200).json({ proceed:true, data:{existingUser}, message: "Login successful" });


} catch (error) {
  console.log(error)
}

}

module.exports = {
  signup,
  signin,
}
