import express from "express";
import { Register,login,getMyProfile, logout} from "../controller/user.js"; 
import { isauthenticated } from "../middlewares/auth.js";

const router=express.Router();

router.post("/new",Register );
router.post("/login",login);
router.get("/logout",logout);
router.get("/me",isauthenticated,getMyProfile);

export default router;