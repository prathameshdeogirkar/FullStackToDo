import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import responder from "../utils/utils.js";
const postSignUp = async(req,res)=>{

    const {userName, email, password} =  req.body;

    if(!password){
     return responder(res,'Password is required',null,400,false)
    }
    if(!userName){
         return responder(res,'UserName is required',null,400,false)
    }
    if(!email){
     return responder(res,'Email is required',null,400,false)
      }
        const salt = bcrypt.genSaltSync(10);
        try{
        const newUser =  new User({
          userName,
          password: bcrypt.hashSync(password , salt),
          email
        });
        const savedUser = await newUser.save()

        return responder(res,'User created successfully',null,201,true);
     } catch(err){
         return responder(res,err.message,null,500,false);
     }
    };
const postLogin = async(req,res)=>{
    const {email, password} = req.body;

    if(!email ||!password  ){
         return  responder(res,'email pass required',null,403,false);
    }

    const user = await User.findOne({email});

    if(!user){
         return responder(res,'user not found please login ',null,404,false);
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if(isMatch){
        const token = jwt.sign({email: user.email}, process.env.SECRET_KEY);
        res.setHeader("Authorization", `Bearer ${token}`);
        let userInfo = {
            userName: user.userName,
            email: user.email,
            _id: user._id
        }
        return responder(res, 'User logged in successfully',{token,userInfo},200,true);
            }
               else{
                return responder(res,'Invalid credentials',null,403,false);
 
               }
    }

     export {
        postSignUp,
        postLogin
     }