import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS
});

client.on("error", (error) => console.error(error));

const conn = async () => {
  await client.connect();
  console.log("Connected with redis successfully.");
};

conn();

export { client };
