const MongoClient = require('mongodb').MongoClient;
const config = require('../config/db-config.json').developmentMongo;
const Models = require('../db/sequelize');

const Promise = require('rsvp').Promise;

module.exports = {
    customerDetails: function () {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(`${config.dialect}://${config.host}:${config.port}/`, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {

                if (err) throw err;
                const dbo = db.db(`${config.database}`);
                dbo.collection('customers').aggregate([
                    {
                        $lookup:
                        {
                            from: 'customer_companies',
                            localField: 'company_id',
                            foreignField: 'company_id',
                            as: 'companyDetails'
                        }
                    }
                ]).toArray(async function (err, custDetails) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(custDetails);
                    }
                });
            })
        })
    },
    customerOrders: async function (customerData) {
        const orderDetails = await Models.Order.findAll({
            raw: true,
          }).catch(err => console.log(err));
          let finalList = [];
           for(let order of orderDetails){
            for(let customer of customerData){
              if(order.customer_id === customer.user_id){
                order['customer_name'] = customer.name;
                for(let company of customer.companyDetails){
                  order['company_name'] = company.company_name;
                }
              }
             }
             finalList.push(order);
           }
           return finalList;
    }
};