import mongoose  from "mongoose";


const connectDb =async () => {
    try {
         let a =  await mongoose.connect(`${process.env.MONGO_URL}`)
    } catch (error) {
      console.log(error.message);
    }
}

export default connectDb