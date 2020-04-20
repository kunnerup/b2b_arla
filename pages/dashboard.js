import sustainabilityDataService from "../services/sustainabilityData.js";
import authService from "../services/auth.js";

export default class DashboardPage {
  constructor() {
    this.template();

  }

  async init() {
    // let = authService.authUser.uid;
    let uid = "j7WsepsaogO7mvb2S35LEfdQLmq1"; // using a fixed uid - want to make sure there's data matching an uid in the database
    let data = await sustainabilityDataService.getPreparedDataByUid(uid); // getting prepared data from the service
    // call append functions with the dataset: data
    this.appendCowsChart(data);
    this.appendCarbonFootprint(data);
    this.appendMilkProduction(data);
  }

  template() {
    document.getElementById('content').innerHTML += /*html*/ `
      <section id="dashboard" class="page">
        <header class="topbar">
          <h2>Charts</h2>
        </header>
        <h3>Herd - Number of Cows</h3>
        <canvas id="cows"></canvas>
        <h3>Carbon Footprint</h3>
        <canvas id="carbonFootprint"></canvas>
        <h3>Milk Production pr cow</h3>
        <canvas id="milkProduction"></canvas>
      </section>
    `;
  }

  //appending the chart
  appendCowsChart(data) {
    // generate chart
    let chartContainer = document.getElementById("cows");
    let chart = new Chart(chartContainer, {
      type: 'line',
      data: {
        datasets: [{
          data: data.numberOfCows,
          label: 'Number of Cows',
          fill: false,
          borderColor: "#e755ba",
          backgroundColor: "#e755ba",
          pointBackgroundColor: "#55bae7",
          pointBorderColor: "#55bae7",
          pointHoverBackgroundColor: "#55bae7",
          pointHoverBorderColor: "#55bae7",
        }],
        labels: data.years
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              min: (Math.min(...data.numberOfCows) - 5),
              max: (Math.max(...data.numberOfCows) + 1)
            }
          }]
        }
      }
    });
  }

  //appending the chart
  appendCarbonFootprint(data) {
    // generate chart
    let chartContainer = document.getElementById('carbonFootprint');
    let chart = new Chart(chartContainer, {
      type: 'line',
      data: {
        datasets: [{
          data: data.carbonFootprint,
          label: 'Carbon Footprint WholeFarm',
          fill: false,
          borderColor: "#e755ba",
          backgroundColor: "#e755ba",
          pointBackgroundColor: "#55bae7",
          pointBorderColor: "#55bae7",
          pointHoverBackgroundColor: "#55bae7",
          pointHoverBorderColor: "#55bae7",
        }],
        labels: data.years
      }
    });
  }

  //appending the chart
  appendMilkProduction(data) {
    // generate chart
    let chartContainer = document.getElementById('milkProduction');
    let chart = new Chart(chartContainer, {
      type: 'line',
      data: {
        datasets: [{
          data: data.milkProduction,
          label: 'Milk Production',
          fill: false,
          borderColor: "#e755ba",
          backgroundColor: "#e755ba",
          pointBackgroundColor: "#55bae7",
          pointBorderColor: "#55bae7",
          pointHoverBackgroundColor: "#55bae7",
          pointHoverBorderColor: "#55bae7",
        }],
        labels: data.years
      }
    });
  }
}
