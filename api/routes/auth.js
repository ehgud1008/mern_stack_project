import express from "express";
import { signUp } from "../controller/AuthController.js";
const router = express.Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);
export default router;