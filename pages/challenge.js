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
<h1>Målsætninger & udfordringer</h1>
<div id="buttons">
<h2 id="greenb" class="hideondesktop">Opret målsætning eller udfordring</h2>
</div>


<article id="challengeleft" class="hideonmobile">
  <div>
        <div id="opret">
        <h2>Opret målsætning eller udfordring</h2>
        <p>Her kan du lave en konkurrence mod en kollega eller opsætte en målsætning for dig selv.
Løbende får du en status på, hvordan du klarer dig,
gode råd til, hvordan du vinder og ikke
mindst en masse spændende udfordringer i hverdagen.</p>
<form>
<label for="hvad">Hvad skal dit mål være?</label>
<select name="hvad">
   <option>Spare mest CO2</option>
   <option>Sænke dieselforbruget mest</option>
   <option>Sænke strømforbruget mest</option>
   <option>Øge mængden af mælk pr. ko mest i procent</option>
 </select>

<label for="tal">Navn</label>
<input type="text" id="tal" placeholder="Indtast tal i liter eller procent">

<label for="when">Hvornår skal din udfordring gælde til?</label>
<input type="range" id="when" min="1" max="10">

<label for="who">Hvem vil du gerne udfordre?</label>
<select name="cars" id="who">
   <option>Mig selv</option>
   <option>Sjællands gennemsnit</option>
   <option>Jyllands gennemsnit</option>
   <option>Danmarks gennemsnit</option>
 </select>
</form>
        </div>
        <div id="challengeinputs">
        </div>
  </div>


  <div>
      <div>
      </div>
      <div>
      </div>
  </div>
</article>



<article id="challengeright">
<div>

</div>

<div>

</div>
</article>

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
