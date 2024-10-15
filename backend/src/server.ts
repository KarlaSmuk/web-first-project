import express from "express";
import { AppDataSource } from "./db";
import cors from "cors";
import ticketRoute from "./routes/ticket.router";

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/ticket", ticketRoute)

const PORT = process.env.PORT || 3001;
AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));

