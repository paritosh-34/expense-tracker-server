import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { convertFromDirectory } from 'joi-to-typescript';
import logger from '../logger';

async function types(): Promise<void> {
  logger.info('Running joi-to-typescript...');

  // Configure your settings here
  await convertFromDirectory({
    schemaDirectory: './src/joiSchemas',
    typeOutputDirectory: './src/interfaces',
    useLabelAsInterfaceName: true,
  });
}

types()
  .then(() => {
    logger.info('Completed joi-to-typescript');

    fs.unlink('./src/interfaces/index.ts', (err) => {
      if (err) logger.error(err);
      logger.info('Removed index file');
    });
  })
  .catch((e) => logger.error(e));
