// src/routes/missileRoutes.ts
import express from 'express';
import * as missileController from '../controllers/missileController';

const router = express.Router();

router.get('/', missileController.getAllMissiles);

router.post('/launch', missileController.launchMissile);

router.post('/intercept', missileController.interceptMissile);

export default router;
