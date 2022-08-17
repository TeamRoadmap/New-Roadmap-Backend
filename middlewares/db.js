import dotenv from 'dotenv';
import pg from 'pg';
dotenv.config();
const { Client } = pg;

const client = new Client({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DB,
    password: process.env.DBPASSWORD,
    port: +(process.env.DBPORT),
});

export const connectDB = () => {
    client.connect()
    .then(db => console.log('Connected to DB'))
    .catch(err => console.log(err));
}

export default client;