import express from "express"
const app = express()
const PORT = 3000
import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken";
import cors from "cors"
app.use(cors({
    origin: "https://fullstacktodooo.netlify.app/"
}))

//configs and utils 
import responder from "./utils/utils.js"
import connectDb from "./config/connectDB.js"



//controllers
 import {addTodo ,getuserTodos, deleteTodo} from "./controllers/controlTodos.js"
 import { postSignUp , postLogin} from "./controllers/user.js"


 // middlewares
 app.use(express.json()) 
 app.use(express.urlencoded({extended:true}))

 const jwtverifyMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
   
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: 'JWT token is required',
            success: false
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'JWT token is invalid',
            success: false
        });
    }
};

 



//end points

app.post('/addtodo',jwtverifyMiddleware,addTodo)
app.post('/signup', postSignUp)
app.post('/login', postLogin)
app.get('/gettodos',jwtverifyMiddleware,getuserTodos)
app.delete('/deletetodo/:id', deleteTodo)

app.get("/health",(req,res)=>{
     responder(res,"server is healthy",null,200,true)
})

app.get("*",(req,res)=>{
    res.send("page not found");
})

app.listen(PORT,()=>{
     console.log(`app listen on port ${PORT} `);
     connectDb().then(()=>{console.log("connected to db")})
})