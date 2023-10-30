import express from "express";
import { signUp, signIn, google, validationCheck } from "../controller/AuthController.js";

const router = express.Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/google', google);
router.post('/validationCheck', validationCheck);

export default router;