import dayjs from 'dayjs';
import pinoLogger from 'pino';

const logger = pinoLogger({
  prettyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default logger;
