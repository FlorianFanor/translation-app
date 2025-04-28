import { Request, Response, Router } from 'express'
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();


router.get('/', async (req: Request, res: Response) => {
  const result = await prisma.user.findMany();
  res.json(result);
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const result = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        createdAt: new Date(),
      }
    });
    res.json(result);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Email is already used' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const result = await prisma.user.findUnique({
    where: {
      id: Number(req.params.id)
    }
  });
  res.json(result);
});

router.put('/:id', async (req: Request, res: Response) => {
  const result = await prisma.user.update({
    where: {
      id: Number(req.params.id)
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      updatedAt: new Date()
    }
  });
  res.json(result);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const result = await prisma.user.delete({
    where: {
      id: Number(req.params.id)
    }
  });
  res.json(result);
});

export default router;
