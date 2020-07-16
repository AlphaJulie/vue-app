const Sequelize = require('sequelize');

class Order extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER, primaryKey: true,
                    autoIncrement: true
                }, 
                created_at: DataTypes.DATE,
                order_name: DataTypes.STRING,
                customer_id: DataTypes.STRING
            },
            {
                tableName: 'orders',
                freezeTableName: true,
                timestamps: false,
                sequelize
            }
        );
    }
}
module.exports = Order;