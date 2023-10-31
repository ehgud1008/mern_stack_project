import express from 'express';
import { createListing } from '../controller/ListingController.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/createListing', verifyToken, createListing);