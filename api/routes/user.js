import express from "express";
import {test, userUpdate, deleteUser} from '../controller/UserController.js';
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get('/test', test);
router.post('/updateUser/:id', verifyToken, userUpdate);
router.delete('/deleteUser/:id', verifyToken, deleteUser);

export default router;