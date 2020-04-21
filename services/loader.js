class LoaderService {
  constructor() {
    this.spinner();
  }

  spinner() {
    document.querySelector('#content').innerHTML +=`
      <div id="loader">
        <div class="spinner"></div>
      </div>
    `;
  }

  show(show) {
    let loader = document.getElementById('loader');
    if (show) {
      loader.classList.remove("hide");
    } else {
      setTimeout(() => {
        loader.classList.add("hide");
      }, 500);
    }
  }

}

const loaderService = new LoaderService();
export default loaderService;
