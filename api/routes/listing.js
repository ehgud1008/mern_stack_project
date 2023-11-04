import express from 'express';
import { createListing, getMyListing } from '../controller/ListingController.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/createListing', verifyToken, createListing);
router.get('/getMyListing/:id', verifyToken, getMyListing);

export default router;