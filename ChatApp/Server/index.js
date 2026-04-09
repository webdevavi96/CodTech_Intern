import { app } from "./app.js";
import { client } from "./src/config/redis.conf.js";
import { connect } from "./src/config/conn.db.js";

const port = 3000;

app.get("/", async (req, res) => {
  await client.set("mykey", "Santos pakhandi hai!");
  return res.send("Working.");
});

app.get("/data", async (req, res) => {
  const value = await client.get("mykey");
  res.send(`Something is comming from redis: ${value}`);
});

connect()
  .then(() => {
    app.on("error", (error) => {
      console.error(error);
      throw error;
    });
    app.listen(port, () => {
      console.log("Server is running on port: ", port);
    });
  })
  .catch((error) => console.error("mongoDB connection error: ", error));
