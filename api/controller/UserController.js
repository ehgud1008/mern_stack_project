import User from "../models/user.js";
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const test = (req,res) => {
    res.json({
        message:"API reoute is working",
    });
}

export const userUpdate = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, "본인계정만 업데이트 할 수 있습니다."))

    try {
        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set : {
                userName : req.body.userName,
                email : req.body.email,
                password : req.body.password,
                avatar : req.body.avatar,
            }
        }, { new : true});

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, '본인 계정만 삭제가능합니다.'));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('회원탈퇴 되었습니다!');
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user) return next(errorHandler(404, '유저를 찾을 수 없습니다.'))

        const { password: pass, ...rest} = user._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}