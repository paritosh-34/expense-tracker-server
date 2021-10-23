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
  const isProd = process.env.MY_ENV === 'production';

  return isProd ? prodConfig : localConfig;
};

export default loadConfig;
