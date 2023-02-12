import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  async use(req, res: Response, next: NextFunction) {
    try {
      const token = req.headers.token;
      if (!token) {
        throw new HttpException(
          {
            success: false,
            error: 'Invalid token',
          },
          200,
        );
      }
      const user = await jwt.verify(token, process.env.JWT_SECRET);
      if (!user) {
        throw new HttpException(
          {
            success: false,
            error: 'Invalid token',
          },
          200,
        );
      }
      req.user = user;
      next();
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          error: 'Invalid token',
        },
        200,
      );
    }
  }
}
