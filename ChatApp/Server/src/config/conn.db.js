import mongoose from "mongoose";
import { db_conn, db_name } from "../../constant.js";

const db_uri = process.env.MONGO_DB_PROD_URI || `${db_conn}/${db_name}`

export const connect = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${db_uri}`);
    console.log("database connceted successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
