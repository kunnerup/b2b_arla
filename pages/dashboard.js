import sustainabilityDataService from "../services/sustainabilityData.js";
import authService from "../services/auth.js";

export default class DashboardPage {
  constructor() {
    this.dashboard();

  }

  async init() {
    let uid = "j7WsepsaogO7mvb2S35LEfdQLmq1"; // using a fixed uid - want to make sure there's data matching an uid in the database
    let data = await sustainabilityDataService.getPreparedDataByUid(uid);
    // STARTER APPEND FUNKTIONERNE - TILFØJ ALLE DER SKAL APPENDES
    this.appendCowsChart(data);
  }

dashboard() {
    document.getElementById('content').innerHTML += `
      <section id="dashboard" class="page">
        <header class="topbar">
          <h2>Arla gården +</h2>
          <a class="left" href="#" onclick="goBack()"><img src="images/navigation/back.svg" alt="back botton"></a>
        </header>
        <h3>Herd - Number of Cows</h3>
        <canvas id="cows"></canvas>
      </section>
    `;
  }


  //APPEND ANTAL KØER
  appendCowsChart(data) {
    let uid = "6ycxECeFQLXnMjoXVvWLJMHP6Rm2";
    let chartContainer = document.getElementById("cows");
    let chart = new Chart(chartContainer, {
      type: 'bar',
      data: {
        datasets: [{
          data: [51,21],
          label: 'Number of Cows',
          fill: false,
          borderColor: "#e755ba",
          backgroundColor: "#e755ba",
          pointBackgroundColor: "#55bae7",
          pointBorderColor: "#55bae7",
          pointHoverBackgroundColor: "#55bae7",
          pointHoverBorderColor: "#55bae7",
        }],
        labels: [2015,
          2016,
          2017,
          2018,
          2019]
      }
    });
  }
}
