import { CorsOptions } from 'cors';
import logger from '@logger';

interface IConfig {
  morganFormat: 'dev' | 'tiny';
  corsOrigin: CorsOptions;
}

const localConfig: IConfig = {
  morganFormat: 'dev',
  corsOrigin: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
};

const prodConfig: IConfig = {
  morganFormat: 'tiny',
  corsOrigin: {
    origin: 'https://sayy-expensetracker.vercel.app',
    credentials: true,
  },
};

logger.info(`this --> ${process.env.NODE_ENV || 'undefined bro'}`);

const isProd = process.env.NODE_ENV === 'production';
const config = isProd ? prodConfig : localConfig;

export default config;
