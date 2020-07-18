const express = require('express');
const mongoose = require('mongoose');
const config = require('./lib/config/db-config.json').developmentMongo;
const app = express();
const Models = require('./lib/db/sequelize.js');


const DataImportPsql = require('./lib/services/data-import-psql');
const DataImportMongo = require('./lib/services/data-import-mongo');
const DataExport = require('./lib/services/data-export');


app.listen(3000, () => console.log('Server running on port 3000!'))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
//connect to Mongodb  
mongoose.connect(`${config.dialect}://${config.host}:${config.port}/${config.database}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to Mongo db'))
  .catch((err) => console.log(err))

async function backendApp() {

  try {
    const dataImportPsql = new DataImportPsql();
    await dataImportPsql.doImportDataPsql();
    const dataImportMongo = new DataImportMongo();
    await dataImportMongo.doImportDataMongo();

    const customerData = await DataExport.customerDetails().then(function(custDetails) {
      return custDetails;
    }, function(err) {
      console.error(err, err.stack);
    });

    const customerOrderData = await DataExport.customerOrders(customerData).then(function(custOrders) {
      return custOrders;
    }, function(err) {
      console.error(err, err.stack);
    });

    app.get('/customer_orders', async function (req, res) {
      res.send(customerOrderData);
    });

    app.get('/order_items', async function (req, res) {
      const response = await Models.OrderItem.findAll().catch(err => console.log(err));
      res.send(response);
    });

    app.get('/deliveries', async function (req, res) {
      const response = await Models.Delivery.findAll().catch(err => console.log(err));
      res.send(response);
    });

  } catch (err) {
    console.error(`Error: ${err}`)
  }

}
backendApp();