import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feactures.js";
import Jwt from "jsonwebtoken";
import ErrorHandler from "../middlewares/error .js";


export const login = async (req, res, next) => {
try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password");  //Schema me password false kiya isiliye +password used kiye 
    if (!user) return next (new ErrorHandler("User Doesn't Exist",404));
    
    const ismatch = await bcrypt.compare(password, user.password);
    
    if (!ismatch) return next (new ErrorHandler("Invaild Email or Password",404));
    
    sendCookie(user, res, `Wellcome Back,${user.name}`, 200);
} catch (error) {
    next(error);  
}
    
};

export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return next (new ErrorHandler("User Already Exist",404));
    
    // if (!user) 
    //     return res.status(404).json({
    //         success: false,
    //         message: "User Already Exist",   
    //     });
    const hashedpassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedpassword });
    sendCookie(user, res, "Register Successfully", 201);
    } catch (error) {
        next(error);
    }
};

export const getMyProfile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    }); 
};

export const logout = (req, res) => {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite:"none", // process.env.NODE_ENV === "Develpoment" ? "lax" : 
        secure:true, //  process.env.NODE_ENV === "Develpoment" ? false :
      })
      .json({
        success: true,
        user: req.user,
      });
};