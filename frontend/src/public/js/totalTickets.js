const BASE_URL = window.location.origin;
const CHECK_AUTH_URL = "/isAuthenticated";
const LOGIN_URL = "/login";
const LOGOUT_URL = "/logout";

async function getTotalNumOfTickets() {
  await fetch("http://localhost:3000/api/ticket/totalNumber")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("total-tickets").innerText = data.total;
    });
}

const login = async () => {
  window.location.href = BASE_URL + LOGIN_URL;
};

const logout = async () => {
  window.location.href = BASE_URL + LOGOUT_URL;
};

const checkAuth = async () => {
  const response = await fetch(CHECK_AUTH_URL);
  const isAuthenticated = await response.json();
  if (isAuthenticated) {
    document.getElementById("btn-login").disabled = true;
    document.getElementById("btn-logout").disabled = false;
  } else {
    document.getElementById("btn-login").disabled = false;
    document.getElementById("btn-logout").disabled = true;
  }
};

getTotalNumOfTickets();
checkAuth();
