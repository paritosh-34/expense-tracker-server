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
    origin: 'https://yogik.com',
    credentials: true,
  },
};

const isProd = process.env.NODE_ENV === 'production';
const config = isProd ? prodConfig : localConfig;

export default config;
