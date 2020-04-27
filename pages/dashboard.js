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
    this.appendFootprint(data);
     this.appendFood(data);
     this.appendCard1(data);
     this.appendCard2(data);
     this.appendSmall2(data);
       this.appendCard3(data);
       this.appendFootprintDetail(data);
          this.milkFootprintDetail(data);
  }

  dashboard() {
    document.getElementById('content').innerHTML += `
      <section id="dashboard" class="page">
        <header class="topbar">
          <h2>Arla gården +</h2>
          <a class="left" href="#" onclick="goBack()"><img src="images/navigation/back.svg" alt="back botton"></a>
        </header>


        <h2>Personligt dashboard</h2>


<article id="mostimportantdash">
    <div id="rightimpotant" onclick="openMoreData()">
    <h3>Dit CO2-aftryk</h3>
    <p>Pr. kg. mælk produceret</p>
    <canvas id="footprint"></canvas>
    </div>

    <div id="detailView">
    <p onclick="openMoreData()" id="close">X</p>
    <div><h2>Dit CO2-aftryk</h2>
<p>Det går lidt op og ned med din mængde af CO2. Øg dig fokus en smule, og få vendt tingene inden næste måling!</p>

<canvas id="footprint2"></canvas>
    </div>
    <div>
    <h2>Mælkeproduktion og CO2</h2>
<canvas id="milkFootprint"></canvas>

<h2>Du klarer dig ikke dårligt, men...</h2>
<p>.. du kan stadig gøre det endnu bedre.<br></p>
<p>Du kan overveje at skifte nogle af de dyre maskiner ud med el-maskiner eller om-ernære køerne, så de udleder mindre methanegas.</p>
    </div>
    </div>

    <div id="double">
        <div>
              <h3>Selvforsynende foder i 2020</h3>
              <canvas id="feeding"></canvas>
        </div>
        <div class="leftimportant">
               <h3>Samlet CO2-udledning i 2020</h3>
              <canvas id="cows3"></canvas>
        </div>
    </div>

<div id="cards">

<div class="cards">
      <h3>Gasser du op eller ned?</h3>
      <p>Methangas pr. kg mælk produceret</p>
      <canvas id="card1"></canvas>
</div>

<div class="cards">
      <h3>Hvem laver mest mælk?</h3>
      <canvas id="card2"></canvas>
</div>

<div class="cards" id="thirdcard">
      <h3>Diesel og strømforbrug i kr.</h3>
      <p>Dit årlige pengeforbrug</p>
      <canvas id="card3"></canvas>
</div>

</div>
</article>

<article id="footprintfunction">
<h2>CO2-beregneren</h2>
<p>Vælg mængden af CO2 du gerne vil mindske med årligt, og se hvor meget du kan spare, og hvor meget der skal til.</p>
<h3 id="inputnumber"></h3>
<input id="slider" type="range" min="1" min="0" max="100" class="slider">
<h3 id="infotekst">CO2 sparet</h3>

<div id="footprintberegner">
  <div id="changenumbers">
    <div>
    <h2 id"moneyInFuture">10.000kr</h2>
    <p>Kan du potentielt spare om året.</p>
    </div>
    <div>
    <h2>960.330 kr</h2>
    <p>Kan du potentielt tjene ekstra i 2035.</p>
    </div>
</div>

<p id="motivation"></p>
  <div>
</article>


<div class="tabbarclear"></div>
<input id="copyslider" type="range" min="1" min="0" max="100" class="copyslider">
      </section>
    `;
  }

  appendRange (){
     let inputTal = document.getElementById("inputnumber");
       let besked = document.getElementById("motivation");
       let sliderTal = document.getElementById("copyslider");
     let range = document.getElementById("slider");
     inputTal.innerHTML = range.value + "kg";

     range.oninput = function() {

   if (range.value > 0 && range.value < 25){
     besked.innerHTML = "Du har valgt et realistisk mål! Du kan prøve at ændre lidt på dit foder til køerne. Måske kan du få dem til at bøvse mindre.";
   }else if (range.value > 24 && range.value < 75){
     besked.innerHTML = "Du har valgt et mål der godt kan nåes, men som kræver arbejde! Du kan plante træer til at absorbere CO2'en. En anden god idé er at benytte dig af vind- eller solenergi.";
   } else {
     besked.innerHTML = "Puha, du får travlt i år. Skift dine maskiner til mindre dieselslugere. Sørg for at køerne får det rigtige at spise, og gør det så selvforsynende som muligt."
   }
   inputTal.innerHTML = this.value + "kg";
   sliderTal.value = range.value;
 }
 }

   //APPEND CO2aftrykket
   appendFootprint(data) {
     // OPRET DIAGRAMMET - CHART.JS
     let chartContainer = document.getElementById("footprint");
     let chart = new Chart(chartContainer, {
       type: 'line',
       data: {
         datasets: [{
           // DATASET 1
           data: data.dieselFootprint,
           label: 'CO2, Diesel',
           fill: false,
           backgroundColor: "white",
           pointBackgroundColor: "white",
             borderColor: "white",
           pointHoverBackgroundColor: "#55bae7",
           pointHoverBorderColor: "#55bae7",
         },
         // DATASET 2
         {
           data: data.elFootprint,
           label: 'CO2, Strøm',
           fill: false,
           backgroundColor: "#1d52a8",
           pointBackgroundColor: "#1d52a8",
           borderColor: "#1d52a8",
           pointHoverBackgroundColor: "#55bae7",
           pointHoverBorderColor: "#55bae7",
         },
         // DATASET 3
         {
           data: data.feedFootprint,
           label: 'CO2, foder',
           fill: false,
           backgroundColor: "#e89a41",
           pointBackgroundColor: "#e89a41",
           borderColor: "#e89a41",
           pointHoverBackgroundColor: "#55bae7",
           pointHoverBorderColor: "#55bae7",
         }

       ],
         labels: data.years,
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
               beginAtZero: true,
               max: (Math.max(...data.dieselFootprint) + 0.13),
               fontColor: "white",
             }
           }],
           xAxes: [{
             ticks: {
               fontColor: "white",
             }
           }]
         }
       }
     });
   }


   //APPEND CO2aftrykket
   appendFootprintDetail(data) {
     // OPRET DIAGRAMMET - CHART.JS
     let chartContainer10 = document.getElementById("footprint2");
     let chart10 = new Chart(chartContainer10, {
       type: 'line',
       data: {
         datasets: [{
           // DATASET 1
           data: data.dieselFootprint,
           label: 'CO2, Diesel',
           fill: false,
           backgroundColor: "white",
           pointBackgroundColor: "#137D4E",
             borderColor: "#137D4E",
           pointHoverBackgroundColor: "#55bae7",
           pointHoverBorderColor: "#55bae7",
         },
         // DATASET 2
         {
           data: data.elFootprint,
           label: 'CO2, Strøm',
           fill: false,
           backgroundColor: "#1d52a8",
           pointBackgroundColor: "#1d52a8",
           borderColor: "#1d52a8",
           pointHoverBackgroundColor: "#55bae7",
           pointHoverBorderColor: "#55bae7",
         },
         // DATASET 3
         {
           data: data.feedFootprint,
           label: 'CO2, foder',
           fill: false,
           backgroundColor: "#e89a41",
           pointBackgroundColor: "#e89a41",
           borderColor: "#e89a41",
           pointHoverBackgroundColor: "#55bae7",
           pointHoverBorderColor: "#55bae7",
         }

       ],
         labels: data.years,
       },
       options: {
         legend:{
           labels: {
             fontColor: "#137D4E",
           }
         },
         scales: {
           yAxes: [{
             ticks: {
               beginAtZero: true,
               max: (Math.max(...data.dieselFootprint) + 0.13),
               fontColor: "#137D4E",
             }
           }],
           xAxes: [{
             ticks: {
               fontColor: "#137D4E",
             }
           }]
         }
       }
     });
   }


   //APPEND CARD ONE
   milkFootprintDetail(data) {
     // OPRET DIAGRAMMET - CHART.JS
     let chartContainer11 = document.getElementById("milkFootprint");
     let chart11 = new Chart(chartContainer11, {
       type: 'bar',
       data: {
         datasets: [{
           // DATASET 1
           data: data.milkProduction,
           label: 'Kg mælk produceret',
           fill: false,
           backgroundColor: "#137D4E",
           pointBackgroundColor: "#137D4E",
             borderColor: "#137D4E",
           pointHoverBackgroundColor: "#55bae7",
           pointHoverBorderColor: "#137D4E"
         },
         // DATASET 2
         {
           data: data.totalMethane,
           label: 'CO2 udledning fra methangas',
           fill: false,
           backgroundColor: "#1d52a8",
           pointBackgroundColor: "#1d52a8",
           borderColor: "#1d52a8",
           pointHoverBackgroundColor: "#55bae7",
           pointHoverBorderColor: "#55bae7",
         }

       ],
         labels: data.years,
       },
       options: {
         legend:{
           labels: {
             fontColor: "#137D4E",
           }          ,
           scales: {
             yAxes: [{
               ticks: {
                 fontColor: "#137D4E",
                 beginAtZero: true
               }
             }],
             xAxes: [{
               ticks: {
                 fontColor: "#137D4E"
               }
             }]
           }
         }
       }
     });
   }



   //APPEND CARD ONE
   appendCard1(data) {
     // OPRET DIAGRAMMET - CHART.JS
     let chartContainer3 = document.getElementById("card1");
     let chart3 = new Chart(chartContainer3, {
       type: 'bar',
       data: {
         datasets: [{
           // DATASET 1
           data: data.milkProduction,
           label: 'Kg mælk produceret',
           fill: false,
           backgroundColor: "white",
           pointBackgroundColor: "white",
             borderColor: "white",
           pointHoverBackgroundColor: "#55bae7",
           pointHoverBorderColor: "#55bae7"
         },
         // DATASET 2
         {
           data: data.totalMethane,
           label: 'CO2 udledning fra methangas',
           fill: false,
           backgroundColor: "#1d52a8",
           pointBackgroundColor: "#1d52a8",
           borderColor: "#1d52a8",
           pointHoverBackgroundColor: "#55bae7",
           pointHoverBorderColor: "#55bae7",
         }

       ],
         labels: data.years,
       },
       options: {
         legend:{
           labels: {
             fontColor: "#e6e6e6",
           }          ,
           scales: {
             yAxes: [{
               ticks: {
                 fontColor: "#e6e6e6",
                 beginAtZero: true
               }
             }],
             xAxes: [{
               ticks: {
                 fontColor: "#e6e6e6"
               }
             }]
           }
         }
       }
     });
   }


   //APPEND CARD TWO
   appendCard2(data) {
     // OPRET DIAGRAMMET - CHART.JS
     let chartContainer4 = document.getElementById("card2");
     let chart4 = new Chart(chartContainer4, {
       type: 'horizontalBar',
           data: {
               datasets: [{
                   label: 'Dine kg mælk produceret',
                   data: data.milkProduction,
                   backgroundColor: "#1d52a8",
               },{
                   label: 'Landsgennemsnit kg mælk produceret',
                   data: ["10111.111", "9777.778", "8190.517888889", "9414.0908889", "9437.95322"],
                   backgroundColor: "white",

               }
             ],
               labels: data.years
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
                   beginAtZero: true,
                   fontColor: "#e6e6e6",
                 }
               }]
             }
           }
     });
   }



   //APPEND CARD 3
   appendCard3(data) {
     // OPRET DIAGRAMMET - CHART.JS
     let chartContainer6 = document.getElementById("card3");
     let chart6 = new Chart(chartContainer6, {
       type: 'bar',
       data: {
         datasets: [{
           // DATASET 1
           data: data.dieselMoney,
           label: 'Dieselforbrug i kr.',
           fill: false,
           backgroundColor: "white",
           pointBackgroundColor: "white",
             borderColor: "white",
           pointHoverBackgroundColor: "#55bae7",
           pointHoverBorderColor: "#55bae7",
         },
         // DATASET 2
         {
           data: data.elMoney,
           label: 'Strømforbrug i kr.',
           fill: false,
           backgroundColor: "#1d52a8",
           pointBackgroundColor: "#1d52a8",
           borderColor: "#1d52a8",
           pointHoverBackgroundColor: "#55bae7",
           pointHoverBorderColor: "#55bae7",
         }
       ],
         labels: data.years,
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
               beginAtZero: true,
               max: (Math.max(...data.elMoney) + 15000),
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


 appendFood(data) {
   // OPRET DIAGRAMMET - CHART.JS
     let uid = "feed";
   let chartContainer2 = document.getElementById("feeding");
   let chart2 = new Chart(chartContainer2, {
     type: 'doughnut',
     data: {
       labels: ["Importeret foder, kg", "Selvforsynende foder, kg"],
         datasets: [{
           label: "Foder angivet i kg",
           data: ["2394.973", "5435.063009"],
           backgroundColor: ["#1d52a8", "#44916F"]
       }
     ]
     }
   });
 }

 appendSmall2(data) {
   // OPRET DIAGRAMMET - CHART.JS
     let uid = "feed";
   let chartContainer2 = document.getElementById("cows3");
   let chart2 = new Chart(chartContainer2, {
     type: 'doughnut',
     data: {
       labels: ["Dit CO2-aftryk", "Landsgennemsnit"],
         datasets: [{
           label: "CO2-udledning i tons",
           data: ["370.858", "2817.27978"],
           backgroundColor: ["#1d52a8", "#44916F"]
       }
     ]
     }
   });
 }

 }
