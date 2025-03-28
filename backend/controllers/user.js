import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import responder from "../utils/utils.js";
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
    };
const postLogin = async(req,res)=>{
    const {email, password} = req.body;

    if(!email ||!password  ){
         return  responder(res,'email pass required',null,403,false);
    }

    const user = await User.findOne({email});

    if(!user){
         return responder(res,'',null,404,false);
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if(isMatch){
        const token = jwt.sign({email: user.email}, process.env.SECRET_KEY);
        res.setHeader("Authorization", `Bearer ${token}`);
        return res.status(200).json({
             message: "Logged In successfully",
             success: true,
             token: token,
             data:{
              userName : user.userName,
              email : user.email,
              password : user.password,
              data:{
                myTodos:user.myTodos
              }
               }
            });
            }
               else{
                return res.status(401).json({
                  message: "Invalid Credentials",
                  success: false
                 });
 
               }
    }

     export {
        postSignUp,
        postLogin
     }