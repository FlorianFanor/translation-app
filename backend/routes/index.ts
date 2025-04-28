
import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', function (req: Request, res: Response) {
  res.render('index', { title: 'Express' });
});


export default router;
