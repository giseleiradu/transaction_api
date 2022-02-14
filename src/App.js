import express from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=> {
        
    console.log('You are connected to the DB');
    
});

app.use(express.json());

export default app;