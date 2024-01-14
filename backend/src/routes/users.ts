import express from 'express';
import passport from 'passport';
import * as UserController from '../controllers/users';
import requiresAuth from '../middleware/requiresAuth';

const router = express.Router();

router.post('/signup', UserController.signUp);

router.post('/login', passport.authenticate('local'), (req, res) => res.status(200).json(req.user));

router.get('/me', requiresAuth, UserController.getAuthenticatedUser);

router.post('/logout', UserController.logout);

export default router;
