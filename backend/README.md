# backend

To set up the backend application, make sure that both databases Postgres and Mongo Db are installed and running.

Install Node JS and go inside `backend` folder
Run `yarn install` to install all required libraries.
Run `node index.js` to store the data from csv files to the databases.

`customers` and `customer_companies` are stored inside MongoDb. All other tables are stored inside PostgresDb.

Got to `http://localhost:3000/customer_orders` to see the customer-order details in the browser.

# Testing

Run `yarn test` to run all the tests cases done by using Mocha and Chai framework

