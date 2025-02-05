import express from 'express';
import authRoutes from './auth';

const router = express.Router();

router.use('/auth', authRoutes);
router.get('/', async function (_, res) {
  res.status(200).json({ message: 'deployed successfully' });
});

export default router;
