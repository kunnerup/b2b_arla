import authService from "../services/auth.js";
export default class HomePage {
  constructor() {
    this.home();
    this.authService = authService;
  }

  home(name, img, farm) {
    document.getElementById('content').innerHTML += /*html*/ `
      <section id="home" class="page">
      <header class="topbar">
        <h2>Arlagården +</h2>
        <a class="left" href="#" onclick="goBack()"><img src="images/navigation/back.svg" alt="back botton"></a>
      </header>
      <form>
        <label for="name">Navn</label>
        <input type="text" id="name" placeholder="Indtast dit navn" disabled>

        <label for="mail">Mail</label>
        <input type="email" id="mail" placeholder="Indtast din email" disabled>

        <label for="farm">Navnet på din gård</label>
        <input type="farm" id="farm" placeholder="Tast din gårds navn">

        <label for="img">Profil billede</label>
        <input type="file" id="img" accept="image/*" onchange="previewImage(this.files[0], 'imagePreview')">
        <img id="imagePreview" class="image-preview">
        <button type="button" name="button" onclick="updateUser()">Gem ændringer</button>
      </form>

      <section id="profile">

      </section>

<div class="tabbarclear"></div>
    </section>
    `;


  }

  updateUser() {
    let name = document.querySelector('#name').value;
    let img = document.querySelector('#imagePreview').src;
    let farm = document.querySelector('#farm').value;

    this.authService.updateAuthUser(name, img, farm);
  }

  previewImage(file, previewId) {
    if (file) {
      let reader = new FileReader();
      reader.onload = function (event) {
        document.querySelector('#' + previewId).setAttribute('src', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  logout() {
    this.authService.logout();
  }
}
