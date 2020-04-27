import authService from "../services/auth.js";
export default class DataPage {
  constructor() {
    this.data();
    this.authService = authService;
  }

  data() {
    document.getElementById('content').innerHTML += `
    <section id="enterData" class="page">
    <header class="topbar">
      <h2>Arla gården +</h2>
      <a class="left" href="#" onclick="goBack()"><img src="images/navigation/back.svg" alt="back botton"></a>
    </header>
    <h3 id="overskriftdata">Dataindsamling</h3>

      <div id="overboks">
      <div id="imageboks">
        <h4>Dataindsamling</h4>

        <ul>

<li id="hygs"><img id="cowenter" src="images/logo/Arlacarbonlogo.png"</li>



        </ul
        <div id="backgrounddata">
      <img src="images/backgrounds/cowimage.png">
      </div>

      </div>

<section id="inputter">

<div id="indtastkasse">
<h4>Indtast data her</h4>
  <form id="inputdatacow">
      <div id="headandarrow" onclick="cowData();">
      <h5 id="cowKnap">▼ Køer</h5>
      <div class="cowPercent"></div>
      </div>
      <div id="cowQuest">
        <label for="koeer">Hvor mange køer har du?</label>
        <input type="number" id="cowInput" placeholder="Indtast din data her">
        </div>



        </form>
        <form id="inputdatafeed">
        <div id="headandarrow" onclick="feedData()">
        <h5 id="feedKnap">▼ Foder</h5>
        <div class="feedPercent"></div>
        </div>
        <div id="feedQuest">
          <label for="koeer">Antal kg foder benyttet i år?</label>
          <input type="number" id="feedInput" placeholder="Indtast din data her">


          <label for="koeer">Andel foder der er selvforsynende?</label>
          <input type="number" id="feedSelfInput" placeholder="Indtast din data her">
    </div>
  </form>

  <form id="inputdatamilk">
    <div id="headandarrow" onclick="milkData()">
  <h5 id="milkKnap">▼ Mælk</h5>
  <div class="milkPercent"></div>
  </div>
  <div id="milkQuest">
    <label for="koeer">Hvor mange kg mælk har du produceret i år?</label>
    <input type="number" id="milkInput" placeholder="Indtast din data her">
  </div>
    </form>


          <form id="inputdatause">
          <div id="headandarrow" onclick="useData()">
        <h5 id="useKnap">▼ Forbrug</h5>
        <div class="usePercent"></div>
        </div>
        <div id="useQuest">
            <label for="koeer">Antal liter diesel anvendt i år?</label>
            <input type="number" id="dieselInput" placeholder="Indtast din data her">

            <label for="koeer">Antal kWh strøm anvendt i år?</label>
            <input type="number" id="powerInput" placeholder="Indtast din data her">
  </div>
            </form>
            <button class="buttongem" onclick="updateUser()">Gem indtastning</button>

</div>


</section>
</div>

<div class="tabbarclear"></div>
          </section>
    `;
  }

}
