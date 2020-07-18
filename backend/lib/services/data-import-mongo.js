/* This class is to import the incoming data from csv file and save it to MongoDb */

const neatCsv = require('neat-csv');
const fs = require('fs');

const customerModel = require('../db/customer');
const customerCompaniesModel = require('../db/customer_companies');

class DataImportMongo {

  constructor() {
    this.customer = 'customer';
    this.customer_company = 'customer_company';
  }

  async doImportDataMongo() {
    try {
      await DataImportMongo.saveToMongo('../../packform/csv/mDb_customers.csv', this.customer);
      await DataImportMongo.saveToMongo('../../packform/csv/mDb_customer_companies.csv', this.customer_company);

    } catch (err) {
      console.error(`DataImportMongo.doImportDataMongo() Error: ${err}`)
    }
  }

  static async saveToMongo(csvfile, model) {
    try {
      fs.readFile(csvfile, async (err, data) => {
        if (err) {
          console.error(err)
          return;
        }
        const csvData = await neatCsv(data);
        if (model === 'customer') {
          await customerModel.insertMany(csvData).catch(err => console.log(err));
        } else if (model === 'customer_company') {
          await customerCompaniesModel.insertMany(csvData).catch(err => console.log(err));
        }
        return csvData;
      });
    } catch (err) {
      console.error(`Error while saving csv data to Mongo Db: ${err}`)
    }
  }


}
module.exports = DataImportMongo;