const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const UserModel = require("../model/User")

const registerUser = async(req,res) => {
    try{
        const {username,email,password,role} = req.body;    
        const hashedPassword = await bcrypt.hash(password,10)

        // console.log(hashedPassword)

        const user = {
            username:username,
            email:email,
            password:hashedPassword,
            role:role
        }
        
        // console.log("User:",user)

    // Check if the user is already registered.

        const existingUser = await UserModel.findOne({ email: user.email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }
        await UserModel.create(user)
        .then(() => {
        res.status(200).json({
          message: "Registration successful",
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: "Something went wrong",
        });
        console.log(error)
      });
    
    }catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};

// Login User 

const loginUser = async(req,res) => {
    const {email,password} = req.body;
    const user = await UserModel.findOne({email:email})
    console.log("User:",user)

    if(!user){
        return res.status(401).json({
            message:"User not found"
        })
    }
    const verifyPassword = await bcrypt.compare(password,user.password)
    if(verifyPassword){
        const payload = {
            email:email
        }
        const jwtToken = jwt.sign(payload,"my_secret_key");
        res.send({jwtToken})
    }else{
        res.status(400)
        res.send("Invalid password")
    }

}

const getAllUsers = async(req,res) => {
  const getUsers = await UserModel.find()
  res.status(200).json(getUsers)

}


module.exports = {registerUser,loginUser,getAllUsers}