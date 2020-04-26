// import af siderne
import LoginPage from "./pages/login.js";
import HomePage from "./pages/home.js";
import DashboardPage from "./pages/dashboard.js";
import DataPage from "./pages/enterData.js";
import ChallengePage from "./pages/challenge.js";

// import af services
import spaService from "./services/spa.js";
import authService from "./services/auth.js";

// variabler til de forskellige undersider
let loginPage = new LoginPage();
let homePage = new HomePage();
let dashboardPage = new DashboardPage();
let dataPage = new DataPage();
let challengePage = new ChallengePage();

spaService.init();
authService.init();

// Ready når brugeren logger korrekt ind og kører funtionerne.
window.ready = () => {
    dashboardPage.init();
    challengePage.init();
    homePage.cowPercent ();
      homePage.milkPercent ();
        homePage.feedPercent ();
          homePage.usePercent ();
          dashboardPage.appendRange();
}

window.logout = () => homePage.logout();
window.updateUser = () => homePage.updateUser();
window.previewImage = (file, previewId) => homePage.previewImage(file, previewId);

window.cowData = () => {
  document.getElementById("cowQuest").classList.toggle("show")
}

window.feedData = () => {
  document.getElementById("feedQuest").classList.toggle("show")
}

window.milkData = () => {
  document.getElementById("milkQuest").classList.toggle("show")
}

window.useData = () => {
  document.getElementById("useQuest").classList.toggle("show")
}

window.openSetup = () => {
  document.getElementById("updateProfile").classList.toggle("show")
}

window.openMoreData = () => {
  document.getElementById("detailView").classList.toggle("show")
}

window.openCreate = () => {
  document.getElementById("opret").classList.toggle("show");
  console.log("it works");
}
