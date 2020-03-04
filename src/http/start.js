import app from './app';
import config from './config';
import { log } from '../utils/logger';

const server = app.listen(config.port, () => {
  log.info(`App listening on port ${config.port}`);
});

/**
 * Connect to database.
 */
config.connectDB();

export default server;
