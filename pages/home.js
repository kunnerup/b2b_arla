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
      <section id="profile">
      </section>

<article id="calltoaction">
  <a href="#enterData"><h2 id="greenb">Indtast data</h2></a>
  <a href="#dashboard"><h2 id="whiteb">Dashboard</h2></a>
</article>

<article id="keydata">
<h3>Sidste års tal</h3>

<div>
  <div>
    <h4>370,86</h4>
    <p>Samlet CO2-aftryk i tons</p>
    <p>DOWN</p>
  </div>
  <div id="borders">
    <h4>7830,04</h4>
    <p>Liter mælk produceret</p>
    <p>UP</p>
  </div>
  <div>
    <h4>5469,21</h4>
    <p>Kg foder benytter</p>
    <p>DOWN</p>
  </div>
  <div id="fulllength">
      <h4>303</h4>
      <p>Gennemsnitligt liter mælk pr. ko i liter</p>
      <p>UP</p>
  </div>
</div>
</article>

<article id="bestresults">
<h2>Personlige rekorder</h2>
</article>

<article id="badgets">
<h2>Bedrifter</h2>
<div></div>
</article>

<article id="activechallenges">
<h2>Aktive målsætninger & udfordringer</h2>
</article>

      <form id="updateProfile">
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
