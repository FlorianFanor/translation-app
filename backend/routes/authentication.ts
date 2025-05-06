import { Router, Response, Request } from 'express';
import { login, register, logout } from '../src/controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

export interface AuthenticatedRequest extends Request {
    user?: any; // 👈 Add 'user' property manually
}

const router = Router();

router.post('/login', login);

router.post('/register', register);

router.post('/logout', logout)

router.get('/profile', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;

    if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    res.json({
        userId: user.userId,
        email: user.email,
    });
});



export default router;
