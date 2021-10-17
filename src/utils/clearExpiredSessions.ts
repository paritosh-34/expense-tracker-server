import logger from '@logger';
import Session from '@models/Session';

const clearExpiredSessions = () => {
  Session.deleteMany({
    expiryDate: {
      $lt: new Date(),
    },
  })
    .then((r) => logger.debug(String(r.deletedCount)))
    .catch((e) => logger.error(e as Error, 'Error while clearing sessions'));
};

export default clearExpiredSessions;
