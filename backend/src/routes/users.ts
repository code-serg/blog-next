import express from 'express';
import passport from 'passport';
import * as UserController from '../controllers/users';
import requiresAuth from '../middleware/requiresAuth';
import validateRequestSchema from '../middleware/validareRequestSchema';
import { profileImageUpload } from '../middleware/image-upload';
import { signupSchema, updateUserSchema } from '../validation/users';

const router = express.Router();

router.post('/signup', validateRequestSchema(signupSchema), UserController.signUp);

router.post('/login', passport.authenticate('local'), (req, res) => res.status(200).json(req.user));

router.post('/logout', UserController.logout);

router.get('/me', requiresAuth, UserController.getAuthenticatedUser);

router.get('/profile/:username', UserController.getUserByUsername);

router.patch(
  '/profile',
  requiresAuth,
  profileImageUpload.single('profileImage'),
  validateRequestSchema(updateUserSchema),
  UserController.updateUser
);

export default router;
