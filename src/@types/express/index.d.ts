/* eslint-disable */

import { Express } from 'express-serve-static-core';

declare module 'express-serve-static-core' {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
