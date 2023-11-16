import express from 'express';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import listingRouter from './routes/listing.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();
mongoose.connect(process.env.MONGODB_URI, { dbName: 'myfolio' })
    .then(() =>{ console.log("Connected to DB");})
    .catch((error)=> {console.log(error);});

const __dirname = path.resolve();

const app = express()
app.use(express.json());
const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('server on! ' + port);
});

app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist, index.html'));
})

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Server Error";
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message,
    });
});