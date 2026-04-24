import dotenv from "dotenv";

dotenv.config();

const db_name = process.env.DB_NAME;
const db_conn = process.env.DB_CONN_STRING;
const port = process.env.PORT;

export { db_conn, db_name, port };
