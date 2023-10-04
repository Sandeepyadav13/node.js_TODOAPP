import Express  from "express";
 import { getMyTask, newtask,deleteTask,updateTask } from "../controller/task.js";
import { isauthenticated } from "../middlewares/auth.js";


 const router=Express.Router();
 
 router.post("/new",isauthenticated, newtask);
 router.get("/my",isauthenticated,getMyTask);
 router.route("/:id").put( isauthenticated,updateTask).delete(isauthenticated,deleteTask); //put last

 export default router; 