async function getTotalNumOfTickets() {
  await fetch("http://localhost:3000/api/ticket/totalNumber")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("total-tickets").innerText = data.total;
    });
}

getTotalNumOfTickets();
