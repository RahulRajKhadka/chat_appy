import express from 'express';

const app = express();

app.get("/api/auth/si")

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});