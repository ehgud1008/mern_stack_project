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

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email : req.body.email });
        if(user){
            const token = jwt.sign({ id : user._id }, process.env.JWT_SECRET)    //_id로 unique 한 토큰값 지정
            const {password : pass, ...rest} = user._doc;  //
            res.cookie('access_token', token, { httpOnly : true } ).status(200).json(rest);
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({ 
                userName : req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email : req.body.email,
                password : hashedPassword,
                avatar : req.body.avatar
            });
            await newUser.save();
            const token = jwt.sign({ id : newUser._id }, process.env.JWT_SECRET)    //_id로 unique 한 토큰값 지정
            const {password : pass, ...rest} = newUser._doc;  //
            res.cookie('access_token', token, { httpOnly : true } ).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
}


export const validationCheck = (req, res, next) => {
    alert(req.body.userName);
    if(req.body.userName < 8 && req.body.userName > 20){
        console.log("아이디 길이");
        errorHandler(500, error.message + '아이디는 8~15자 이내로 만들어주세요');
        return;
    }
    if(req.body.email > 30){
        console.log("이메일 길이");
        errorHandler(500, error.message + '이메일는 30자 이내로 만들어주세요');
        return;
    }
    if(req.body.password < 8 && req.body.password > 20){
        console.log("비밀번호 길이");
        errorHandler(500, error.message + '비밀번호 8~20자 이내로 만들어주세요');
        return;
    }
}

export const signOut = (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('로그아웃');
    } catch (error) {
        next(error);
    }
}