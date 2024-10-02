import express from "express";
import bodyParser from 'body-parser';
import { AppDataSource } from "./db";
import ticketRoute from './routes/ticket.router';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/ticket", ticketRoute)

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

