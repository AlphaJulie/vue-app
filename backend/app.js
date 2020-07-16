const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Models = require('./lib/db/sequelize.js');

const DataImportPsql = require('./lib/services/data-import-psql');
const DataImportMongo = require('./lib/services/data-import-mongo');
const customerModel = require('./lib/db/customer');
const customerCompaniesModel = require('./lib/db/customer_companies');

const config = require('./lib/config/db-config.json').developmentMongo;

app.listen(3000, () => console.log('Server running on port 3000!'))

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

    app.get('/customers', async function (req, res) {
      const response = await customerModel.find({}).catch(err => console.log(err));
      res.send(response);
    });

    app.get('/customer_companies', async function (req, res) {
      const response = await customerCompaniesModel.find({}).catch(err => console.log(err));
      res.send(response);
    });

    app.get('/orders', async function (req, res) {
      const response = await Models.Order.findAll().catch(err => console.log(err));
      res.send(response);
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