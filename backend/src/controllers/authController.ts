import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../../middleware/authMiddleware';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        console.log('User found:', user);

        if (!user?.password) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        // res.status(200).json({ token });

        res.cookie('token', token, {
            httpOnly: true,         // 🛡 prevent JavaScript access
            secure: process.env.NODE_ENV === 'production', // send only over HTTPS in production
            sameSite: 'strict',     // 🛡 prevent CSRF
            maxAge: 3600000,        // 1 hour in milliseconds
        });
        res.status(200).json({ message: 'Logged in successfully' });
        return

    } catch (err) {
        console.error('Caught error:', err);

        if (!res.headersSent) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
};


export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            res.status(409).json({ message: 'User already exists.' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                createdAt: new Date(),
            },
        });

        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        console.error('Caught error:', err);

        if (!res.headersSent) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Logging out...');
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        console.error('Caught error:', err);

        if (!res.headersSent) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
}

export const verifyUser = (req: Request, res: Response): void => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!);
        res.status(200).json(payload); // userId, email
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// POST /api/organizations


export const createOrganization = async (req: AuthenticatedRequest, res: Response) => {
    const { name } = req.body;
    const userId = req.user?.userId;

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) return res.status(404).json({ message: 'User not found' });
        if (user.organizationId) {
            return res.status(400).json({ message: 'User already belongs to an organization' });
        }

        const organization = await prisma.organization.create({
            data: {
                name,
                users: {
                    connect: { id: userId },
                },
            },
        });

        await prisma.user.update({
            where: { id: userId },
            data: {
                organizationId: organization.id,
                role: 'ADMIN',
            },
        });

        res.status(201).json({ organizationId: organization.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create organization' });
    }
};
