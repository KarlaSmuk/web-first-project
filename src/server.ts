import express from "express";
import path from "path";
import { AppDataSource } from "./db";
import ticketRoute from "./routes/ticket.router";
import { getAccessToken } from "./middleware/getAccessToken";

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));

app.use("/api/ticket", ticketRoute)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/publicPages/totalTicketsPage.html"));
});

app.get("/ticket-details", (req, res) => {
  getAccessToken()
  res.sendFile(path.join(__dirname, "views/privatePages/ticketDetailsPage.html"));
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

