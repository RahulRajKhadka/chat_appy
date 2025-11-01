import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/api/auth/signup", (req, res) => {
    res.send("Signup route");
});

app.get("/api/auth/login", (req, res) => {
    res.send("Login route");
});

app.get("/api/messages", (req, res) => {
    res.send("Messages route");
});

app.get("/api/logout", (req, res) => {
    res.send("Logout route");
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});