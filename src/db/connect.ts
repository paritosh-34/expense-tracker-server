import mongoose from 'mongoose';
import logger from '@logger';

const connectDb = async (): Promise<void> => {
  const dbUri = process.env.MONGO_URI;

  if (!dbUri) {
    logger.error('MongoUri not found!');
    process.exit(1);
  }
  logger.info(dbUri);

  try {
    await mongoose.connect(dbUri);
    logger.info('Database Connected');
  } catch (err) {
    logger.error({ err }, 'Db error:');
    process.exit(1);
  }
};

export default connectDb;
