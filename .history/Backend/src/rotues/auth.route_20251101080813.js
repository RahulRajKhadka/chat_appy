import express from 'express';

const router = express.Router();


router.get("/api/auth/signup", (req, res) => {
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
export default router;