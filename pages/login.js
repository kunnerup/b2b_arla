export default class LoginPage {
  constructor() {
    this.template();
  }

  template() {
    document.getElementById('content').innerHTML +=  `
      <section id="login" class="page">

        <!-- firebase auth container  -->
        <div id="loginkasse">
        <div id="logologin"><img src="images/logo/Arlacarbonlogo.png"></div>
        <div id="tekstlogin">
        <h3>Velkommen til</h3>
        <h4>Arla gården +</h4></div>
        <div id="billedelogin"><img id="imageloginmobil" src="images/backgrounds/Arlalogincow.png">
        <img id="imageloginlaptop" src="images/backgrounds/Arlaloginlap.png"></div>
        <section id="firebaseui-auth-container"></section>

      </div>
      </section>

    `;
  }
}
