export default class DataPage {
  constructor() {
    this.data();
  }

  data() {
    document.getElementById('content').innerHTML += `
    <section id="enterData" class="page">
      <header class="topbar">
        <h2>Arla gården +</h2>
        <a class="left" href="#" onclick="goBack()"><img src="images/navigation/back.svg" alt="back botton"></a>
      </header>
      <h3>Data indsamling</h3>

<section id="inputter">
    <form id="inputdata">
    <h4 id="cowKnap" onclick="cowData()">Køer ▼</h4>
    <div id="cowQuest">
      <label for="koeer">Hvor mange køer har du?</label>
      <input type="text" id="name" placeholder="Indtast din data her">
      </div>



      </form>
      <form id="inputdata">
      <h4 id="feedKnap" onclick="feedData()">Foder ▼</h4>
      <div id="feedQuest">
        <label for="koeer">Antal kg foder benyttet i år?</label>
        <input type="text" id="name" placeholder="Indtast din data her">


        <label for="koeer">Andel foder der er selvforsynende?</label>
        <input type="text" id="name" placeholder="Indtast din data her">
  </div>
</form>

<form id="inputdata">
<h4 id="milkKnap" onclick="milkData()">Mælk ▼</h4>
<div id="milkQuest">
  <label for="koeer">Hvor mange kg mælk har du produceret i år?</label>
  <input type="text" id="name" placeholder="Indtast din data her">
</div>
  </form>


        <form id="inputdata">
      <h4 id="useKnap" onclick="useData()">Forbrug ▼</h4>
      <div id="useQuest">
          <label for="koeer">Antal liter diesel anvendt i år?</label>
          <input type="text" id="name" placeholder="Indtast din data her">

          <label for="koeer">Antal kWh strøm anvendt i år?</label>
          <input type="text" id="name" placeholder="Indtast din data her">
</div>
          </form>
          <button class="buttongem">Gem</button>
          </section>
          </section>

    `;
  }
}
