import spaService from "./spa.js";
import loaderService from "./loader.js";

class AuthService {
  constructor() {
    //Henter UI fra Firebase og samtidig "users"-collection som er den skabte collection i firebase
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    this.userRef = _db.collection("users");
    this.authUser;
    this.authUserRef;
  }

  init() {
    // Ser om der er ændringer i login-godkendelsen
    firebase.auth().onAuthStateChanged(user => {
      if (user) { // white brugeren er korrekt
        this.userAuthenticated(user);
      } else { // whis brugeren ikke er korrekt
        this.userNotAuthenticated();
      }
    });
  }

  //Hvis brugeren findes og logges korrekt ind
  userAuthenticated(user) {
    spaService.hideTabbar(false);
    this.initAuthUserRef();
    loaderService.show(false);
  }

  //Hvis brugeren ikke logger korrekt ind
  userNotAuthenticated() {
    spaService.hideTabbar(true);
    spaService.navigateTo("login");

    // FIREBASE UI (GOOGLE OG MAIL SÆTTES OP HER)
    const uiConfig = {
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: '#home'
    };
    this.ui.start('#firebaseui-auth-container', uiConfig);
    loaderService.show(false);
  }

  initAuthUserRef() {
    let authUser = firebase.auth().currentUser;
    this.authUserRef = _db.collection("users").doc(authUser.uid);

    // Kører brugerdata
    this.authUserRef.onSnapshot({
      includeMetadataChanges: true
    }, userData => {
      if (!userData.metadata.hasPendingWrites) {
        let user = {
          ...authUser,
          ...userData.data()
        };
        this.authUser = user;
        this.appendAuthUser();
        loaderService.show(false);
        // ready kører i main og starter når brugeren er logget korrekt ind
        ready();
      }
    });
  }

  logout() {
    firebase.auth().signOut();
  }

  appendAuthUser() {
    document.querySelector('#name').value = this.authUser.displayName || "";
    document.querySelector('#mail').value = this.authUser.email;
    document.querySelector('#imagePreview').src = this.authUser.img || "";
    document.querySelector('#farm').value = this.authUser.farm || "";
    document.querySelector('#cowInput').value = this.authUser.cow || "";
    document.querySelector('#feedInput').value = this.authUser.feed || "";
    document.querySelector('#feedSelfInput').value = this.authUser.feedself || "";
    document.querySelector('#milkInput').value = this.authUser.milk || "";
    document.querySelector('#dieselInput').value = this.authUser.diesel || "";
    document.querySelector('#powerInput').value = this.authUser.power || "";

    //Skiver brugerdataen til profilsiden
    document.querySelector('#profile').innerHTML = `
<img id="pb" src="${this.authUser.img}" alt="Profilbillede">
        <h2>${this.authUser.displayName}</h2>
        <p>${this.authUser.farm}</p>
        `;

        document.querySelector('#profilechallenge').innerHTML = `
    <img id="pb" src="${this.authUser.img}" alt="Profilbillede">
            <h2>${this.authUser.displayName}</h2>
            `;
  }

  //Opdater brugeren starter her
  updateAuthUser(name, img, farm, cow, feed, feedself, milk, diesel, power) {
    loaderService.show(true);

    let user = firebase.auth().currentUser;

    // Opdater "authentificated user" i Firebase
    user.updateProfile({
      displayName: name
    });



    // Opdater data i databasen i firebase
    this.authUserRef.set({
      img: img,
      farm: farm,
      cow: cow,
      feed: feed,
      feedself: feedself,
      milk: milk,
      diesel: diesel,
      power: power
    }, {
      merge: true
    }).then(() => {
      loaderService.show(false);
    });

  }
}

const authService = new AuthService();
export default authService;
