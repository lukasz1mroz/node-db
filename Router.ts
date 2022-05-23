import { Router } from 'express';
import { testDbCall } from './dbService';
const router = Router();

router.get('/success', (req, res) => res.send('Successful response'));
router.get('/dbTest', async (req, res) => {
  const response = await testDbCall();
  res.json(response.rows);
});

router.get('/error', (req, res) => {
  throw new Error('Error response');
});

export default router;
