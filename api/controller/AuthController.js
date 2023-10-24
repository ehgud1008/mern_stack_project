import User from '../models/user.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
    try {
        const {userName, email, password} = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({userName, email, password : hashedPassword});
        await newUser.save();
        res.status(201).json("유저 생성 성공!");
    } catch (error) {
        // next(error);
        next(errorHandler(550, error.message + '///유저 생성 실패! 데이터를 확인해주세요.'));
    }
}


export const signIn = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, '가입된 이메일이 없습니다.'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        console.log(validUser._id);
        if(!validPassword) return next(errorHandler(401, '비밀번호를 잘못 입력하셨습니다.'));

        const token = jwt.sign({ id : validUser._id }, process.env.JWT_SECRET)    //_id로 unique 한 토큰값 지정

        //그냥 validUser로 보내버리면 비밀번호가 보여지게 됨
        // res.cookie('access_token', token, { httpOnly : true } ).status(200).json(validUser);
        const {password : pass, ...rest} = validUser._doc;  //
        res.cookie('access_token', token, { httpOnly : true } ).status(200).json(rest);

    } catch (error) {
        next(error);
    }
}