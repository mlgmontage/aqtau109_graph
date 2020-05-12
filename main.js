fetch("http://localhost:8080/api/v1/count_tickets")
  .then((response) => response.json())
  .then((data) => {
    drawGraph(data);
  });

fetch("http://localhost:8080/api/v1/departments")
  .then((response) => response.json())
  .then((jsonData) => {
    const data = jsonData.data;
    for (let i = 0; i < data.length; i++) {
      createElement(data[i]);
    }
  });

function createElement(data) {
  const p = document.createElement("canvas");
  const ctx = p.getContext("2d");

  const chart = new Chart(ctx, {
    type: "bar",

    data: {
      labels: ["all", "closed", "dislike", "like", "open", "prosrocheno"],
      datasets: [
        {
          label: data.name.ru,
          backgroundColor: "rgb(100, 99, 132)",
          data: [
            data.all,
            data.closed,
            data.dislike,
            data.like,
            data.open,
            data.prosrocheno,
          ],
        },
      ],
    },

    options: {},
  });
  document.body.appendChild(p);
  console.log(data);
}

function drawGraph(data) {
  const ctx = document.getElementById("graph").getContext("2d");
  const chart = new Chart(ctx, {
    type: "bar",

    data: {
      labels: ["all", "closed", "dislike", "like", "open", "prosrocheno"],
      datasets: [
        {
          label: "Sum tickets",
          backgroundColor: "rgb(100, 99, 132)",
          data: [
            data.all,
            data.closed,
            data.dislike,
            data.like,
            data.open,
            data.prosrocheno,
          ],
        },
      ],
    },

    options: {},
  });
}
