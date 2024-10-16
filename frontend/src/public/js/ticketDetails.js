const PROFILE_URL = "/profile";
const urlParams = new URLSearchParams(window.location.search);
const ticketId = window.location.pathname.split("/").pop();

async function getTicket() {
  const { access_token, token_type } = await getUserAccessToken();
  await fetch(`http://localhost:3000/api/ticket/${ticketId}`, {
    method: "GET",
    headers: {
      Authorization: `${token_type} ${access_token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("oib").innerText = data.vatin;
      document.getElementById("fname").innerText = data.firstName;
      document.getElementById("lname").innerText = data.lastName;
      document.getElementById("time").innerText = new Date(
        data.createdAt
      ).toLocaleString();
    });
}

async function getUserAccessToken() {
  try {
    const response = await fetch("/getUserAccessToken");
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getUser() {
  await fetch(PROFILE_URL)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("user-name").innerText = data.name;
    });
}

getTicket();
getUser();
