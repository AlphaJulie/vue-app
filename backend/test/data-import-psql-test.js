require('./mocha.config');
const Models = require('../lib/db/sequelize');
const DataImportPsql = require('../lib/services/data-import-psql');

describe('class DataImportPsql', () => {
    describe('doImportDataPsql()', async () => {
        it('should not call saveToPsql() to process incoming data if csvpath is fake', async () => {
            const dataImportPsql = new DataImportPsql();
            const importStub = Sinon.stub(DataImportPsql, 'saveToPsql').withArgs('csv_fake_path','order');
            await dataImportPsql.doImportDataPsql();
            expect(importStub).to.have.not.been.called;
        });
        it('should call saveToPsql() to process incoming order data if csvpath for order is proper', async () => {
            const dataImportPsql = new DataImportPsql();
            const order = dataImportPsql.order;
            const importStub = Sinon.stub(DataImportPsql, 'saveToPsql').withArgs('../../packform/csv/orders.csv',order);
            await dataImportPsql.doImportDataPsql();
            expect(importStub).to.have.been.called;
        });
        it('should call saveToPsql() to process incoming order_items data if csvpath for order_items is proper', async () => {
            const dataImportPsql = new DataImportPsql();
            const order_item = dataImportPsql.order_item;
            const importStub = Sinon.stub(DataImportPsql, 'saveToPsql').withArgs('../../packform/csv/order_items.csv',order_item);
            await dataImportPsql.doImportDataPsql();
            expect(importStub).to.have.been.called;
        });
        it('should call saveToPsql() to process incoming delivery data if csvpath for delivery is proper', async () => {
            const dataImportPsql = new DataImportPsql();
            const delivery = dataImportPsql.delivery;
            const importStub = Sinon.stub(DataImportPsql, 'saveToPsql').withArgs('../../packform/csv/deliveries.csv',delivery);
            await dataImportPsql.doImportDataPsql();
            expect(importStub).to.have.been.called;
        });
        
    });
    describe('saveToPsql()', async () => {
        it('should not call Model.Order.bulkCreate() to save order data if csv file is not present', async () => {
            const orderStub = Sinon.stub(Models.Order, 'bulkCreate');
            const csvfile = '../../packform/csv/fake.csv';
            await DataImportPsql.saveToPsql(csvfile, 'order');
            expect(orderStub).to.have.not.been.called;
        });
        it('should not call Model.OrderItem.bulkCreate() to save order data if csv file is not present', async () => {
            const orderStub = Sinon.stub(Models.OrderItem, 'bulkCreate');
            const csvfile = '../../packform/csv/fake.csv';
            await DataImportPsql.saveToPsql(csvfile, 'order_item');
            expect(orderStub).to.have.not.been.called;
        });
        it('should not call Model.Delivery.bulkCreate() to save order data if csv file is not present', async () => {
            const orderStub = Sinon.stub(Models.Delivery, 'bulkCreate');
            const csvfile = '../../packform/csv/fake.csv';
            await DataImportPsql.saveToPsql(csvfile, 'delivery');
            expect(orderStub).to.have.not.been.called;
        });
        it('should return undefined if csv file is not present', async () => {
            const csvfile = '../../packform/csv/fake.csv';
            const response = await DataImportPsql.saveToPsql(csvfile, 'delivery');
            expect(response).to.be.undefined;
        });
    });
});