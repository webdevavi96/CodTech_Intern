import { app, server } from "./app";
import { connect } from "./config/db.config.js";
import { port } from "./constants.js";

connect()
  .then(() => {
    server.on("error", (err) => {
      throw new Error(err);
    });
    server.listen(port, () => console.log(`Server is running on: ${port}`));
  })
  .catch((err) => console.log(err));
