import mongoose  from "mongoose";


const connectDb =async () => {
    try {
         let a =  await mongoose.connect(`mongodb+srv://prathamesh:prathamesh220801@cluster0.xndrz.mongodb.net/FullStackToDo`)
    } catch (error) {
      console.log(error.message);
    }
}

export default connectDb