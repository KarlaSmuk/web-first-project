const BASE_URL = window.location.origin;
const CHECK_AUTH_URL = "/isAuthenticated";

async function getTotalNumOfTickets() {
  await fetch("http://localhost:3000/api/ticket/totalNumber")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("total-tickets").innerText = data.total;
    });
}

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
