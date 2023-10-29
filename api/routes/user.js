import express from "express";
import {test, userUpdate} from '../controller/UserController.js';
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get('/test', test);
router.post('/updateUser/:id', verifyToken, userUpdate);

export default router;