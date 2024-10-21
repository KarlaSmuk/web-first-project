import express from "express";
import { AppDataSource } from "./db";
import cors from "cors";
import ticketRoute from "./routes/ticket.router";
import { errorHandler } from "./middleware/errors";

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/ticket", ticketRoute)
app.use(errorHandler);

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const PORT = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 3000;
AppDataSource.initialize()
  .then(async () => {
    const hostname = '0.0.0.0';
    if (externalUrl) {
      app.listen(PORT, hostname, () => {
        console.log(`Server locally running at http://${hostname}:${PORT}/ and from
          outside on ${externalUrl}`);
      });
    } else {
      app.listen(PORT, () => {
        console.log("Server is running on http://localhost:" + PORT);
      });
    }

    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));

