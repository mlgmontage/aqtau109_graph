const graphArea = document.getElementById("graphArea");
const host = `http://localhost:8080/api/v1`;

// All
fetch(`${host}/count_tickets`)
  .then((response) => response.json())
  .then((data) => {
    drawGraph(data);
  });

// individual departments
fetch(`${host}/departments`)
  .then((response) => response.json())
  .then((jsonData) => {
    const data = jsonData.data;
    for (let i = 0; i < data.length; i++) {
      createElement(data[i]);
    }
  });

function createElement(data) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  fetch(`${host}/count_tickets/${data.id}`)
    .then((response) => response.json())
    .then((stat_data) => {
      console.log(stat_data);
      const chart = new Chart(ctx, {
        type: "bar",

        data: {
          labels: [data.name.ru],
          datasets: [
            {
              label: "all",
              backgroundColor: "#FE9A76",
              data: [stat_data.all],
            },
            {
              label: "open",
              backgroundColor: "#B03060",
              data: [stat_data.open],
            },
            {
              label: "closed",
              backgroundColor: "#008080",
              data: [stat_data.closed],
            },

            {
              label: "like",
              backgroundColor: "#0E6EB8",
              data: [stat_data.like],
            },
            {
              label: "dislike",
              backgroundColor: "#EE82EE",
              data: [stat_data.dislike],
            },
            {
              label: "prosrocheno",
              backgroundColor: "#B413EC",
              data: [stat_data.prosrocheno],
            },
          ],
        },

        options: {
          title: {
            display: true,
            text: data.name.ru,
          },
        },
      });
    });

  // appending to DOM
  graphArea.appendChild(canvas);
}

function drawGraph(stat_data) {
  const ctx = document.getElementById("graph").getContext("2d");

  const chart = new Chart(ctx, {
    type: "bar",

    data: {
      labels: ["all"],
      datasets: [
        {
          label: "all",
          backgroundColor: "#FE9A76",
          data: [stat_data.all],
        },
        {
          label: "open",
          backgroundColor: "#B03060",
          data: [stat_data.open],
        },
        {
          label: "closed",
          backgroundColor: "#008080",
          data: [stat_data.closed],
        },

        {
          label: "like",
          backgroundColor: "#0E6EB8",
          data: [stat_data.like],
        },
        {
          label: "dislike",
          backgroundColor: "#EE82EE",
          data: [stat_data.dislike],
        },
        {
          label: "prosrocheno",
          backgroundColor: "#B413EC",
          data: [stat_data.prosrocheno],
        },
      ],
    },

    options: {
      title: {
        display: true,
        text: "all",
      },
    },
  });
}
