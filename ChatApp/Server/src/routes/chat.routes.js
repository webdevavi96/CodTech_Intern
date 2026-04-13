import { Router } from 'express';
import { authJwt } from '../middlewares/auth.midleware';
import { getChat, getUsers } from '../controllers/Message.controller.js';

const router = Router();

router.route('/:userId').get(authJwt, getChat);
router.route('/users').get(authJwt, getUsers);
