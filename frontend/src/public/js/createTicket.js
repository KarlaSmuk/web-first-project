const form = document.getElementById("form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  document.getElementById("submit").disabled = true;

  const { access_token, token_type } = await getAccessToken();

  const ticketData = {
    vatin: document.getElementById("vatin").value,
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
  };

  fetch("http://localhost:3000/api/ticket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token_type} ${access_token}`,
    },
    body: JSON.stringify(ticketData),
  })
    .then((response) => response.json())
    .then(async (data) => {
      if (data.id) {
        const qrcode = await createQrCode(data.id);
        document.getElementById(
          "qrcode"
        ).innerHTML = `<img src="${qrcode}" alt="QR Code"/>`;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  document.getElementById("submit").disabled = false;
});

async function createQrCode(id) {
  try {
    const response = await fetch("/generateQR/" + id);
    const data = response.text();

    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function getAccessToken() {
  try {
    const response = await fetch("/getAccessToken");
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
