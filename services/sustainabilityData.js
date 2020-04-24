class SustainabilityDataService {
  constructor() {
    this.dataRef = _db.collection("sustainabilityData");
  }

  // DATA FRA FIREBASE MED ASYNKRONT KALD
  async getDataByUid(uid) {
    // Opretter føst variabler, hvor vi med await venter på at det er loadet før den
    // tager fat i vores uid inde i collctionen "sustainabilityData" som vi har oprettet på Firebase.
    //efterfølgende sorteres efter årstal, så de kommer i rigtig rækkefølge når vi tilgår dem i chart.
    let snapshotData = await this.dataRef.where("uid", "==", uid).orderBy("year").get();
    let sustainabilityData = [];
    snapshotData.forEach(doc => {
      // putter dataen ind i en variabel kaldet data
      let data = doc.data();
      // Sætter ID'et til variablen også
      data.id = doc.id;
      // PUSH dataen ind i sustainabilityData-arrayet
      sustainabilityData.push(data);
    });
    return sustainabilityData;
  }

  //Forbered dataen
  prepareData(sustainabilityData) {
    //opretter variabler med tomme arrays
    let years = [];
    let numberOfCows = [];
    let milkProduction = [];
    let carbonFootprint = [];
    let cowsFeed = [];
    let dieselFootprint = [];
    let dieselUsed = [];
    let elFootprint = [];
    let elUsed = [];
    let feedFootprint = [];
    let feedSelf = [];
    let methaneGas = [];
    let region = [];
    let feedYear = [];
    let totalMethane = [];
    let dieselMoney = [];
    let elMoney = [];

    //laver et loop som så vi får alle elementerne ind
    for (const dataObject of sustainabilityData) {
      //Pusher dataen ind i vores arrays
      years.push(dataObject.year);
      numberOfCows.push(dataObject.numberOfCows);
      milkProduction.push(dataObject.herdMilkProduction);
      carbonFootprint.push(dataObject.carbonFootprintWholeFarm);
      cowsFeed.push(dataObject.cowsFeedConsumption);
      dieselFootprint.push(dataObject.dieselFootprint);
      dieselUsed.push(dataObject.dieselUsed);
      elFootprint.push(dataObject.elFootprint);
      elUsed.push(dataObject.elUsed);
      feedFootprint.push(dataObject.feedFootprint);
      feedSelf.push(dataObject.herdSelfSufficiencyInFeed);
      methaneGas.push(dataObject.methaneGas);
      region.push(dataObject.region);
        feedYear.push(dataObject.feedThisYear);
          totalMethane.push(dataObject.totalMethane);
          dieselMoney.push(dataObject.dieselMoney);
            elMoney.push(dataObject.elMoney);

    }
    return {
      years,
      numberOfCows,
      milkProduction,
      carbonFootprint,
      cowsFeed,
      dieselFootprint,
      dieselUsed,
      elFootprint,
      elUsed,
      feedFootprint,
      feedSelf,
      methaneGas,
      region,
      feedYear,
      totalMethane,
      elMoney,
      dieselMoney
    };
  }

  //kobler preparedata og uid sammen
  async getPreparedDataByUid(uid) {
    // laver to variabler som henter de to ovenstående funktioner
    let firebaseData = await this.getDataByUid(uid);
    let preparedData = this.prepareData(firebaseData);

    return preparedData;
  }
}

const sustainabilityDataService = new SustainabilityDataService();
export default sustainabilityDataService;
