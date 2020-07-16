const Sequelize = require('sequelize');

class OrderItem extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER, primaryKey: true,
                    autoIncrement: true
                }, 
                order_id: DataTypes.STRING,
                price_per_unit: DataTypes.DECIMAL(10,2),
                quantity: DataTypes.INTEGER,
                product: DataTypes.STRING
            },
            {
                tableName: 'order_items',
                freezeTableName: true,
                timestamps: false,
                sequelize
            }
        );
    }
}
module.exports = OrderItem;