import express from 'express';
import compare from '../controllers/compare';

const router = express.Router();

router.post('/compare', compare);

export default router;