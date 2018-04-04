import express from 'express';
import generate from '../controllers/generate';

const router = express.Router();

router.post('/generate', generate);

export default router;