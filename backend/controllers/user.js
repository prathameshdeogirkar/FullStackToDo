import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
const postSignUp = async(req,res)=>{

    const {userName, email, password, repassword} =  req.body;

    if(!password){
         return res.status(403).json({
              message: "Password is required",
              success: false
         })  ;
    }
    if (password !== repassword) {
         return res.status(400).json({
              message: "Passwords do not match",
              success: false
         })
    }

    if(!userName){
         return res.status(403).json({
              message: "Username is required",
              success: false
         })
    }
    if(!email){
         return res.status(403).json({
              message: "Email is required",
              success: false
         }) ;
        }
        const salt = bcrypt.genSaltSync(10);
        try{
        const newUser =  new User({
          userName,
          password: bcrypt.hashSync(password , salt),
          email
        });
        const savedUser = await newUser.save()

        return res.status(201).json({
             message: "User signedup successfully",
             success: true,
             data:{
              userName : savedUser.userName,
              email : savedUser.email,
             }
        });
     } catch(err){
         return res.status(400).json({
               message: err.message,
               success: false
         })
     }
    }
     export {postSignUp}