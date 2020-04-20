// import your pages
import LoginPage from "./pages/login.js";
import HomePage from "./pages/home.js";
import DashboardPage from "./pages/dashboard.js";
import DataPage from "./pages/enterData.js";
import ChallengePage from "./pages/challenge.js";

// import your services
import spaService from "./services/spa.js";
import authService from "./services/auth.js";

// Declare and init pages
let loginPage = new LoginPage();
let homePage = new HomePage();
let dashboardPage = new DashboardPage();
let dataPage = new DataPage();
let challengePage = new ChallengePage();

// init services
spaService.init();
authService.init();

// ready called when user is authenticated
// and the app is ready!
window.ready = () => {
    dashboardPage.init();
    challengePage.init();
}

// onclick handlers
window.logout = () => homePage.logout();
window.updateUser = () => homePage.updateUser();
window.previewImage = (file, previewId) => homePage.previewImage(file, previewId);
