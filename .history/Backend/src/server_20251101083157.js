import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import authRoute from './routes/auth.route.js';
import message

const PORT = process.env.PORT || 3000;

const app = express();

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});