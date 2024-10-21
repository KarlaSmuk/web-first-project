const express = require("express");
const path = require("path");
require("dotenv").config();
const { auth, requiresAuth } = require("express-openid-connect");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.set("pages", path.join(__dirname, "pages"));

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const PORT =
  externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 10001;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: externalUrl || `https://localhost:${PORT}`,
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

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(req.oidc.user);
});

async function getAccessToken() {
  const data = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    audience: process.env.AUDIENCE,
    grant_type: "client_credentials",
  };

  const response = await fetch(`${process.env.ISSUER_URL}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
}

//REQUESTS TO BACKEND
app.get("/ticket/totalNumber", async (req, res) => {
  const response = await fetch(
    `${process.env.API_URL}/api/ticket/totalNumber`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    return res.status(response.status).json({ error: errorData.message });
  }

  const result = await response.json();
  res.json(result);
});

app.get("/api/ticket/:id", requiresAuth(), async (req, res) => {
  const tickedId = req.params.id;
  const { access_token, token_type } = req.oidc.accessToken;

  const response = await fetch(
    `${process.env.API_URL}/api/ticket/` + tickedId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token_type} ${access_token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    return res.status(response.status).json({ error: errorData.message });
  }

  const result = await response.json();
  res.json(result);
});

app.post("/api/ticket", async (req, res) => {
  const { access_token, token_type } = await getAccessToken();
  const ticketData = req.body;

  if (!ticketData) {
    return res.status(400).json({ error: "No ticket data provided" });
  }

  if (!access_token) {
    return res.status(400).json({ error: "No access_token provided" });
  }

  const response = await fetch(`${process.env.API_URL}/api/ticket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token_type} ${access_token}`,
    },
    body: JSON.stringify(ticketData),
  });

  const data = await response.json();
  res.json(data);
});

app.listen(PORT, () => {
  const hostname = "0.0.0.0";
  if (externalUrl) {
    app.listen(PORT, hostname, () => {
      console.log(`Server locally running at http://${hostname}:${PORT}/ and from
        outside on ${externalUrl}`);
    });
  } else {
    console.log(`Application running on port http://localhost:${PORT}`);
  }
});
