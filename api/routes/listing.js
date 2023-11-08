import express from 'express';
import { createListing, getMyListing, deleteMyListing } from '../controller/ListingController.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/createListing', verifyToken, createListing);
router.get('/getMyListing/:id', verifyToken, getMyListing);
router.delete('/deleteMyListing/:id', verifyToken, deleteMyListing);
export default router;