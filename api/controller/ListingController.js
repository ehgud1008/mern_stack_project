import Listing from "../models/listing.js";
import { errorHandler } from "../utils/error.js";

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
    const listing = await Listing.findById(req.params.id);
    if(!listing) return next(errorHandler(404, '해당 리스팅을 찾을 수 없습니다.'))
    try {
        console.log(req.params.id);
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('리스팅 삭제 완료!');
    } catch (error) {
        next(error);
    }
}

export const updateMyListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if(!listing) return next(errorHandler(404, '해당 리스팅을 찾을 수 없습니다.'))
    try {
        const updateListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true},
        );
        res.status(200).json(updateListing);
    } catch (error) {
        next(error);
    }
}

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if(!listing){
            return next(errorHandler(404, '리스팅을 찾을 수 없습니다.'));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}