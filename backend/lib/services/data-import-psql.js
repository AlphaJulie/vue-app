/* This class is to import the incoming data from csv file and save it to Postgresql Database */

const neatCsv = require('neat-csv');
const fs = require('fs');
const csv_path = '../../packform/csv';
const Models = require('../db/sequelize.js');

class DataImportPsql {

  constructor() {
    this.order = 'order';
    this.order_item = 'order_item';
    this.delivery = 'delivery';
  }

  async doImportDataPsql() {
    try {
      await DataImportPsql.saveToPsql(csv_path + '/orders.csv', this.order);
      await DataImportPsql.saveToPsql(csv_path + '/order_items.csv', this.order_item);
      await DataImportPsql.saveToPsql(csv_path + '/deliveries.csv', this.delivery);

    } catch (err) {
      console.error(`DataImportPsql.doImportDataPsql() Error: ${err}`)
    }
  }

  static async saveToPsql(csvfile, model) {
    try {
      fs.readFile(csvfile, async (err, data) => {
        if (err) {
          console.error(err)
          return;
        }
        const csvData = await neatCsv(data);
        if(!csvData){
          return false;
        }
        if (model === 'order') {
          await Models.Order.bulkCreate(csvData).catch(err => console.log(err));
        } else if (model === 'order_item') {
          await Models.OrderItem.bulkCreate(csvData).catch(err => console.log(err));
        } else if (model === 'delivery') {
          await Models.Delivery.bulkCreate(csvData).catch(err => console.log(err));
        }
        return true;
      });
    } catch (err) {
      console.error(`Error while saving csv data to PSql Db: ${err}`)
    }
  }


}
module.exports = DataImportPsql;