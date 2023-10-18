import express from 'express';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.js';

dotenv.config();
mongoose.connect(process.env.MONGODB_URI)
    .then(() =>{ console.log("Connected to DB");})
    .catch((error)=> {console.log(error);});
const app = express()
const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('server on! ' + port);
});

app.get('/', (req, res, next) => {
    res.send('hello world!');
});

app.use('/api/user', userRouter);

