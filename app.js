import express from "express";
import userRoute from "./routers/user.js"
import taskRoute from "./routers/task.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errormiddleware } from "./middlewares/error .js";
import cors from "cors";


export const app = express();
config({path:"./data/config.env"});//COFIG FILE KO ACCESS KARNE KE LIYE 

// using middleware to access data from postman
app.use(express.json()); // json hamesa router se pahle user karege,than userouter 
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}));

//using router
app.use("/api/v1/users", userRoute);
app.use("/api/v1/task", taskRoute); 

app.get("/", (req, res) => {
    res.send("Nice working");
});

// using error middleware 
app.use(errormiddleware);