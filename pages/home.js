import sustainabilityDataService from "../services/sustainabilityData.js";
import authService from "../services/auth.js";
export default class HomePage {
  constructor() {
    this.home();
    this.authService = authService;
  }

  home(name, img, farm) {
    document.getElementById('content').innerHTML += `
      <section id="home" class="page">
      <header class="topbar">
        <h2>Arlagården +</h2>
        <a class="left" href="#" onclick="goBack()"><img src="images/navigation/back.svg" alt="back botton"></a>
      </header>
      <p class="logud" onclick="logout() class="hideondesktop">LOG UD</p>
      <img class="smalledit" src="images/navigation/setup_grey.svg" alt="setup icon" onclick="openSetup()">
      <div id="updateProfile">
            <form>
            <p id="close" class="hideonmobile" onclick="openSetup()">X</p>
              <label for="name">Navn</label>
              <input type="text" id="name" placeholder="Indtast dit navn">

              <label for="mail">Mail</label>
              <input type="email" id="mail" placeholder="Indtast din email" disabled>

              <label for="farm">Navnet på din gård</label>
              <input type="farm" id="farm" placeholder="Tast din gårds navn">

              <label for="img">Profil billede</label>
              <input type="file" id="img" accept="image/*" onchange="previewImage(this.files[0], 'imagePreview')">
              <img id="imagePreview" class="image-preview">
              <button type="button" name="button" onclick="updateUser()">Gem ændringer</button>
            </form>
      </div>

      <section id="profile">
      </section>

<article id="calltoaction">
  <a href="#dashboard"><div id="greenb"><h2>Dashboard</h2><p class="hideonmobile">Få et overblik over dit landbrug på dit personlige dashboard</p></div></a>
    <a href="#challenge"><div id="greenb2" class="hideonmobile"><h2>Udfordringen</h2><p class="hideonmobile">Opret en målsætning for dig selv eller udfodr en kollega
    </p></div></a>
  <a href="#enterData"><div id="whiteb"><h2>Indtast data</h2><p class="hideonmobile">Indtast dine data i de simple indtastningsfelter eller brug DMS.</p></div></a>

<div id="ekstrainfo">
  <article id="keydata" class="hideonmobile">
  <div>
    <div>
      <h4>370,86</h4>
      <p>Samlet CO2-aftryk i tons</p>
      <p><span class="greenspan">⭜</span></p>
    </div>
    <div id="borders">
      <h4>7830,04</h4>
      <p>Liter mælk produceret</p>
      <p><span class="redspan">⭝</span></p>
    </div>
    <div>
      <h4>5469,21</h4>
      <p>Kg foder benytter</p>
      <p><span class="greenspan">⭜</span></p>
    </div>
  </div>
  </article>


  <article id="keydata" class="hideonmobile">
  <div id="onlytwo">
    <div>
      <h4>Spar mest diesel inden 2022</h4>
      <p>AKTIV UDFORDRING</p>
    </div>

    <div id="borderss">
      <h4>Mindsk CO2 aftrykket</h4>
      <p>AKTIV MÅLSÆTNING</p>
    </div>
  </div>
  </article>


  <article id="keydata" class="hideonmobile">
  <div>
    <div>
      <h4>Køer</h4>
      <img src="images/full.svg" alt="icon full">
    </div>
    <div id="borderss">
    <h4>Foder</h4>
    <img src="images/half.svg" alt="icon half">
    </div>
    <div id="borders">
    <h4>Mælk</h4>
    <img src="images/zero.svg" alt="icon full">
    </div>
    <div>
      <h4>Forbr.</h4>
      <img src="images/zero.svg" alt="icon full">
    </div>
    </div>
  </div>
  </article>
</div>

</article>

<article id="keydata" class="hideondesktop">
<h3>Seneste tal</h3>

<div>
  <div>
    <h4>370,86</h4>
    <p>Samlet CO2-aftryk i tons</p>
    <p><span class="greenspan">⭜</span></p>
  </div>
  <div id="borders">
    <h4>7830,04</h4>
    <p>Liter mælk produceret</p>
      <p><span class="redspan">⭝</span></p>
  </div>
  <div>
    <h4>5469,21</h4>
    <p>Kg foder benytter</p>
      <p><span class="greenspan">⭜</span></p>
  </div>
  <div id="fulllength">
      <h4>303</h4>
      <p>Gennemsnitligt liter mælk pr. ko i liter</p>
      <p><span class="greenspan">⭜</span></p>
  </div>
</div>
</article>

<article class="bestbox">
<h2 class="alignleft">Personlige rekorder</h2>
<div id="bestresults">
  <div>
<h3>Mest mælk produceret</h3>
<h2>25.920 kg</h2>
<p>2020</p>
  </div>
  <div>
  <h3>Laveste samlede CO2-aftryk</h3>
  <h2>5.320 t</h2>
  <p>2018</p>
  </div>
  <div>
  <h3>Mindst strøm benyttet</h3>
  <h2>102 kWh</h2>
  <p>2019</p>
  </div>
  <div>
  <h3>Mindst diesel benyttet</h3>
  <h2>8.290 l</h2>
  <p>2019</p>
  </div>
  <div>
  <h3>Største andel selvforsynende foder</h3>
  <h2>79%</h2>
  <p>2015</p>
  </div>
</div>
</article>

<article>
<h2 class="alignleft">Bedrifter</h2>
<div id="badgets">

<div>
<img src="images/badgets/plane.svg" alt="badgets icon">
<h3>Mindst CO2-aftyk svarende til flyrejse</h3>
</div>

<div>
<img src="images/badgets/feed.svg" alt="badgets icon">
<h3>Fohøj procenten af selvforsynedne foder</h3>
</div>

<div>
<img src="images/badgets/milk.svg" alt="badgets icon">
<h3>Øg mængden af solgt mælk</h3></div>

<div>
<img src="images/badgets/scout.svg" alt="badgets icon">
<h3>Din går ligger i top-3 over mindste strømforbrug</h3></div>

<div>
<img src="images/badgets/milkdrop.svg" alt="badgets icon">
<h3>Sænk CO2-aftryk pr. kg mælk</h3>
</div>

</div>
</article>

<article id="activechallenges" class="hideondesktop">
<h2 class="alignleft">Aktive målsætninger & udfordringer</h2>
</article>
<p id="logud" onclick="logout()" class="hideonmobile">LOG UD</p>

<div id="dms">
<p>Registrer relevant data med DMS</p>
<label class="switch">
  <input type="checkbox">
  <span class="toggle"></span>
</label>
</div>

<div class="tabbarclear"></div>
    </section>
    `;


  }

  updateUser() {
    let name = document.querySelector('#name').value;
    let img = document.querySelector('#imagePreview').src;
    let farm = document.querySelector('#farm').value;
      let cow = document.querySelector('#cowInput').value;
      let feed = document.querySelector('#feedInput').value;
      let feedself = document.querySelector('#feedSelfInput').value;
      let milk = document.querySelector('#milkInput').value;
      let diesel = document.querySelector('#dieselInput').value;
      let power = document.querySelector('#powerInput').value;

    this.authService.updateAuthUser(name, img, farm, cow, feed, feedself, milk, diesel, power);
    this.cowPercent ();
      this.milkPercent ();
        this.feedPercent ();
          this.usePercent ();
  }

  previewImage(file, previewId) {
    if (file) {
      let reader = new FileReader();
      reader.onload = function(event) {
        document.querySelector('#' + previewId).setAttribute('src', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  cowPercent () {
    if (document.querySelector('#cowInput').value === ""){
      document.querySelector('.cowPercent').style.backgroundImage ="url('images/zero.svg')";
    }else {
      document.querySelector('.cowPercent').style.backgroundImage ="url('images/full.svg')"
    }
  }

  milkPercent () {
    if (document.querySelector('#milkInput').value === ""){
      document.querySelector('.milkPercent').style.backgroundImage ="url('images/zero.svg')";
    }else {
      document.querySelector('.milkPercent').style.backgroundImage ="url('images/full.svg')"
    }
  }

  feedPercent () {
    if (document.querySelector('#feedInput').value === "" && document.querySelector('#feedSelfInput').value === ""){
      document.querySelector('.feedPercent').style.backgroundImage ="url('images/zero.svg')";

    } else if (document.querySelector('#feedInput').value = "null = false" && document.querySelector('#feedSelfInput').value === "" || document.querySelector('#feedInput').value === "" && document.querySelector('#feedSelfInput').value === "null = false") {
      document.querySelector('.feedPercent').style.backgroundImage ="url('images/half.svg')";
    } else {
      document.querySelector('.feedPercent').style.backgroundImage ="url('images/full.svg')"
  }
}

  usePercent () {
    if (document.querySelector('#dieselInput').value === "" && document.querySelector('#powerInput').value === ""){
      document.querySelector('.usePercent').style.backgroundImage ="url('images/zero.svg')";

    } else if (document.querySelector('#dieselInput').value = "null = false" && document.querySelector('#powerInput').value === "" || document.querySelector('#dieselInput').value === "" && document.querySelector('#powerInput').value === "null = false") {
      document.querySelector('.usePercent').style.backgroundImage ="url('images/half.svg')";
    } else {
      document.querySelector('.usePercent').style.backgroundImage ="url('images/full.svg')"
  }
}


  logout() {
    this.authService.logout();
  }
}
