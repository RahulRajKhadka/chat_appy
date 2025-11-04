import express from 'express';
import { 
  signup, 
  login, 
  logout, 
  checkAuth, 
  updateProfile 
} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import upload from '../lib/multer.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check', protectRoute, checkAuth); // Protected route
router.put('/update-profile', protectRoute,upload.single updateProfile);

export default router;