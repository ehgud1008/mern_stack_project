import express from "express";
import { signUp, signIn, google, signOut } from "../controller/AuthController.js";

const router = express.Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/google', google);
router.get('/signOut', signOut);

export default router;