class SustainabilityDataService {
  constructor() {
    this.dataRef = _db.collection("sustainabilityData");
  }

  // DATA FRA FIREBASE VIA .GET
  async getDataByUid(uid) {
    let snapshotData = await this.dataRef.where("uid", "==", uid).orderBy("year").get();
    let sustainabilityData = [];
    snapshotData.forEach(doc => {
      let data = doc.data(); // putter dataen ind i en variabel kaldet data
      data.id = doc.id; // Sætter ID'et til variablen også
      sustainabilityData.push(data); // Sætter dataen ind i arrayet
    });
    return sustainabilityData;
  }


  prepareData(sustainabilityData) {
    let years = [];
    let numberOfCows = [];
    let milkProduction = [];
    let carbonFootprint = [];
    for (const dataObject of sustainabilityData) { 
      years.push(dataObject.year);
      numberOfCows.push(dataObject.herdYearCows);
      milkProduction.push(dataObject.herdMilkProduction);
      carbonFootprint.push(dataObject.carbonFootprintWholeFarm);
    }
    return {
      years,
      numberOfCows,
      milkProduction,
      carbonFootprint
    };
  }

  async getPreparedDataByUid(uid) {
    let firebaseData = await this.getDataByUid(uid); // get the data from Firebase
    let preparedData = this.prepareData(firebaseData); // Prepare all the data. Returning an object with arrays: years, numberOfCows, milkProduction & carbonFootprint
    console.log(preparedData);
    return preparedData; // returning the data back to the "caller", in this case the chart pages
  }
}

const sustainabilityDataService = new SustainabilityDataService();
export default sustainabilityDataService;
