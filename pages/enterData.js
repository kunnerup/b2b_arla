export default class DataPage {
  constructor() {
    this.data();
  }

  data() {
    document.getElementById('content').innerHTML += `
      <section id="enterData" class="page">
        <header class="topbar">
          <h2>Arla gården +</h2>
        </header>
        <h3></h3>
      </section>
    `;
  }
}
