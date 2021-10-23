/* eslint-disable no-console */
import { CorsOptions } from 'cors';

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

const loadConfig = () => {
  const isProd = process.env.NODE_ENV === 'production';

  console.log(process.env.NODE_ENV);
  console.log(process.env.SECRET_KEY);
  console.log(process.env.SIGNUP_SECRET);
  console.log(process.env.MONGO_URI);

  return isProd ? prodConfig : localConfig;
};

export default loadConfig;
