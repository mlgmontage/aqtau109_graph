const graphArea = document.getElementById("graphArea");

// All
fetch("http://localhost:8080/api/v1/count_tickets")
  .then((response) => response.json())
  .then((data) => {
    drawGraph(data);
  });

// individual departments
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

  fetch(`http://localhost:8080/api/v1/count_tickets/${data.id}`)
    .then((response) => response.json())
    .then((stat_data) => {
      console.log(stat_data);
      const chart = new Chart(ctx, {
        type: "bar",

        data: {
          labels: ["all", "closed", "dislike", "like", "open", "prosrocheno"],
          datasets: [
            {
              label: data.name.ru,
              backgroundColor: "rgb(100, 99, 132)",
              data: [
                stat_data.all,
                stat_data.closed,
                stat_data.dislike,
                stat_data.like,
                stat_data.open,
              ],
            },
          ],
        },

        options: {},
      });
    });

  // appending to DOM
  // document.body.appendChild(p);
  graphArea.appendChild(p);
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
