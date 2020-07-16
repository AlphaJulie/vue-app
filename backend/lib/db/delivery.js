const Sequelize = require('sequelize');

class Delivery extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER, primaryKey: true,
                    autoIncrement: true
                },
                order_item_id: DataTypes.INTEGER,
                delivered_quantity: DataTypes.INTEGER
            },
            {
                tableName: 'deliveries',
                freezeTableName: true,
                timestamps: false,
                sequelize
            }
        );
    }
}
module.exports = Delivery;