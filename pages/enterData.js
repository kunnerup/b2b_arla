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
        <h3></h3>
      </section>
    `;
  }
}
