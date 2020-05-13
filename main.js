const graphArea = document.getElementById("graphArea");
const host = `http://localhost:8080/api/v1`;

// All
fetch(`${host}/count_tickets`)
  .then((response) => response.json())
  .then((data) => {
    drawTotalGraph(data);
  });

// iterating through individual departments
fetch(`${host}/departments`)
  .then((response) => response.json())
  .then((jsonData) => {
    const data = jsonData.data;
    for (let i = 0; i < data.length; i++) {
      drawIndividual(data[i]);
    }
  });

function drawIndividual(data) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  fetch(`${host}/count_tickets/${data.id}`)
    .then((response) => response.json())
    .then((stat_data) => {
      const chart = new Chart(ctx, {
        type: "horizontalBar",

        data: {
          labels: [data.name.ru],
          datasets: [
            {
              label: "Всего",
              backgroundColor: "#FE9A76",
              data: [stat_data.all],
            },
            {
              label: "Открытые",
              backgroundColor: "#B03060",
              data: [stat_data.open],
            },
            {
              label: "Закрытые",
              backgroundColor: "#008080",
              data: [stat_data.closed],
            },

            {
              label: "Лайки",
              backgroundColor: "#0E6EB8",
              data: [stat_data.like],
            },
            {
              label: "Дизлайки",
              backgroundColor: "#EE82EE",
              data: [stat_data.dislike],
            },
          ],
        },

        options: {
          responsive: true,
          legend: {
            position: "right",
          },
          title: {
            display: false,
            text: data.name.ru,
          },
        },
      });
    });

  // appending to DOM
  graphArea.appendChild(canvas);
}

// draw graph total stat
function drawTotalGraph(stat_data) {
  const ctx = document.getElementById("graph").getContext("2d");

  const chart = new Chart(ctx, {
    type: "horizontalBar",

    data: {
      labels: ["Все"],
      datasets: [
        {
          label: "Всего",
          backgroundColor: "#FE9A76",
          data: [stat_data.all],
        },
        {
          label: "Открытые",
          backgroundColor: "#B03060",
          data: [stat_data.open],
        },
        {
          label: "Закрытые",
          backgroundColor: "#008080",
          data: [stat_data.closed],
        },
        {
          label: "Лайки",
          backgroundColor: "#0E6EB8",
          data: [stat_data.like],
        },
        {
          label: "Дизлайки",
          backgroundColor: "#EE82EE",
          data: [stat_data.dislike],
        },
      ],
    },

    options: {
      responsive: true,
      legend: {
        position: "right",
      },
      title: {
        display: false,
        text: "all",
      },
    },
  });
}
