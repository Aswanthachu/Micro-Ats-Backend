import mongoose from 'mongoose';
import { logger } from '../utils/logger';
import { config } from '../config/globalConfig';

class MongooseDatabase {
  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    try {
      await mongoose.connect(config.MONGODB_URI);
      logger.info('Connected to the database using Mongoose.');
    } catch (err) {
      logger.error('Unable to connect to the database:', err);
      if (!process.env.VERCEL) {
        process.exit(1);
      }
    }
  }

  public async disconnect() {
    try {
      await mongoose.disconnect();
      logger.info('Disconnected from the database.');
    } catch (err) {
      logger.error('Error disconnecting from the database:', err);
    }
  }
}

export default MongooseDatabase;
