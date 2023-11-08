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
    if(req.user.id === req.params.id){
        try {
            const listing = await Listing.find( {userRef : req.params.id} );
            res.status(201).json(listing);
        } catch (error) {
            next(error);
        }
    }
}

export const deleteMyListing = async (req, res, next) => {
    try {
        console.log(req.params.id);
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('리스팅 삭제 완료!');
    } catch (error) {
        next(error);
    }
}