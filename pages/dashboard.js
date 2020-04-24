import sustainabilityDataService from "../services/sustainabilityData.js";
import authService from "../services/auth.js";

export default class DashboardPage {
  constructor() {
    this.dashboard();

  }

  async init() {
    let uid = "farm1"; // using a fixed uid - want to make sure there's data matching an uid in the database
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
        <h3>Dashboard</h3>

<article id="mostimportantdash">
    <div id="rightimpotant">
        <h3>Antal køer</h3>
        <canvas id="cows"></canvas>
    </div>

    <div id="double">
        <div>
              <h3>Selvforsynende foder</h3>
              <canvas id="feeding"></canvas>
        </div>
        <div class="leftimportant">
              <h3>Selvforsynende foder</h3>
              <canvas id="cows3"></canvas>
        </div>
    </div>

</article>
      </section>
    `;
  }

  //APPEND ANTAL KØER
  appendCowsChart(data) {
    // OPRET DIAGRAMMET - CHART.JS
    let chartContainer = document.getElementById("cows");
    let chart = new Chart(chartContainer, {
      type: 'bar',
      data: {
        datasets: [{
          data: data.dieselUsed,
          label: 'Antal køer, år for år',
          fill: false,
          backgroundColor: "#137D4E",
          pointBackgroundColor: "#006C3A",
          pointHoverBackgroundColor: "#55bae7",
          pointHoverBorderColor: "#55bae7",
        }],
        labels: data.years
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              min: (Math.min(...data.dieselUsed) - 1000),
              max: (Math.max(...data.dieselUsed) + 200)
            }
          }]
        }
      }
    });
  }
}
