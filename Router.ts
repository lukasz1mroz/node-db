import { Router } from 'express';

const router = Router();

router.get('/success', (req, res) => res.send('Successful response'));

router.get('/error', (req, res) => {
  throw new Error('Error response');
});

export default router;
