const Sequelize = require('sequelize');

const config = require("../config/db-config.json").developmentPsql;
const sequelize = new Sequelize(`${config.dialect}://${config.username}:${config.password}@${config.host}:5432/${config.database}`);

const OrderModel = require('./order');
const OrderItemModel = require('./order_item');
const DeliveryModel = require('./delivery');
const models = { sequelize, Order: OrderModel.init(sequelize, Sequelize), OrderItem: OrderItemModel.init(sequelize, Sequelize), Delivery: DeliveryModel.init(sequelize, Sequelize) };

module.exports = models;