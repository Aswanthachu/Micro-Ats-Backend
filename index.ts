import express, { Application } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import { RegisterRoutes } from './routes/routes';
import { config } from './src/helper/config/globalConfig';
import MongooseDatabase from './src/helper/db/mongooseDatabase';
import { expressLogger, logger } from './src/helper/utils/logger';
import SwaggerDoc from './src/helper/utils/swaggerSetup';
import mongoose from 'mongoose';

class App {
  public app: Application;
  public mongooseDb: MongooseDatabase; // Change to public to access it in shutdown

  constructor() {
    this.app = express();
    this.configureCORS();
    this.setupLogger();
    this.plugins();
    this.mongooseDb = new MongooseDatabase();
    this.routes();
  }

  protected configureCORS(): void {
    const allowedOrigins = [
      'https://micro-ats-frontend-three.vercel.app',
      'http://localhost:3000',
    ];

    this.app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin) {
            return callback(null, true);
          }
          const originWithoutSlash = origin.endsWith('/') ? origin.slice(0, -1) : origin;
          const isAllowed = allowedOrigins.some(allowed => {
            const allowedWithoutSlash = allowed.endsWith('/') ? allowed.slice(0, -1) : allowed;
            return allowedWithoutSlash === originWithoutSlash;
          });
          callback(null, isAllowed);
        },
        credentials: true,
      })
    );
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  protected setupLogger(): void {
    this.app.use(expressLogger);
  }

  protected routes(): void {
    SwaggerDoc.init(this.app);

    this.app.get('/health', (req, res) => {
      const dbStatus = mongoose.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED';
      res.status(200).json({
        status: 'UP',
        database: dbStatus,
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      });
    });

    RegisterRoutes(this.app);
  }
}

const appInstance = new App();
const app = appInstance.app;
const port: number | undefined = config.HOST_PORT;

if (!process.env.VERCEL) {
  const server = app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });

  const shutdown = async () => {
    logger.info('Shutting down server...');
    await appInstance.mongooseDb.disconnect();
    server.close(() => {
      logger.info('Server has been shut down.');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

export default app;
