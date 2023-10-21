import User from '../models/user.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signUp = async (req, res, next) => {
    console.log(req.body);
    const {userName, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({userName, email, password : hashedPassword});
    try {
        await newUser.save();
        res.stastus(201).json("유저 생성 성공!");
    } catch (error) {
        next(errorHandler(550, '유저 생성 실패! 데이터를 확인해주세요.'));
        // res.tatus(500).json(error.message);
    }
}