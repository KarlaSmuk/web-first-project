const urlParams = new URLSearchParams(window.location.search);
const ticketId = window.location.pathname.split("/").pop();

async function getTicket() {
  const response = await fetch("/api/ticket/" + ticketId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (data) {
    document.getElementById("oib").innerText = data.vatin;
    document.getElementById("fname").innerText = data.firstName;
    document.getElementById("lname").innerText = data.lastName;
    document.getElementById("time").innerText = new Date(
      data.createdAt
    ).toLocaleString();
  }
}

async function getUser() {
  await fetch("/profile")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("user-name").innerText = data.name;
    });
}

