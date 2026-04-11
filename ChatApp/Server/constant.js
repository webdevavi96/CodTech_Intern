import dotenv from 'dotenv';

dotenv.config();

export const user = process.env.MAIL;
export const pass = process.env.APP_PASSWORD;
export const db_conn = process.env.MONGO_DB_URI;
export const db_name = process.env.DB_NAME;
console.log(db_conn.toString());
