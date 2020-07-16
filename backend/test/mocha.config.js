process.env.NODE_ENV = 'test';
global.chai = require('chai');
global.expect = chai.expect;

global.Sinon = require('sinon').createSandbox();
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
afterEach(()=> {
    Sinon.restore();
});