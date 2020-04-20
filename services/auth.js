import spaService from "./spa.js";
import loaderService from "./loader.js";

class AuthService {
    constructor() {
        this.ui = new firebaseui.auth.AuthUI(firebase.auth());
        this.userRef = _db.collection("users");
        this.authUser;
        this.authUserRef;
    }

    init() {
        // Listen on authentication state change
        firebase.auth().onAuthStateChanged(user => {
            if (user) { // if user exists and is authenticated
                this.userAuthenticated(user);
            } else { // if user is not logged in
                this.userNotAuthenticated();
            }
        });
    }

    userAuthenticated(user) {
        spaService.hideTabbar(false);
        this.initAuthUserRef();
        loaderService.show(false);
    }

    userNotAuthenticated() {
        spaService.hideTabbar(true);
        spaService.navigateTo("login");

        // Firebase UI configuration
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

        // init user data
        this.authUserRef.onSnapshot({
            includeMetadataChanges: true
        }, userData => {
            if (!userData.metadata.hasPendingWrites) {
                let user = {
                    ...authUser,
                    ...userData.data()
                }; //concating two objects: authUser object and userData objec from the db
                this.authUser = user;
                this.appendAuthUser();
                loaderService.show(false);
                ready(); // this functions is defined in main.js and called when the user is authenticated and the app is ready to run
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

        document.querySelector('#profile').innerHTML = `
<img id="pb" src="${this.authUser.img}" alt="Profilbillede">
        <h2>${this.authUser.displayName}</h2>
        <p>${this.authUser.farm}</p>
        `;
    }

    updateAuthUser(name, img, farm) {
        loaderService.show(true);

        let user = firebase.auth().currentUser;

        // update auth user
        user.updateProfile({
            displayName: name
        });

        // update database user
        this.authUserRef.set({
            img: img,
            farm: farm
        }, {
            merge: true
        }).then(() => {
            loaderService.show(false);
        });

    }
}

const authService = new AuthService();
export default authService;
