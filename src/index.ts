import dotenv from 'dotenv';
import express from 'express';
import log from '@logger';
import connectDb from '@db/connect';

dotenv.config();

const app = express();

const main = async () => {
  const PORT = process.env.PORT || 5000;

  await connectDb();

  app.listen(PORT, () => {
    log.info(`Server started on port ${PORT}`);
  });
};

main().catch((e) => {
  log.error('Error in main function: ', e);
});
