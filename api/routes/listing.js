import express from 'express';
import { createListing, getMyListing, deleteMyListing, updateMyListing, getListing, getSearchListings} from '../controller/ListingController.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/createListing', verifyToken, createListing);
router.get('/getMyListing/:id', verifyToken, getMyListing);
router.delete('/deleteMyListing/:id', verifyToken, deleteMyListing);
router.post('/updateMyListing/:id', verifyToken, updateMyListing)
router.get('/getListing/:id', getListing)
router.get('/getSearchListings', getSearchListings);

export default router;