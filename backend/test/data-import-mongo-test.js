require('./mocha.config');
const DataImportMongo = require('../lib/services/data-import-mongo');
const customerModel    = require('../lib/db/customer'); 
const customerCompaniesModel = require('../lib/db/customer_companies'); 

describe('class DataImportMongo', () => {
    describe('doImportDataMongo()', async () => {
        it('should not call saveToMongo() to process incoming data if csvpath is fake', async () => {
            const dataImportMongo = new DataImportMongo();
            const importStub = Sinon.stub(DataImportMongo, 'saveToMongo').withArgs('csv_fake_path','customer');
            await dataImportMongo.doImportDataMongo();
            expect(importStub).to.have.not.been.called;
        });
        it('should call saveToMongo() to process incoming customer data if csvpath for customer is proper', async () => {
            const dataImportMongo = new DataImportMongo();
            const customer = dataImportMongo.customer;
            const importStub = Sinon.stub(DataImportMongo, 'saveToMongo').withArgs('../../packform/csv/mDb_customers.csv',customer);
            await dataImportMongo.doImportDataMongo();
            expect(importStub).to.have.been.called;
        });
        it('should call saveToMongo() to process incoming customer_companies data if csvpath for customer_companies is proper', async () => {
            const dataImportMongo = new DataImportMongo();
            const customer_companies = dataImportMongo.customer_company;
            const importStub = Sinon.stub(DataImportMongo, 'saveToMongo').withArgs('../../packform/csv/mDb_customer_companies.csv',customer_companies);
            await dataImportMongo.doImportDataMongo();
            expect(importStub).to.have.been.called;
        });
        
    });
    describe('saveToMongo()', async () => {
        it('should not call customerModel.insertMany() to save Customer data if csv file is not present', async () => {
            const customerStub = Sinon.stub(customerModel, 'insertMany');
            const csvfile = '../../packform/csv/fake.csv';
            await DataImportMongo.saveToMongo(csvfile, 'customer');
            expect(customerStub).to.have.not.been.called;
        });
        it('should not call customerCompaniesModel.insertMany() to save Customer data if csv file is not present', async () => {
            const customerStub = Sinon.stub(customerCompaniesModel, 'insertMany');
            const csvfile = '../../packform/csv/fake.csv';
            await DataImportMongo.saveToMongo(csvfile, 'customer_company');
            expect(customerStub).to.have.not.been.called;
        });
    });
});