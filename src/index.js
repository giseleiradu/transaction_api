import app from './App.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8000;

app.listen(port, ()=> {
    console.log(`Server Started on Port ${port}`);
});

export default app;