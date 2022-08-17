import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import { connectDB } from './middlewares/db.js';

const PORT = process.env.PORT || 5000;

const whitelist = process.env.WHITELISTED_DOMAINS
 ? process.env.WHITELISTED_DOMAINS.split(',')
 : [];

const app = express();
app.use(morgan('dev'));
app.use(cors({ origin: whitelist }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (_, res) => {
    res.send('hello from roadmap backend');
});

app.listen(PORT, () => console.log(`Server at port ${PORT}`));