import express from "express";
import {test, userUpdate, deleteUser, getUser} from '../controller/UserController.js';
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get('/test', test);
router.post('/updateUser/:id', verifyToken, userUpdate);
router.delete('/deleteUser/:id', verifyToken, deleteUser);
router.get('/:id', verifyToken, getUser);
export default router;