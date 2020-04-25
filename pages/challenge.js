import sustainabilityDataService from "../services/sustainabilityData.js";
import authService from "../services/auth.js";

export default class ChallengePage {
  constructor() {
    this.challenge();
  }

  async init() {
    // stadig farm1 som den "indloggede bruger"
    let uiden = "farm1";
    let dataFarm = await sustainabilityDataService.getPreparedDataByUid(uiden);

    let uid = "farm1_2";
    let data = await sustainabilityDataService.getPreparedDataByUid(uid);

// FARM2 - SAMMENLINGSDATAEN
    let uidCompare = "farm2";
    let dataCompare = await sustainabilityDataService.getPreparedDataByUid(uidCompare);


    // KØRER APPENDERNE
    this.appendDieselCompare(data, dataCompare);
    this.appendCarbon(dataFarm);
  }

  challenge() {
    document.getElementById('content').innerHTML +=  `
      <section id="challenge" class="page">
        <header class="topbar">
          <h2>Arla gården +</h2>
          <a class="left" href="#" onclick="goBack()"><img src="images/navigation/back.svg" alt="back botton"></a>
        </header>
<h1 class="hideondesktop">Målsætninger & udfordringer</h1>
<p class="hideondesktop" id="halvfemsw">
Her kan du lave en konkurrence mod en kollega eller opsætte en målsætning for dig selv.
Løbende får du en status på, hvordan du klarer dig,
gode råd til, hvordan du vinder og ikke
mindst en masse spændende udfordringer i hverdagen.</p>
<div id="buttons">
<h2 id="greenb" class="hideondesktop" onclick="openCreate()">Opret målsætning eller udfordring</h2>
</div>

<div id="allchallenge">
<article id="challengeleft">
  <div>
        <div id="opret" class="hideonmobile">
        <p id="close" class="hideondesktop" onclick="openCreate()">X</p>
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

<h3 id="greenb">Opret</h3>

</form>
        </div>
</article>



<article id="challengeright">
<div id="flexi">
<h3 id="headlineactive">Aktive målsætninger og udfordringer</h3>
  <div>
    <div id="rightinright">
        <div id="profilechallenge"></div>
        <p>Udfordring mod sjællands gennemsnit</p>
<h1>Sænk dieselforbrug mest inden 2022</h1>


        <canvas id="dieselCompare"></canvas></div>
    <div>
    </div>
</div>

<div id"whiteelementactive>
  <div id="flexboxen">
      <h3>Dig</h3> <h3>|</h3> <h3>Sjælland</h3>
      <div><h2>10.353</h2><p>liter</p></div>             <div><p class="smallertext">dieselforbrug ved udfordringsstart (maj 2018)</p></div>             <div><h2>20.977</h2><p>liter</p></div>
      <div><h2>9.873</h2><p>liter</p></div>             <div><p class="smallertext">dieselforbrug ved seneste måling (maj 2019)</p></div>             <div><h2>23.918</h2><p>liter</p></div>
    <div><h2><span class="greenspan">4,86%</span></h2><p>forskel</p></div>             <div><p class="smallertext">foreløbig resultat</p></div>             <div><h2><span class="redspan">-14,02%</span></h2><p>2022</p></div>
    <div><h2><span class="greenspan">SEJR</span></h2><p>2022</p></div>             <div><p class="smallertext">forventet slutresultat</p></div>             <div><h2><span class="redspan">TABER</span></h2><p>2022</p></div>

    <p id="motivationmessage">Selvom det ser godt ud lige nu
    kan det hurtigt ændre sig. Sørg
    for at holde fokus på dit mål og
    se eventuelt om du kan samle
    nogle af dine opgaver med
    dieseltrukne maskiner, så de kan
    køre færre gange.
<br><br>
    Det vil både være effektivt for
    dig og for miljøet!</p>
  </div>
</div>
</div>

<div id="lastcardchallenge">
<div id="lasttop">
<h2>Sænk CO2-aftrykket med 5 tons</h2>
<canvas id="carbon"></canvas>
</div>
<div id="lastbot"><p>Det går rigtig godt med denne målsætning.
Du har faktisk sparet miljøet for det der
svarer til 1200 flyvninger til Gran Canaria i år.<br><br>
Det er da bestemt værd at tage med! Fortsæt det gode arbejde.</p></div>
</div>

</article>
<div class="tabbarclear"></div>
      </section>
    `;
  }

  //Append statistik
  appendDieselCompare(data, dataCompare) {
    let chartContainer8 = document.getElementById("dieselCompare");
    let chart8 = new Chart(chartContainer8, {
      type: 'line',
      data: {
        datasets: [{
            data: data.dieselUsed,
            label: 'DIG',
              fill: false,
            borderColor: "#e755ba",
            backgroundColor: "#e755ba",
            pointBackgroundColor: "#55bae7",
            pointBorderColor: "#55bae7",
            pointHoverBackgroundColor: "#55bae7",
            pointHoverBorderColor: "#55bae7",
          },
          // DATASET 2 - COMPARE DATA
          {
            label: 'SJÆLLAND GENNEMSNIT',
            data: dataCompare.dieselUsed,
            borderColor: "#55bae7",
            backgroundColor: "#55bae7",
            pointBackgroundColor: "#e755ba",
            pointBorderColor: "#e755ba",
            pointHoverBackgroundColor: "#e755ba",
            pointHoverBorderColor: "#e755ba",
          }
        ],
        labels: data.years,
      },
    });
  }

  appendCarbon(dataFarm) {
    let chartContainer9 = document.getElementById("carbon");
    let chart9 = new Chart(chartContainer9, {
      type: 'line',
      data: {
        datasets: [{
            data: dataFarm.carbonFootprint,
            label: 'Dit samlede CO2-aftyk i tons',
              fill: false,
            borderColor: "#DFE7E6",
            backgroundColor: "#DFE7E6",
            pointBackgroundColor: "#44916F",
            pointBorderColor: "#DFE7E6",
            pointHoverBackgroundColor: "#55bae7",
            pointHoverBorderColor: "black",
          }
        ],
        labels: dataFarm.years,
      },
      options: {
        legend:{
          labels: {
            fontColor: "white",
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "#e6e6e6",
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: "#e6e6e6",
            }
          }]
        }
      }
    });
  }

}
