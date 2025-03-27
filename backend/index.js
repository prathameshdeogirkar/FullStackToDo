import express from "express"
const app = express()
const PORT = 3000
import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken";

//configs and utils 
import responder from "./utils/utils.js"
import connectDb from "./config/connectDB.js"



//controllers
 import {addTodo} from "./controllers/controlTodos.js"
 import { postSignUp , postLogin} from "./controllers/user.js"


 // middlewares

 app.use(express.json())
 app.use(express.urlencoded({extended:true}))
 



//end points

app.post('/addtodo',addTodo)
app.post('/signup', postSignUp)
app.post('/login', postLogin)
app.get('/test', (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized',
            success: false
        });
    }

    const tokenValue = token.split(" ")[1]; 

    try {
        const decoded = jwt.verify(tokenValue, process.env.SECRET_KEY);

        if (decoded) {
            return res.json({ message: 'Authorized', success: true, data: decoded });
        }
    } catch (e) {
        return res.status(401).json({ message: 'Unauthorized', success: false });
    }
});






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