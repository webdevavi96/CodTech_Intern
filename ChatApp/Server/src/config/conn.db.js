import mongoose from 'mongoose';
import { db_conn, db_name } from '../../constant.js';

export const connect = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${db_conn}/${db_name}`);
    console.log('database connceted successfully');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
