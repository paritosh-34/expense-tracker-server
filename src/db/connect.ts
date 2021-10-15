import mongoose from 'mongoose';
import log from '@logger';

const connectDb = async (): Promise<void> => {
  const dbUri = process.env.MONGO_URI;

  if (!dbUri) {
    log.error('MongoUri not found!');
    process.exit(1);
  }
  log.info(dbUri);

  try {
    await mongoose.connect(dbUri);
    log.info('Database Connected');
  } catch (err) {
    log.error({ err }, 'Db error:');
    process.exit(1);
  }
};

export default connectDb;
