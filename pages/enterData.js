export default class DataPage {
  constructor() {
    this.template();
  }

  template() {
    document.getElementById('content').innerHTML += `
      <section id="enterData" class="page">
        <header class="topbar">
          <h2>Arla gården s+</h2>
        </header>
        <h3></h3>
        <p>My Single Page Web App Template</p>
      </section>
    `;
  }
}
