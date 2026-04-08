import { app } from "./app.js";

const port = 3000;

app.get("/", (req, res) => {
  return res.send("Working.");
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
