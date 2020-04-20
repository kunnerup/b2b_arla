class SustainabilityDataService {
  constructor() {
    this.dataRef = _db.collection("sustainabilityData");
  }

  // data from firebase
  // There are two ways to retrieve data stored in Cloud Firestore. Either of these methods can be used with documents, collections of documents, or the results of queries:
  // - Call a method to get the data.
  // - Set a listener to receive data-change events.
  // In this case we're using get() to get data once without listning for changes.
  async getDataByUid(uid) {
    let snapshotData = await this.dataRef.where("uid", "==", uid).orderBy("year").get();
    let sustainabilityData = [];
    snapshotData.forEach(doc => {
      let data = doc.data(); // save the data in a variable
      data.id = doc.id; // add the id to the data variable
      sustainabilityData.push(data); // push the data to the array
    });
    // do what ever you want with the data array 🎉
    return sustainabilityData;
  }

  // prepares all the data for the charts
  prepareData(sustainabilityData) {
    let years = [];
    let numberOfCows = [];
    let milkProduction = [];
    let carbonFootprint = [];
    for (const dataObject of sustainabilityData) { // looping through all data and pushing to arrays
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