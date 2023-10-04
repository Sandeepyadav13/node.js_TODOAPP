import mongoose from "mongoose";


const Schema =new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    descripation:{
        type:String,
        require:true,
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    createAt:{
        type:Date,
        default:Date.now,
    },
});
 
 export const Task = mongoose.model("Task",Schema);