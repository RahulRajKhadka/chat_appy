import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("Signup route");
});

router.get("/api/auth/login", (req, res) => {
  res.send("Login route");
});


router.get("/api/auth/logout", (req, res) => {
  res.send("Logout route");
});
export default router;
