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
     addedTime:{
        type:String,
        required:true
     }
},{timestamps:true})

const Todo = model("Todo",todoSchema)

export default Todo