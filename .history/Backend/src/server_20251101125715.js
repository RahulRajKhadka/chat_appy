import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import authRoute from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});