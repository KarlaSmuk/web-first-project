import express from "express";
import { AppDataSource } from "./db";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, Express.js Server!");
});

const PORT = process.env.PORT || 3001;
AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));

