import mongoose, { Mongoose } from 'mongoose';
import { AppConfig } from '../app.config.provider';

export const mongoConnectionProvider = {
  provide: 'MONGO_CONNECTION',
  useFactory: async (config: AppConfig): Promise<Mongoose> => {
    const conn = await mongoose.connect(config.database.url);
    return conn;
  },
  inject: ['CONFIG'],
};
