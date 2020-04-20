import sustainabilityDataService from "../services/sustainabilityData.js";
import authService from "../services/auth.js";

export default class ChallengePage {
  constructor() {
    this.template();
  }

  async init() {
    // user 1 - auth user
    // let = authService.authUser.uid;
    let uid = "j7WsepsaogO7mvb2S35LEfdQLmq1"; // using a fixed uid - want to make sure there's data matching an uid in the database
    let data = await sustainabilityDataService.getPreparedDataByUid(uid); // getting prepared data from the service
    // user 2 - Ep7o7EToQtZzdKnEDy2ahirFHc43
    let uidCompare = "Ep7o7EToQtZzdKnEDy2ahirFHc43"; // matching an uid from the database
    let dataCompare = await sustainabilityDataService.getPreparedDataByUid(uidCompare); // getting prepared data from the service
    // call the append functions with two datasets: data & compare
    this.appendCowsChart(data, dataCompare);
    this.appendCarbonFootprint(data, dataCompare);
    this.appendMilkProduction(data, dataCompare);
  }

  template() {
    document.getElementById('content').innerHTML += /*html*/ `
      <section id="challenge" class="page">
        <header class="topbar">
          <h2>Charts Two datasets</h2>
        </header>
        <h3>Herd - Number of Cows</h3>
        <canvas id="cowsCompare"></canvas>
        <h3>Carbon Footprint</h3>
        <canvas id="carbonFootprintCompare"></canvas>
        <h3>Milk Production pr cow</h3>
        <canvas id="milkProductionCompare"></canvas>
      </section>
    `;
  }

  //appending the chart using two datasets, given as argument: data & dataCompare
  appendCowsChart(data, dataCompare) {
    // generate chart
    let chartContainer = document.getElementById("cowsCompare");
    let chart = new Chart(chartContainer, {
      type: 'line',
      data: {
        datasets: [{
            data: data.numberOfCows,
            label: 'User: AuthUser',
            fill: false,
            borderColor: "#e755ba",
            backgroundColor: "#e755ba",
            pointBackgroundColor: "#55bae7",
            pointBorderColor: "#55bae7",
            pointHoverBackgroundColor: "#55bae7",
            pointHoverBorderColor: "#55bae7",
          },
          // secobd dataset - second user: Ep7o7EToQtZzdKnEDy2ahirFHc43
          {
            label: 'User: Ep7o7EToQtZzdKnEDy2ahirFHc43',
            data: dataCompare.numberOfCows,
            fill: false,
            borderColor: "#55bae7",
            backgroundColor: "#55bae7",
            pointBackgroundColor: "#e755ba",
            pointBorderColor: "#e755ba",
            pointHoverBackgroundColor: "#e755ba",
            pointHoverBorderColor: "#e755ba",
            type: 'line'
          }
        ],
        labels: data.years
      }
    });
  }

  //appending the chart using two datasets, given as argument: data & dataCompare
  appendCarbonFootprint(data, dataCompare) {
    // generate chart
    let chartContainer = document.getElementById('carbonFootprintCompare');
    let chart = new Chart(chartContainer, {
      type: 'line',
      data: {
        datasets: [{
            data: data.carbonFootprint,
            label: 'User: AuthUser',
            fill: false,
            borderColor: "#e755ba",
            backgroundColor: "#e755ba",
            pointBackgroundColor: "#55bae7",
            pointBorderColor: "#55bae7",
            pointHoverBackgroundColor: "#55bae7",
            pointHoverBorderColor: "#55bae7",
          },
          // secobd dataset - second user: Ep7o7EToQtZzdKnEDy2ahirFHc43
          {
            label: 'User: Ep7o7EToQtZzdKnEDy2ahirFHc43',
            data: dataCompare.carbonFootprint,
            fill: false,
            borderColor: "#55bae7",
            backgroundColor: "#55bae7",
            pointBackgroundColor: "#e755ba",
            pointBorderColor: "#e755ba",
            pointHoverBackgroundColor: "#e755ba",
            pointHoverBorderColor: "#e755ba",
            type: 'line'
          }
        ],
        labels: data.years
      }
    });
  }

  //appending the chart using two datasets, given as argument: data & dataCompare
  appendMilkProduction(data, dataCompare) {
    // generate chart
    let chartContainer = document.getElementById('milkProductionCompare');
    let chart = new Chart(chartContainer, {
      type: 'line',
      data: {
        datasets: [
          // first dataset - auth user
          {
            data: data.milkProduction,
            label: 'User: AuthUser',
            fill: false,
            borderColor: "#e755ba",
            backgroundColor: "#e755ba",
            pointBackgroundColor: "#55bae7",
            pointBorderColor: "#55bae7",
            pointHoverBackgroundColor: "#55bae7",
            pointHoverBorderColor: "#55bae7",
          },
          // secobd dataset - second user: Ep7o7EToQtZzdKnEDy2ahirFHc43
          {
            label: 'User: Ep7o7EToQtZzdKnEDy2ahirFHc43',
            data: dataCompare.milkProduction,
            fill: false,
            borderColor: "#55bae7",
            backgroundColor: "#55bae7",
            pointBackgroundColor: "#e755ba",
            pointBorderColor: "#e755ba",
            pointHoverBackgroundColor: "#e755ba",
            pointHoverBorderColor: "#e755ba",
            type: 'line'
          }
        ],
        labels: data.years
      }
    });
  }
}
