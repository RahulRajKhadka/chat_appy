import express from 'express';

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

app.get()

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});