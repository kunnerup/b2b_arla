export default class LoginPage {
  constructor() {
    this.template();
  }

  template() {
    document.getElementById('content').innerHTML +=  `
      <section id="login" class="page">
        <header class="topbar">
          <h2>Login</h2>
        </header>
        <!-- firebase auth container  -->
        <section id="firebaseui-auth-container"></section>
      </section>
    `;
  }
}
