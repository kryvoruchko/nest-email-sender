import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const { JWT_SECRET, ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES } = process.env;

@Injectable()
export class TokenService {
  signAccessToken(email: string) {
    return jwt.sign({ email }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
  }

  signRefreshToken(email: string): string {
    return jwt.sign({ email }, JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES,
    });
  }

  verify(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
          return reject(error);
        }

        resolve(decoded);
      });
    });
  }
}
