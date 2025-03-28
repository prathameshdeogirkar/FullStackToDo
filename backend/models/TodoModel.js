import {Schema,model} from "mongoose"

const  todoSchema = new Schema({
     date:{
         type:String,
         required:true
     },
     title:{
         type:String,
         required:true
     },
     description:{
         type:String,
         required:true
     },
     completed:{
         type:Boolean,
         default:false
     },
     user:{
        type:Schema.Types.ObjectId,ref:"User"
     }
},{timestamps:true})

const Todo = model("Todo",todoSchema)

export default Todo