import sustainabilityDataService from "../services/sustainabilityData.js";
import authService from "../services/auth.js";

export default class ChallengePage {
  constructor() {
    this.challenge();
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
  }

  challenge() {
    document.getElementById('content').innerHTML +=  `
      <section id="challenge" class="page">
        <header class="topbar">
          <h2>Arla gården +</h2>
          <a class="left" href="#" onclick="goBack()"><img src="images/navigation/back.svg" alt="back botton"></a>
        </header>
        <h3>Herd - Number of Cows</h3>
        <canvas id="cowsCompare"></canvas>
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
          // second dataset - second user: Ep7o7EToQtZzdKnEDy2ahirFHc43
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

}
