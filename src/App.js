import express from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoute from './routes/userRoutes';
import transactionRoutes from './routes/transactionRoutes';

dotenv.config();

const corsOptions = {
    origin: '*', 
    optionsSuccessStatus: 200
}

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=> {
        
    console.log('You are connected to the DB');
    
});


app.use(express.json());
app.use('/api', cors(corsOptions), userRoute);
app.use('/api', cors(corsOptions), transactionRoutes);

export default app;