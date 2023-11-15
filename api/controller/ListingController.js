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


export const getSearchListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;
        let furnished = req.query.furnished;
        let parking = req.query.parking;
        let type = req.query.type;
        const searchKeyword = req.query.searchKeyword || '';
        const sort = req.query.sort || 'createAt';
        const order = req.query.order || 'desc';
        
        //첫 검색을 했거나(undefinded), 검색조건에서 세팅할 경우(false)
        if(offer === undefined || offer === 'false') {
            offer = { $in : [false, true] };
        }

        if(furnished === undefined || furnished === 'false') {
            furnished = { $in : [false, true] };
        }

        if(parking === undefined || parking === 'false') {
            parking = { $in : [false, true] };
        }

        if(type === undefined || type === 'all') {
            type = { $in : ['rent', 'sale'] };
        }

        const getSearchListing = await Listing.find({
            name : { $regex: searchKeyword, $options : 'i'},
            offer,
            furnished,
            parking,
            type,
        }).sort(
            { [sort] : order }
        ).limit(limit)
        .skip(startIndex);

        return res.status(200).json(getSearchListing);

    } catch (error) {
        next(error);
    }
}