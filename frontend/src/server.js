const express = require("express");
const path = require("path");
const QRCode = require("qrcode");
require("dotenv").config();
const { auth, requiresAuth } = require("express-openid-connect");

const app = express();
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.set("pages", path.join(__dirname, "pages"));

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: "http://localhost:" + process.env.PORT,
  clientID: process.env.CLIENT_ID_APP,
  clientSecret: process.env.CLIENT_SECRET_APP,
  issuerBaseURL: process.env.ISSUER_URL,
  authorizationParams: {
    response_type: "code",
    audience: process.env.AUDIENCE,
  },
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/totalTicketsPage.html"));
});

app.get("/create-ticket", (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/createTicketPage.html"));
});

app.get("/ticket-details/:id", requiresAuth(), (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/ticketDetailsPage.html"));
});

app.get("/isAuthenticated", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? true : false);
});

app.get("/profile", (req, res) => {
  res.send(req.oidc.user);
});

app.get("/getUserAccessToken", (req, res) => {
  res.send(req.oidc.accessToken);
});

app.get("/generateQR/:id", async (req, res) => {
  try {
    const url = "http://localhost:" + process.env.PORT + "/" + req.params.id;
    const qrCodeImage = await QRCode.toDataURL(url);

    res.send(qrCodeImage);
  } catch (err) {
    console.error("Error generating QR code:", err);
  }
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
