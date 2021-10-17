import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import config from '@config';
import logger from '@logger';
import connectDb from '@db/connect';
import routes from '@routes/index';
import clearExpiredSessions from '@utils/clearExpiredSessions';

// TODO: use tsconfig paths
dotenv.config();

const app = express();

// cors
// const whitelist = ['http://localhost:3000', 'https://stockman.vercel.app'];
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // allow requests with no origin
//       // if (!origin) return callback(null, true);

//       const message =
//         "The CORS policy for this origin doesn't allow access from the particular origin.";

//       if (!origin) return callback(new Error(message), false);

//       if (whitelist.indexOf(origin) === -1) {
//         return callback(new Error(message), false);
//       }
//       return callback(null, true);
//     },
//     credentials: true,
//   })
// );
app.use(cors(config.corsOrigin));

const main = async () => {
  const PORT = process.env.PORT || 5000;

  await connectDb();

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
