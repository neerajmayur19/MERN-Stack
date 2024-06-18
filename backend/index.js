import express from "express";
import mongoose from "mongoose";
import {Book} from './Models/bookModel.js';
import bookRoute from './Routes/bookRoute.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    console.log(req);
    return res.status(200).send("Welcome to MERN Stack");
});
app.use('/books', bookRoute);

mongoose.connect('mongodb+srv://neerajmayur999:YF1u7FU3DVBlcjzi@book-keeper.sb984k1.mongodb.net/?retryWrites=true&w=majority&appName=Book-Keeper').then(()=> {
    console.log("Connection Established");
    app.listen(5000, ()=> {
        console.log(`App is listening on the Port: 5000`);
    });
}).catch((err) => {
    console.log(`Error: ${err}`);
});

