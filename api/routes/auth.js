import express from "express";
import { signUp, signIn, google } from "../controller/AuthController.js";
const router = express.Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/google', google);
export default router;