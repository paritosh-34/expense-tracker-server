import dotenv from 'dotenv';
import express from 'express';
import logger from '@logger';
import connectDb from '@db/connect';

dotenv.config();

const app = express();

const main = async () => {
  const PORT = process.env.PORT || 5000;

  await connectDb();

  app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
  });
};

main().catch((e) => {
  logger.error('Error in main function: ', e);
});
