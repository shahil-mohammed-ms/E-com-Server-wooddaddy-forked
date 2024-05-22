const User = require('../models/user');
const bcrypt = require('bcrypt');

const signup = async(req,res) => {

  const { firstName,lastName,password,imgUrl,phone,mail, } = req?.body
try {
  const existingUser = User.findOne({mail});

  if(existingUser) res.status(409).json({proceed:false,data:{},message:'failed to signup '});

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    password: hashedPassword,
    imgUrl,
    phone,
    mail,
  });

  await newUser.save();

  // const { password: _, ...userWithoutPassword } = newUser.toObject();

  // res.status(201).json({ proceed: true, data: userWithoutPassword, message: 'Signup successful' });

  res.status(201).json({ proceed: true, data: newUser, message: 'Signup successful' });

} catch (error) {

  res.status(500).json({ proceed: false, data: {}, message: 'An error occurred during signup' });
  
}
 

}

const signin = async (req,res) => {

  const {password,mail} = req?.body

try {

  const existingUser = User.findOne({mail});
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
