import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// jwt authentication middleware

export class AuthMiddleware {
  verify(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'no token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      (req as any).user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'invalid token' });
    }
  }

  generateToken(userId: string, tier: string = 'free') {
    return jwt.sign(
      { id: userId, tier },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    );
  }
}
