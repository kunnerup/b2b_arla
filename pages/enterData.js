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
    </section>
    <form id="inputdata">
    <h4>køer</h4>
      <label for="koeer">Hvor mange køer har du?</label>
      <input type="text" id="name" placeholder="Indtast din data her">



      </form>
      <form id="inputdata">
      <h4>foder</h4>
        <label for="koeer">Hvor mange køer har du?</label>
        <input type="text" id="name" placeholder="Indtast din data her">



        </form>
        <form id="inputdata">
        <h4>foder</h4>
          <label for="koeer">Hvor mange køer har du?</label>
          <input type="text" id="name" placeholder="Indtast din data her">



          </form>
    `;
  }
}
