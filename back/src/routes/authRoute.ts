// src/routes/authRoute.ts
import express from 'express';
import * as authControler from '../controllers/authControler';

const router = express.Router();

router.post('/register', authControler.register);
router.post('/login', authControler.login);

export default router;