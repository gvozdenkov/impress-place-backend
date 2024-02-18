import { Router } from 'express';
import { docRouter } from '#docs';
import { cardRouter } from '#card';
import { userRouter } from '#user';

var router = Router();

router.use('/docs', docRouter);
router.get('/', (req, res) => {
  res.json({ message: 'It works!' });
});
router.use('/cards', cardRouter);
router.use('/users', userRouter);

export { router };