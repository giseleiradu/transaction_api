import app from './App.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log(`The server has started on port ${port}`);
});

export default app;