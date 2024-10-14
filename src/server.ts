import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { AppDataSource } from "./db";
import ticketRoute from "./routes/ticket.router";

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));

app.use("/api/ticket", ticketRoute)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/publicPages/totalTicketsPage.html"));
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

