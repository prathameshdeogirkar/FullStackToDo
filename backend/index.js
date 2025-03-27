import express from "express"
const app = express()
const PORT = 3000
import dotenv from "dotenv"
dotenv.config()

//configs and utils 
import responder from "./utils/utils.js"
import connectDb from "./config/connectDB.js"


//controllers
 import {addTodo} from "./controllers/controlTodos.js"
 import { postSignUp } from "./controllers/user.js"


 // middlewares

 app.use(express.json())
 app.use(express.urlencoded({extended:true}))
 



//end points

app.post('/addtodo',addTodo)

app.post('/signup', postSignUp)





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