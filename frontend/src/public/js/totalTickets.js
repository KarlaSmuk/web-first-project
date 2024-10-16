async function getTotalNumOfTickets() {
  const response = await fetch("/ticket/totalNumber");
  const data = await response.json();
  if (data.total) {
    document.getElementById("total-tickets").innerText = data.total;
  }
}

const checkAuth = async () => {
  const response = await fetch("/isAuthenticated");
  const isAuthenticated = await response.json();
  if (isAuthenticated) {
    document.getElementById("btn-login").disabled = true;
    document.getElementById("btn-logout").disabled = false;
  } else {
    document.getElementById("btn-login").disabled = false;
    document.getElementById("btn-logout").disabled = true;
  }
};
