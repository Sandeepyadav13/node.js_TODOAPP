import mongoose from "mongoose";


const Schema =new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        select:false,
    },
    createAt:{
        type:Date,
        default:Date.now,
    }
 });

 export const User = mongoose.model("User",Schema);