import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import loadConfig from '@config';
import logger from '@logger';
import connectDb from '@db/connect';
import routes from '@routes/index';
import clearExpiredSessions from '@utils/clearExpiredSessions';

// TODO: use tsconfig paths
dotenv.config();

const app = express();

const main = async () => {
  const PORT = process.env.PORT || 5000;

  await connectDb();
  const config = loadConfig();

  // cors
  app.use(cors(config.corsOrigin));

  // parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // http protection
  app.use(helmet());

  // logging
  app.use(morgan(config.morganFormat));

  // routes
  app.use('/auth', routes.auth);
  app.use('/expense', routes.expense);

  // clear expired sessions
  clearExpiredSessions();
  setInterval(clearExpiredSessions, 1000 * 60 * 60 * 12);

  app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
  });
};

main().catch((e) => {
  logger.error('Error in main function: ', e);
});
