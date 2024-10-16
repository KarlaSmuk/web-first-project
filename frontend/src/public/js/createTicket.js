const form = document.getElementById("form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  document.getElementById("submit").disabled = true;

  const ticketData = {
    vatin: document.getElementById("vatin").value,
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
  };

  const response = await fetch("/api/ticket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticketData),
  });

  const data = await response.json();
  console.log(data);
  if (data.message) {
    document.getElementById("error").innerHTML = data.message;
  }

  if (data.qrcode) {
    document.getElementById(
      "qrcode"
    ).innerHTML = `<img src="${data.qrcode}" alt="QR Code"/>`;
  }
  document.getElementById("submit").disabled = false;
});
