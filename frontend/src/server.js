const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.set("pages", path.join(__dirname, "pages"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/totalTicketsPage.html"));
});

app.get("/create-ticket", (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/createTicketPage.html"));
});

app.get("/ticket-details/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/ticketDetailsPage.html"));
});

app.get("/getAccessToken", async (req, res) => {
  const data = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    audience: process.env.AUDIENCE,
    grant_type: "client_credentials",
  };

  try {
    const response = await fetch(`${process.env.ISSUER_URL}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    res.send(result);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Application running on port http://localhost:${PORT}`);
});
