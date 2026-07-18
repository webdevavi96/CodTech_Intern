import { createClient } from "redis";

const url = process.env.REDIS;


const client = createClient({ url: url });

client.on("error", (error) => console.error(error));

const conn = async () => {
  await client.connect();
  console.log("Connected with redis successfully.");
};

conn();

export { client };
