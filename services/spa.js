class SpaService {
  constructor() {
    this.defaultPage = "home";
  }

  init() {
    this.pages = document.querySelectorAll(".page");
    this.navItems = document.querySelectorAll(".tabbar a");
    window.addEventListener("hashchange", () => this.pageChange());
    this.pageChange();
  }

  // Skjul alle sider. Når denne køres vil den ikke blot sætte den nye side ovenpå, men erstatte den.
  hideAllPages() {
    for (let page of this.pages) {
      page.style.display = "none";
    }
  }

  // Vis siden som block
  showPage(pageId) {
    this.hideAllPages();
    document.querySelector(`#${pageId}`).style.display = "block";
    this.setActiveTab(pageId);
  }

  // Sætter side-id'et til at være active
  setActiveTab(pageId) {
    for (let navItem of this.navItems) {
      if (`#${pageId}` === navItem.getAttribute("href")) {
        navItem.classList.add("active");
      } else {
        navItem.classList.remove("active");
      }
    }
  }

  navigateTo(pageId) {
   window.location.href = `#${pageId}`;
 }

  // Øverst er "home" angivet som default, og det bestemmes her at den skal åbne denne.
  pageChange() {
    let page = this.defaultPage;
    if (window.location.hash) {
      page = window.location.hash.slice(1);
    }
    this.showPage(page);
  }

  // Skjuler og viser menubaren i bunden når det er relevant - eksempelvis før der lgges ind.
  hideTabbar(hide) {
    let menu = document.querySelector('#tabbar');
    if (hide) {
      menu.classList.add("hide");
    } else {
      menu.classList.remove("hide");
    }

//TILBAGE KNAP
    function goBack() {
      window.history.back(-1);
    }

  }
}

const spaService = new SpaService();
export default spaService;
