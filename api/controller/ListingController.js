import Listing from "../models/listing.js";

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
}

export const getMyListing = async (req, res, next) => {
    if(req.user.id !== req.params.id){
        try {
            const listing = await Listing.find( {userRef : req.params.id} );
            res.status(201).json(listing);
        } catch (error) {
            next(error);
        }
    }
}