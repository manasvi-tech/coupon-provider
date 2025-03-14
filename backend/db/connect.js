import mongoose from "mongoose";

const connectToMongo = async() =>{
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to mongodb")
}

export default connectToMongo;


